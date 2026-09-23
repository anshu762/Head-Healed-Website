import * as fs from "fs";
import * as path from "path";

const DOCS_MAP: Record<string, string> = {
  "Academic Pressure & Expectations.pdf": "academic-pressure.pdf",
  "Anxiety.pdf": "anxiety.pdf",
  "Burnout.pdf": "burnout.pdf",
  "Emotional Numbness.pdf": "emotional-numbness.pdf",
  "Family Pressure.pdf": "family-pressure.pdf",
  "Identity Stress.pdf": "identity-stress.pdf",
  "Loneliness.pdf": "loneliness.pdf",
  "Self-Esteem.pdf": "self-esteem-confusion.pdf",
  "Social Exclusion.pdf": "feeling-invisible.pdf",
};

export function syncClientDocs() {
  const docsDir = path.join(process.cwd(), "public", "docs");
  const guidesDir = path.join(process.cwd(), "public", "guides");

  if (!fs.existsSync(docsDir)) {
    console.warn("⚠️  public/docs directory not found. Skipping client docs sync.");
    return;
  }

  if (!fs.existsSync(guidesDir)) {
    fs.mkdirSync(guidesDir, { recursive: true });
  }

  console.log("📚 Syncing official client guide PDFs from public/docs to public/guides...");

  let synced = 0;
  for (const [docName, guideSlugFile] of Object.entries(DOCS_MAP)) {
    const src = path.join(docsDir, docName);
    const dest = path.join(guidesDir, guideSlugFile);

    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      const stat = fs.statSync(dest);
      console.log(`  ✓ Synced ${docName} -> public/guides/${guideSlugFile} (${(stat.size / 1024 / 1024).toFixed(2)} MB)`);
      synced++;
    } else {
      console.warn(`  ⚠️  Source not found: ${src}`);
    }
  }

  console.log(`✅ Synced ${synced} of ${Object.keys(DOCS_MAP).length} official client guides!\n`);
}

if (require.main === module) {
  syncClientDocs();
}
