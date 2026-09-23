"use client";

import Link from "next/link";
import { BookOpen, Clock, HeartHandshake } from "lucide-react";
import type { StoryItem } from "@/lib/data/stories-data";

interface StoryCardProps {
  story: StoryItem;
}

export function StoryCard({ story }: StoryCardProps) {
  const formattedEmotion = story.emotionSlug
    ? story.emotionSlug.replace(/-/g, " ")
    : null;

  return (
    <Link
      href={`/stories/${story.slug}`}
      className="group relative flex flex-col justify-between rounded-[24px] border border-hh-line bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(59,59,59,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-hh-blue-deep/30 hover:shadow-[0_16px_40px_rgba(59,59,59,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep"
    >
      <div>
        {/* Top Meta: Emotion Tag & Read Time */}
        <div className="flex items-center justify-between gap-3 text-xs">
          {formattedEmotion ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-hh-blue/15 px-3 py-1 font-semibold text-hh-blue-deep capitalize">
              <span className="h-1.5 w-1.5 rounded-full bg-hh-blue-deep" />
              {formattedEmotion}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 rounded-full bg-hh-sage/20 px-3 py-1 font-semibold text-hh-sage-deep">
              <HeartHandshake className="h-3 w-3" />
              Shared Story
            </span>
          )}

          <span className="inline-flex items-center gap-1 text-hh-ink-soft">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {story.readTimeMinutes} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="mt-4 font-display text-lg sm:text-xl font-bold text-hh-ink transition-colors group-hover:text-hh-blue-deep leading-snug">
          {story.title}
        </h3>

        {/* 2-line clamped excerpt */}
        <p className="mt-2.5 text-sm text-hh-ink-soft leading-relaxed line-clamp-2">
          {story.excerpt}
        </p>
      </div>

      {/* Footer: Author & Read link */}
      <div className="mt-6 flex items-center justify-between border-t border-hh-line/60 pt-4 text-xs font-medium text-hh-ink-soft">
        <span className="font-semibold text-hh-ink">
          {story.authorName}
        </span>
        <span className="flex items-center gap-1 text-hh-blue-deep group-hover:underline">
          Read story <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}
