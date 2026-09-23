import "server-only";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

/**
 * OpenRouter Provider Configuration for Echo AI.
 *
 * 100% Free Models (No token bill, $0.00 cost):
 * - "openrouter/free" (Default: automatically routes to best available free model)
 * - "meta-llama/llama-3.2-3b-instruct:free" (Fast, lightweight, free)
 * - "google/gemini-2.0-flash-lite-preview-02-05:free" (High speed, smart, free)
 * - "deepseek/deepseek-chat:free" (Free)
 *
 * Ultra Low-Cost Paid Alternatives (if needed):
 * - "google/gemini-flash-1.5" (~$0.075 / 1M tokens)
 * - "openai/gpt-4o-mini" (~$0.15 / 1M tokens)
 */
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  headers: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://heardandhealed.org",
    "X-Title": "Heard & Healed",
  },
});

export const DEFAULT_ECHO_MODEL =
  process.env.OPENROUTER_MODEL || "openrouter/free";

export const ECHO_MODEL_SETTINGS = {
  temperature: 0.6,
  maxOutputTokens: 500,
};
