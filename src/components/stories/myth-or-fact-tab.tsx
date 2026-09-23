"use client";

import * as React from "react";
import { ArrowUpRight, HelpCircle, CheckCircle2, RotateCcw, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MythItem } from "@/lib/data/stories-data";

interface MythOrFactTabProps {
  myths: MythItem[];
}

export function MythOrFactTab({ myths }: MythOrFactTabProps) {
  // Explored myth IDs in current session
  const [revealedIds, setRevealedIds] = React.useState<Set<string>>(new Set());
  const [showAll, setShowAll] = React.useState(false);

  const handleReveal = (id: string) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const handleToggleShowAll = () => {
    if (showAll) {
      setShowAll(false);
    } else {
      setShowAll(true);
      setRevealedIds(new Set(myths.map((m) => m.id)));
    }
  };

  const handleReset = () => {
    setRevealedIds(new Set());
    setShowAll(false);
  };

  const exploredCount = showAll ? myths.length : revealedIds.size;

  return (
    <div className="space-y-8">
      {/* Top Banner: Explored Progress & Show All Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-hh-line bg-white/70 backdrop-blur-xs p-5 shadow-warm-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-hh-yellow/40 px-3 py-1 text-xs font-bold text-hh-ink">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              Decode Therapy Quiz
            </span>
            <span className="text-xs font-semibold text-hh-ink-soft">
              Explore &amp; Unlearn
            </span>
          </div>
          <p className="text-sm font-semibold text-hh-ink pt-0.5">
            You’ve explored{" "}
            <span className="text-hh-blue-deep font-bold">
              {exploredCount} of {myths.length}
            </span>{" "}
            common therapy misconceptions
          </p>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          {revealedIds.size > 0 && !showAll && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-hh-ink-soft"
            >
              <RotateCcw className="h-3.5 w-3.5 mr-1" />
              Reset
            </Button>
          )}

          <Button
            variant="secondary"
            size="sm"
            onClick={handleToggleShowAll}
            className="text-xs"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5" />
            {showAll ? "Hide answers" : "Show all answers"}
          </Button>
        </div>
      </div>

      {/* 12 Myths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myths.map((item, index) => {
          const isRevealed = showAll || revealedIds.has(item.id);

          return (
            <div
              key={item.id}
              className="relative flex flex-col justify-between rounded-[24px] border border-hh-line bg-white p-6 sm:p-7 shadow-[0_8px_30px_rgba(59,59,59,0.04)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(59,59,59,0.07)]"
            >
              <div>
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold text-hh-ink-soft">
                    Statement #{index + 1}
                  </span>
                  {isRevealed && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-hh-coral/15 px-3 py-1 text-xs font-bold tracking-wider uppercase text-hh-ink">
                      MYTH
                    </span>
                  )}
                </div>

                {/* Statement Quote */}
                <blockquote className="font-display text-lg font-bold text-hh-ink leading-snug">
                  {item.myth}
                </blockquote>

                {/* Revealed State with 250ms transition */}
                <div
                  className={`transition-all duration-250 ease-out overflow-hidden ${
                    isRevealed
                      ? "opacity-100 max-h-96 mt-4 pt-4 border-t border-hh-line"
                      : "opacity-0 max-h-0"
                  }`}
                >
                  <div className="space-y-3">
                    <p className="text-sm text-hh-ink leading-relaxed">
                      <span className="font-bold text-hh-sage-deep block mb-1">
                        The Fact:
                      </span>
                      {item.fact}
                    </p>

                    <div className="pt-2">
                      <a
                        href={item.referenceUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-hh-blue-deep hover:underline"
                      >
                        <span>Learn more ({item.referenceTitle})</span>
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Unrevealed Buttons */}
              {!isRevealed && (
                <div className="mt-6 pt-4 border-t border-hh-line/60">
                  <p className="text-xs font-semibold text-hh-ink-soft mb-2.5">
                    What do you think?
                  </p>
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleReveal(item.id)}
                      className="rounded-full border border-hh-line bg-hh-cream px-3 py-2 text-xs font-bold text-hh-ink transition-all hover:bg-white hover:border-hh-blue-deep hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep"
                    >
                      Myth
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReveal(item.id)}
                      className="rounded-full border border-hh-line bg-hh-cream px-3 py-2 text-xs font-bold text-hh-ink transition-all hover:bg-white hover:border-hh-blue-deep hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep"
                    >
                      Fact
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
