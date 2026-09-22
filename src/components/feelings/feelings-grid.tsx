"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import { EmotionIcon } from "@/components/feelings/emotion-icon";
import type { EmotionItem } from "@/lib/data/feelings-data";

interface FeelingsGridProps {
  emotions: EmotionItem[];
}

const TINT_STYLES = [
  {
    bg: "bg-[#EEF5FA]",
    border: "border-[#D1E3F0]",
    hoverBorder: "hover:border-[#7FA9C9]",
    badgeBg: "bg-[#DDEBF5]",
    badgeText: "text-[#3D6B8C]",
    iconContainer: "bg-white/80 shadow-xs",
  },
  {
    bg: "bg-[#F1F7F3]",
    border: "border-[#D4E8DA]",
    hoverBorder: "hover:border-[#A8C8B0]",
    badgeBg: "bg-[#DFEFE4]",
    badgeText: "text-[#477053]",
    iconContainer: "bg-white/80 shadow-xs",
  },
  {
    bg: "bg-[#FDFBF2]",
    border: "border-[#F4EEC7]",
    hoverBorder: "hover:border-[#DFD280]",
    badgeBg: "bg-[#F7F2D7]",
    badgeText: "text-[#7A6B29]",
    iconContainer: "bg-white/80 shadow-xs",
  },
];

export function FeelingsGrid({ emotions }: FeelingsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const shouldReduceMotion = useReducedMotion();

  const filteredEmotions = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return emotions;
    return emotions.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.activityTitle.toLowerCase().includes(q)
    );
  }, [emotions, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md" role="search">
          <label htmlFor="feelings-search" className="sr-only">
            Search feelings and emotions
          </label>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--hh-ink-soft)] pointer-events-none"
              aria-hidden="true"
            />
            <input
              id="feelings-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by emotion, thought, or sensation..."
              className="w-full pl-11 pr-10 py-3 rounded-full bg-white border border-[var(--hh-line)] text-[var(--hh-ink)] placeholder:text-[var(--hh-ink-soft)] shadow-xs text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[var(--hh-blue)] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[var(--hh-ink-soft)] hover:text-[var(--hh-ink)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--hh-blue)]"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        <div className="text-sm font-medium text-[var(--hh-ink-soft)] self-start sm:self-center">
          {filteredEmotions.length === emotions.length ? (
            <span>Showing all {emotions.length} emotions</span>
          ) : (
            <span>
              Found {filteredEmotions.length} of {emotions.length} emotions
            </span>
          )}
        </div>
      </div>

      {/* Grid */}
      {filteredEmotions.length === 0 ? (
        <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[var(--hh-line)]">
          <div className="w-12 h-12 rounded-full bg-[var(--hh-cream)] flex items-center justify-center mx-auto mb-3 text-[var(--hh-ink-soft)]">
            <Search className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-lg font-bold text-[var(--hh-ink)] mb-1">
            No feelings match &ldquo;{searchQuery}&rdquo;
          </h2>
          <p className="text-sm text-[var(--hh-ink-soft)] max-w-sm mx-auto mb-5">
            Try searching for a different word or clear the filter to browse all feelings.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--hh-blue-deep)] text-white text-sm font-medium hover:bg-[var(--hh-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] transition-colors"
          >
            Clear filter
          </button>
        </div>
      ) : (
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Emotion guides list"
        >
          {filteredEmotions.map((emotion, index) => {
            const tint = TINT_STYLES[index % TINT_STYLES.length];

            return (
              <motion.div
                key={emotion.slug}
                role="listitem"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.35,
                  delay: shouldReduceMotion ? 0 : Math.min(index * 0.05, 0.3),
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="h-full"
              >
                <Link
                  href={`/feelings/${emotion.slug}`}
                  scroll={false}
                  className={`group relative flex flex-col justify-between h-full p-6 sm:p-7 rounded-3xl border ${tint.bg} ${tint.border} ${tint.hoverBorder} transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] focus-visible:ring-offset-2`}
                  aria-label={`Explore ${emotion.title}: ${emotion.description}`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div
                        className={`w-14 h-14 rounded-2xl ${tint.iconContainer} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                      >
                        <EmotionIcon
                          slug={emotion.slug}
                          iconName={emotion.iconName}
                          className="w-8 h-8"
                        />
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tint.badgeBg} ${tint.badgeText}`}
                      >
                        Guide & Activity
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--hh-ink)] mb-2.5 group-hover:text-[var(--hh-blue-deep)] transition-colors">
                      {emotion.title}
                    </h2>

                    <p className="text-sm text-[var(--hh-ink)] line-clamp-2 leading-relaxed mb-4">
                      {emotion.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between mt-auto">
                    <span className="text-xs font-semibold text-[var(--hh-ink-soft)] group-hover:text-[var(--hh-ink)] transition-colors">
                      Try: {emotion.activityTitle}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[var(--hh-blue-deep)] group-hover:translate-x-0.5 transition-transform">
                      <span>Explore</span>
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
