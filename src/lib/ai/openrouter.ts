import "server-only";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

/**
 * OpenRouter Provider Configuration for Echo AI.
 *
 * Supported & Tested Alternative Models:
 * - "anthropic/claude-3.5-haiku" (Default: fast, warm, highly empathetic)
 * - "openai/gpt-4o-mini" (Fast, balanced, conversational)
 * - "google/gemini-flash-1.5" (High throughput, responsive)
 * - "meta-llama/llama-3.3-70b-instruct" (Open weights alternative)
 */
export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
  headers: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL || "https://heardandhealed.org",
    "X-Title": "Heard & Healed",
  },
});

export const DEFAULT_ECHO_MODEL =
  process.env.OPENROUTER_MODEL || "anthropic/claude-3.5-haiku";

export const ECHO_MODEL_SETTINGS = {
  temperature: 0.6,
  maxOutputTokens: 500,
};
