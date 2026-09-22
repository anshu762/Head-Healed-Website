"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Download,
  ExternalLink,
  BookOpen,
  MessageSquareHeart,
  Copy,
  Check,
  Quote,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { calmTransition } from "@/lib/motion";
import { EmotionIcon } from "./emotion-icon";
import { Button } from "@/components/ui/button";
import { GLOBAL_DISCLAIMER } from "@/lib/safety/disclaimers";
import type { EmotionItem, RelatedStoryItem } from "@/lib/data/feelings-data";

interface EmotionDetailProps {
  emotion: EmotionItem;
  relatedStory?: RelatedStoryItem | null;
  isFullPage?: boolean;
}

export function EmotionDetail({
  emotion,
  relatedStory,
  isFullPage = false,
}: EmotionDetailProps) {
  const [copied, setCopied] = React.useState(false);
  const [journalNote, setJournalNote] = React.useState("");

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(
        `${emotion.activityTitle}: ${emotion.activityDescription}`
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API not permitted
    }
  };

  // Support surface motion: 200ms calm fade + 8px rise only
  const motionProps = isFullPage
    ? undefined
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: calmTransition,
      };

  return (
    <motion.div {...motionProps} className="space-y-8 text-hh-ink">
      {/* 1. Header: Emotion icon + Title */}
      <div className="flex items-center gap-4 pb-4 border-b border-hh-line">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-hh-blue/20 text-hh-blue-deep shadow-xs">
          <EmotionIcon
            slug={emotion.slug}
            iconName={emotion.iconName}
            className="h-7 w-7"
          />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-hh-sage-deep">
            Emotion Guide
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-hh-ink">
            {emotion.title}
          </h2>
        </div>
      </div>

      {/* 2. "What it feels like" — Verbatim explanation */}
      <div className="space-y-2">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-hh-ink-soft">
          What it feels like
        </h3>
        <p className="text-base sm:text-lg text-hh-ink leading-relaxed">
          {emotion.description}
        </p>
      </div>

      {/* 3. "Try this" — Reflection & Grounding Activity with Ephemeral Journal */}
      <div className="rounded-[24px] border border-hh-sage/40 bg-hh-sage/15 p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-hh-sage-deep shrink-0 rotate-180" aria-hidden="true" />
            <span className="font-display text-xs font-bold uppercase tracking-wider text-hh-sage-deep">
              Try this grounding reset
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-hh-ink shadow-xs border border-hh-line hover:bg-hh-cream transition-colors focus-visible:ring-2 focus-visible:ring-hh-blue-deep"
            aria-label="Copy activity prompt to clipboard"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-hh-sage-deep" />
                <span className="text-hh-sage-deep">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-hh-ink-soft" />
                <span>Copy activity</span>
              </>
            )}
          </button>
        </div>

        <div>
          <h4 className="font-display text-lg font-bold text-hh-ink mb-1.5">
            {emotion.activityTitle}
          </h4>
          <p className="text-sm sm:text-base text-hh-ink/90 leading-relaxed">
            {emotion.activityDescription}
          </p>
        </div>

        {/* Ephemeral in-memory journaling scratchpad (Not saved anywhere) */}
        <div className="pt-2 border-t border-hh-sage/20 space-y-2">
          <div className="flex items-center justify-between">
            <label
              htmlFor={`scratchpad-${emotion.slug}`}
              className="text-xs font-semibold text-hh-ink"
            >
              Private scratchpad (optional)
            </label>
            <span className="text-[11px] font-semibold text-hh-ink-soft italic">
              This isn&apos;t saved anywhere.
            </span>
          </div>
          <textarea
            id={`scratchpad-${emotion.slug}`}
            rows={3}
            value={journalNote}
            onChange={(e) => setJournalNote(e.target.value)}
            placeholder="Type freely to put your thoughts into words right now. It disappears when you close this window."
            className="w-full rounded-2xl border border-hh-line bg-white/90 p-3.5 text-sm text-hh-ink placeholder:text-hh-ink-soft/70 shadow-xs focus:border-hh-sage-deep focus:outline-none focus:ring-2 focus:ring-hh-sage-deep transition-all resize-none"
          />
        </div>
      </div>

      {/* 4. "Read more" — Download Guide Button (Real generated PDF) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-hh-line bg-hh-cream/70 p-5">
        <div className="space-y-1">
          <h4 className="font-display text-sm font-bold text-hh-ink">
            Printable Emotion Guide
          </h4>
          <p className="text-xs text-hh-ink-soft">
            One-page PDF with reflections, the grounding technique, and safety helplines.
          </p>
        </div>
        <a
          href={`/guides/${emotion.slug}.pdf`}
          download={`heard-healed-${emotion.slug}-guide.pdf`}
          className="inline-flex items-center gap-2 rounded-full bg-hh-blue text-white px-5 py-2.5 text-xs sm:text-sm font-semibold hover:bg-hh-blue-deep transition-colors shadow-xs shrink-0"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          <span>Download Guide (PDF)</span>
        </a>
      </div>

      {/* 5. "Know about it" — Verified external resource link */}
      {emotion.guideUrl && (
        <div className="space-y-2">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-hh-ink-soft">
            Know about it
          </h3>
          <a
            href={emotion.guideUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group flex items-center justify-between rounded-2xl border border-hh-line bg-white p-4 text-sm font-semibold text-hh-blue-deep hover:bg-hh-cream hover:underline transition-colors shadow-xs"
          >
            <span className="truncate pr-3">
              Explore trusted medical &amp; youth guidance on {emotion.title}
            </span>
            <div className="flex items-center gap-1 shrink-0 text-hh-ink-soft group-hover:text-hh-blue-deep">
              <span className="text-xs">External Guide</span>
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only"> (opens in a new tab)</span>
            </div>
          </a>
        </div>
      )}

      {/* 6. "Someone else felt this" — Related approved teen story */}
      <div className="space-y-2">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-hh-ink-soft">
          Someone else felt this
        </h3>
        {relatedStory ? (
          <Link
            href={`/stories#${relatedStory.slug}`}
            className="group block rounded-2xl border border-hh-line bg-white p-5 shadow-xs hover:border-hh-yellow hover:shadow-md transition-all"
          >
            <span className="text-xs font-semibold text-hh-ink-soft mb-1 block">
              Real story from {relatedStory.authorName}
            </span>
            <h4 className="font-display text-base font-bold text-hh-ink group-hover:text-hh-blue-deep transition-colors">
              {relatedStory.title}
            </h4>
            <p className="mt-1 text-xs text-hh-ink-soft line-clamp-2 italic">
              &ldquo;{relatedStory.excerpt}&rdquo;
            </p>
            <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-bold text-hh-blue-deep group-hover:underline">
              <span>Read story</span>
              <ArrowRight className="h-3 w-3" />
            </span>
          </Link>
        ) : (
          <Link
            href={`/stories?emotion=${emotion.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-hh-blue-deep hover:underline"
          >
            <BookOpen className="h-4 w-4" aria-hidden="true" />
            <span>Read community stories related to {emotion.title} →</span>
          </Link>
        )}
      </div>

      {/* 7. Primary CTA: "Talk to Echo about this" -> /echo?emotion=slug */}
      <div className="pt-2">
        <Button asChild variant="primary" size="lg" className="w-full justify-center text-sm font-bold">
          <Link href={`/echo?emotion=${emotion.slug}`} className="flex items-center gap-2">
            <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
            <span>Talk to Echo about this</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>

      {/* 8. Contextual Educational Notice (Constant) */}
      <div className="rounded-2xl border border-hh-line bg-[#FAF7F2] p-4 text-xs text-hh-ink-soft leading-relaxed flex items-start gap-2.5">
        <ShieldCheck className="h-4 w-4 text-hh-ink-soft shrink-0 mt-0.5" aria-hidden="true" />
        <p>{GLOBAL_DISCLAIMER}</p>
      </div>
    </motion.div>
  );
}
