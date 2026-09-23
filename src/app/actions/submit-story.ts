"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { assessRisk } from "@/lib/safety/risk";
import { SubmissionStatus, RiskLevel } from "@prisma/client";

const storySubmissionSchema = z.object({
  title: z
    .string()
    .max(100, "Title must be 100 characters or fewer")
    .optional()
    .transform((val) => (val?.trim() ? val.trim() : undefined)),
  content: z
    .string()
    .min(100, "Your story must be at least 100 characters")
    .max(2500, "Your story must be 2,500 characters or fewer"),
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

    if (cleanContent.length < 100) {
      return {
        success: false,
        message: "Your story must be at least 100 characters long after removing formatting.",
        error: "Too short",
      };
    }

    // 1. Layer 1 Safety Contract: Server-side risk pre-check
    const risk = assessRisk(cleanContent);

    if (risk.level === "critical") {
      // Save as FLAGGED - DO NOT PUBLISH
      try {
        const slug = generateSlug(cleanTitle, emotionSlug);
        await db.story.create({
          data: {
            slug,
            title: cleanTitle || "Shared Thoughts",
            excerpt: cleanContent.slice(0, 150) + "...",
            content: cleanContent,
            authorName: cleanAuthor,
            isAnonymous: true,
            status: SubmissionStatus.FLAGGED,
            riskLevel: RiskLevel.HIGH,
            emotionSlug: emotionSlug || null,
          },
        });
      } catch (e) {
        console.error("Failed to save flagged story:", e);
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
    const slug = generateSlug(cleanTitle, emotionSlug);
    const excerpt =
      cleanContent.length > 150
        ? cleanContent.slice(0, 147) + "..."
        : cleanContent;

    await db.story.create({
      data: {
        slug,
        title: cleanTitle || (emotionSlug ? `Reflections on ${emotionSlug}` : "Anonymous Reflection"),
        excerpt,
        content: cleanContent,
        authorName: cleanAuthor,
        isAnonymous: cleanAuthor.toLowerCase().includes("anonymous"),
        status: SubmissionStatus.PENDING,
        riskLevel: risk.level === "elevated" ? RiskLevel.MEDIUM : RiskLevel.NONE,
        emotionSlug: emotionSlug || null,
      },
    });

    return {
      success: true,
      escalate: false,
      message:
        "Thank you for sharing your story. Every submission is reviewed with care by our team before appearing publicly to keep our community safe and supportive.",
    };
  } catch (err) {
    console.error("Error in submitStory:", err);
    return {
      success: false,
      message:
        "We could not save your submission at this moment. Please check your connection and try again.",
      error: "Internal error",
    };
  }
}
