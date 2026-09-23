"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StoryCard } from "./story-card";
import { StorySubmissionDialog } from "./story-submission-dialog";
import { Button } from "@/components/ui/button";
import { HeartHandshake, Sparkles, SlidersHorizontal, PlusCircle, Compass } from "lucide-react";
import type { StoryItem, EmotionOption } from "@/lib/data/stories-data";

interface AnonymousStoriesTabProps {
  stories: StoryItem[];
  emotions: EmotionOption[];
}

export function AnonymousStoriesTab({
  stories,
  emotions,
}: AnonymousStoriesTabProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSubmitOpen, setIsSubmitOpen] = React.useState(false);

  // Read active emotion filters from URL (comma-separated or single)
  const selectedEmotions = React.useMemo(() => {
    const raw = searchParams.get("emotion");
    if (!raw) return [];
    return raw.split(",").filter(Boolean);
  }, [searchParams]);

  // Sort state ("newest" | "relatable")
  const sortBy = searchParams.get("sort") || "newest";

  const handleToggleEmotion = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let next: string[];

    if (selectedEmotions.includes(slug)) {
      next = selectedEmotions.filter((s) => s !== slug);
    } else {
      next = [...selectedEmotions, slug];
    }

    if (next.length > 0) {
      params.set("emotion", next.join(","));
    } else {
      params.delete("emotion");
    }

    router.replace(`/stories?${params.toString()}`, { scroll: false });
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("emotion");
    router.replace(`/stories?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (newSort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newSort === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", newSort);
    }
    router.replace(`/stories?${params.toString()}`, { scroll: false });
  };

  // Filtered stories
  const filteredStories = React.useMemo(() => {
    let result = [...stories];

    if (selectedEmotions.length > 0) {
      result = result.filter(
        (s) => s.emotionSlug && selectedEmotions.includes(s.emotionSlug)
      );
    }

    if (sortBy === "relatable") {
      // Sort with featured / earlier read time or title
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      // Newest
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return result;
  }, [stories, selectedEmotions, sortBy]);

  return (
    <div className="space-y-8">
      {/* Top action bar: Filters, Sort & Share CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-3xl border border-hh-line bg-white/70 backdrop-blur-xs p-4 sm:p-5 shadow-warm-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-hh-ink-soft mr-1">
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span>Filter:</span>
          </div>

          <button
            type="button"
            onClick={handleClearFilters}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              selectedEmotions.length === 0
                ? "bg-hh-ink text-white shadow-xs"
                : "bg-hh-cream text-hh-ink-soft hover:text-hh-ink"
            }`}
          >
            All Experiences ({stories.length})
          </button>

          {emotions.map((em) => {
            const isSelected = selectedEmotions.includes(em.slug);
            return (
              <button
                key={em.slug}
                type="button"
                onClick={() => handleToggleEmotion(em.slug)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-hh-blue-deep text-white shadow-xs"
                    : "bg-white border border-hh-line text-hh-ink-soft hover:border-hh-blue hover:text-hh-ink"
                }`}
              >
                {em.title}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
          {/* Sort dropdown */}
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="rounded-full border border-hh-line bg-white px-3.5 py-1.5 text-xs font-semibold text-hh-ink hover:border-hh-blue-deep focus:outline-none"
            aria-label="Sort stories"
          >
            <option value="newest">Sort: Newest</option>
            <option value="relatable">Sort: Most Relatable</option>
          </select>

          {/* Share Your Story CTA */}
          <Button
            variant="primary"
            size="sm"
            onClick={() => setIsSubmitOpen(true)}
            className="shadow-xs"
          >
            <PlusCircle className="h-4 w-4 mr-1.5" />
            Share your story
          </Button>
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        /* Empty State with soft hand-drawn SVG motif */
        <div className="rounded-[28px] border border-dashed border-hh-line bg-white/60 p-12 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hh-sage/20 text-hh-sage-deep mb-4">
            <Compass className="h-8 w-8" />
          </div>
          <h3 className="font-display text-xl font-bold text-hh-ink">
            No stories matching these filters yet
          </h3>
          <p className="mt-2 text-sm text-hh-ink-soft max-w-md mx-auto">
            Be the first to share your experience with this emotion and remind
            another young person that they are not alone.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            {selectedEmotions.length > 0 && (
              <Button variant="ghost" onClick={handleClearFilters}>
                Clear filters
              </Button>
            )}
            <Button variant="primary" onClick={() => setIsSubmitOpen(true)}>
              <HeartHandshake className="h-4 w-4 mr-1.5" />
              Share your story
            </Button>
          </div>
        </div>
      )}

      {/* Story Submission Dialog Modal */}
      <StorySubmissionDialog
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        emotions={emotions}
      />
    </div>
  );
}
