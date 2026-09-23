/**
 * CRITICAL PRIVACY CONTRACT:
 *
 * Under NO circumstances should chat messages, user reflections, story bodies,
 * form free-text, or identifying information be passed into analytics.
 *
 * Only track non-identifying event names, categories, and numerical/slug counts.
 */

declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

export type AnalyticsEventName =
  | "cta_click"
  | "talk_to_echo_click"
  | "explore_feelings_click"
  | "read_stories_click"
  | "emotion_card_open"
  | "guide_download"
  | "story_submission_attempt"
  | "story_submission_success"
  | "story_submission_escalate"
  | "faq_open"
  | "emergency_modal_open"
  | "emergency_helpline_call"
  | "myth_revealed";

export function trackEvent(
  eventName: AnalyticsEventName,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === "undefined") return;

  // 1. Google Analytics 4
  if (typeof window.gtag === "function") {
    window.gtag("event", eventName, params);
  }

  // 2. Microsoft Clarity custom event
  if (typeof window.clarity === "function") {
    window.clarity("event", eventName);
  }
}
