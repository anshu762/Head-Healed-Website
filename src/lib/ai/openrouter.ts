import "server-only";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

/**
 * OpenRouter Provider Configuration for Echo AI.
 *
 * Ultra Low-Cost & High-Speed Gemini Models (Cost is practically zero / fractions of a cent):
 * - "google/gemini-2.5-flash-lite" (Default: $0.10/1M prompt, $0.40/1M completion, super fast ~1.9s TTFT)
 * - "google/gemini-2.5-flash" (Fast, high-fidelity emotional reflection)
 * - "openrouter/free" (Fallback free tier)
 */
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  headers: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://heardandhealed.org",
    "X-Title": "Heard & Healed",
  },
});

export const DEFAULT_ECHO_MODEL =
  process.env.OPENROUTER_MODEL || "google/gemini-2.5-flash-lite";

export const ECHO_MODEL_SETTINGS = {
  temperature: 0.6,
  maxOutputTokens: 500,
};
