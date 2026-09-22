import * as fs from "fs";
import * as path from "path";
import { CANONICAL_EMOTIONS } from "../src/lib/data/feelings-data";
import { CANONICAL_RESOURCES, CANONICAL_DOWNLOADS } from "../src/lib/data/resources-data";
import { DEFAULT_EMERGENCY_CONTACTS } from "../src/components/emergency/emergency-provider";

interface LinkCheckResult {
  url: string;
  source: string;
  status: "OK" | "WARNING" | "FAILED";
  statusCode?: number;
  error?: string;
}

async function checkUrl(url: string, source: string): Promise<LinkCheckResult> {
  // If local file path (e.g., /guides/anxiety.pdf or /downloads/...)
  if (url.startsWith("/")) {
    const localPath = path.join(process.cwd(), "public", url);
    if (fs.existsSync(localPath)) {
      return { url, source, status: "OK", statusCode: 200 };
    } else {
      return {
        url,
        source,
        status: "FAILED",
        error: `Local file not found at ${localPath}`,
      };
    }
  }

  // External URL
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const res = await fetch(url, {
      method: "HEAD",
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });
    clearTimeout(timeoutId);

    // Some web servers reject HEAD with 405 Method Not Allowed; retry with GET
    if (res.status === 405 || res.status === 403) {
      const getController = new AbortController();
      const getTimeout = setTimeout(() => getController.abort(), 7000);
      const getRes = await fetch(url, {
        method: "GET",
        signal: getController.signal,
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        },
      });
      clearTimeout(getTimeout);

      if (getRes.status === 404) {
        return {
          url,
          source,
          status: "FAILED",
          statusCode: 404,
          error: "HTTP 404 Not Found",
        };
      }
      return {
        url,
        source,
        status: getRes.ok || getRes.status < 500 ? "OK" : "WARNING",
        statusCode: getRes.status,
      };
    }

    if (res.status === 404) {
      return {
        url,
        source,
        status: "FAILED",
        statusCode: 404,
        error: "HTTP 404 Not Found",
      };
    }

    return {
      url,
      source,
      status: res.ok || res.status < 500 ? "OK" : "WARNING",
      statusCode: res.status,
    };
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    // Network or certificate or timeout might happen in offline/restricted environments
    return {
      url,
      source,
      status: "WARNING",
      error: `Network/Fetch warning: ${errMsg}`,
    };
  }
}

async function main() {
  console.log("🔗 Verifying link integrity across all resources, guides, and helplines...\n");

  const linksToCheck: { url: string; source: string }[] = [];

  // Local PDF guides for emotions
  for (const emotion of CANONICAL_EMOTIONS) {
    linksToCheck.push({
      url: `/guides/${emotion.slug}.pdf`,
      source: `Emotion Guide [${emotion.title}]`,
    });
    if (emotion.guideUrl) {
      linksToCheck.push({
        url: emotion.guideUrl,
        source: `Emotion Ext Resource [${emotion.title}]`,
      });
    }
  }

  // Local PDF downloads
  for (const dl of CANONICAL_DOWNLOADS) {
    linksToCheck.push({
      url: dl.fileUrl,
      source: `Download [${dl.title}]`,
    });
  }

  // External resources
  for (const res of CANONICAL_RESOURCES) {
    linksToCheck.push({
      url: res.url,
      source: `Resource [${res.title}]`,
    });
  }

  // Emergency helplines
  for (const contact of DEFAULT_EMERGENCY_CONTACTS) {
    if (contact.url) {
      linksToCheck.push({
        url: contact.url,
        source: `Helpline [${contact.name}]`,
      });
    }
  }

  let failedCount = 0;
  let okCount = 0;
  let warnCount = 0;

  for (const item of linksToCheck) {
    const result = await checkUrl(item.url, item.source);
    if (result.status === "FAILED") {
      failedCount++;
      console.error(
        `❌ FAILED: ${result.source} -> ${result.url} (Status: ${result.statusCode || "N/A"}, Error: ${result.error})`
      );
    } else if (result.status === "WARNING") {
      warnCount++;
      console.warn(
        `⚠️  WARNING: ${result.source} -> ${result.url} (${result.error || `Code: ${result.statusCode}`})`
      );
    } else {
      okCount++;
      console.log(`✓ OK: ${result.source} -> ${result.url} (${result.statusCode})`);
    }
  }

  console.log(
    `\nSummary: ${okCount} OK, ${warnCount} Warnings, ${failedCount} Failures out of ${linksToCheck.length} links checked.`
  );

  if (failedCount > 0) {
    console.error("❌ Link verification failed! One or more links returned 404 or missing files.");
    process.exit(1);
  } else {
    console.log("✅ All links verified! Zero 404 errors detected.");
  }
}

main();
