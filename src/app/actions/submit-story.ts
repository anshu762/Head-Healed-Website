"use server";

import { z } from "zod";
import { db, isDbConfigured } from "@/lib/db";
import { assessRisk } from "@/lib/safety/risk";
import { SubmissionStatus, RiskLevel } from "@prisma/client";
import { saveLocalStory } from "@/lib/data/local-store";

const storySubmissionSchema = z.object({
  title: z
    .string()
    .max(100, "Title must be 100 characters or fewer")
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : undefined)),
  content: z
    .string()
    .min(10, "Please share at least a few words about what you are experiencing")
    .max(25000, "Your story is exceptionally long. Please keep under 25,000 characters"),
  emotionSlug: z.string().optional(),
  authorName: z
    .string()
    .max(50, "Display name must be 50 characters or fewer")
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : "Anonymous")),
  agreedToGuidelines: z.literal(true, {
    errorMap: () => ({
      message: "You must read and agree to the Community Guidelines",
    }),
  }),
});

export type StorySubmissionInput = z.infer<typeof storySubmissionSchema>;

export interface StorySubmissionResponse {
  success: boolean;
  escalate?: boolean;
  message: string;
  error?: string;
}

function stripHtml(input: string): string {
  return input.replace(/<[^>]*>?/gm, "").trim();
}

function generateSlug(title?: string, emotionSlug?: string): string {
  const base = title
    ? title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : emotionSlug
    ? `story-${emotionSlug}`
    : "anonymous-story";

  const randomSuffix = Math.random().toString(36).substring(2, 8);
  const timestamp = Date.now().toString(36).slice(-4);
  return `${base.slice(0, 35)}-${timestamp}${randomSuffix}`;
}

export async function submitStory(
  input: unknown
): Promise<StorySubmissionResponse> {
  try {
    const parseResult = storySubmissionSchema.safeParse(input);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message || "Validation failed";
      return {
        success: false,
        message: firstError,
        error: firstError,
      };
    }

    const { title, content, emotionSlug, authorName } = parseResult.data;

    // Clean input
    const cleanContent = stripHtml(content);
    const cleanTitle = title ? stripHtml(title) : undefined;
    const cleanAuthor = authorName ? stripHtml(authorName) : "Anonymous";

    if (cleanContent.length < 10) {
      return {
        success: false,
        message: "Please share at least a few words about what you are experiencing.",
        error: "Too short",
      };
    }

    // 1. Layer 1 Safety Contract: Server-side risk pre-check
    const risk = assessRisk(cleanContent);
    const slug = generateSlug(cleanTitle, emotionSlug);
    const excerpt =
      cleanContent.length > 150
        ? cleanContent.slice(0, 147) + "..."
        : cleanContent;

    if (risk.level === "critical") {
      const flaggedData = {
        slug,
        title: cleanTitle || "Shared Thoughts",
        excerpt: cleanContent.slice(0, 150) + "...",
        content: cleanContent,
        authorName: cleanAuthor,
        isAnonymous: true,
        status: SubmissionStatus.FLAGGED,
        riskLevel: RiskLevel.HIGH,
        emotionSlug: emotionSlug || null,
      };

      // Attempt DB save if configured, otherwise save locally
      if (isDbConfigured()) {
        try {
          const dbPromise = db.story.create({ data: flaggedData });
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("DB Timeout")), 2000)
          );
          await Promise.race([dbPromise, timeoutPromise]);
        } catch {
          saveLocalStory(flaggedData);
        }
      } else {
        saveLocalStory(flaggedData);
      }

      // Signal client to trigger Emergency Support Modal
      return {
        success: true,
        escalate: true,
        message:
          "Thank you for sharing with us. Because what you shared indicates you may be in immediate distress or danger, please connect with someone who can support you right now.",
      };
    }

    // 2. Normal / Elevated Submissions: save as PENDING
    const storyData = {
      slug,
      title: cleanTitle || (emotionSlug ? `Reflections on ${emotionSlug}` : "Anonymous Reflection"),
      excerpt,
      content: cleanContent,
      authorName: cleanAuthor,
      isAnonymous: cleanAuthor.toLowerCase().includes("anonymous"),
      status: SubmissionStatus.PENDING,
      riskLevel: risk.level === "elevated" ? RiskLevel.MEDIUM : RiskLevel.NONE,
      emotionSlug: emotionSlug || null,
    };

    let savedInDb = false;
    if (isDbConfigured()) {
      try {
        const dbPromise = db.story.create({ data: storyData });
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("DB Timeout")), 2000)
        );
        await Promise.race([dbPromise, timeoutPromise]);
        savedInDb = true;
      } catch {
        // Database not reachable, save locally
      }
    }

    if (!savedInDb) {
      saveLocalStory(storyData);
    }

    return {
      success: true,
      escalate: false,
      message:
        "Thank you for sharing your story. Every submission is reviewed with care by our team before appearing publicly to keep our community safe and supportive.",
    };
  } catch (err) {
    console.error("Error in submitStory:", err);
    return {
      success: true,
      escalate: false,
      message:
        "Thank you for sharing your story. Every submission is reviewed with care by our team before appearing publicly to keep our community safe and supportive.",
    };
  }
}
