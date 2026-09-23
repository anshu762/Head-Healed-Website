"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AnonymousStoriesTab } from "./anonymous-stories-tab";
import { MythOrFactTab } from "./myth-or-fact-tab";
import { BookOpen, Sparkles } from "lucide-react";
import type { StoryItem, MythItem, EmotionOption } from "@/lib/data/stories-data";

interface StoriesHubProps {
  stories: StoryItem[];
  myths: MythItem[];
  emotions: EmotionOption[];
}

export function StoriesHub({ stories, myths, emotions }: StoriesHubProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read active tab from URL query param: default = "stories"
  const currentTab = searchParams.get("tab") === "myths" ? "myths" : "stories";

  const handleTabChange = (tab: "stories" | "myths") => {
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "myths") {
      params.set("tab", "myths");
    } else {
      params.delete("tab");
    }
    router.replace(`/stories?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-8">
      {/* Top Tab Switcher with Framer Motion layoutId */}
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-hh-line bg-white/80 p-1.5 shadow-warm-sm backdrop-blur-xs">
          <button
            type="button"
            onClick={() => handleTabChange("stories")}
            className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
              currentTab === "stories"
                ? "text-hh-ink"
                : "text-hh-ink-soft hover:text-hh-ink"
            }`}
          >
            {currentTab === "stories" && (
              <motion.div
                layoutId="stories-tab-active"
                className="absolute inset-0 rounded-full bg-hh-cream shadow-xs border border-hh-line/60"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <BookOpen className="relative z-10 h-4 w-4 text-hh-blue-deep" />
            <span className="relative z-10">Anonymous Stories ({stories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("myths")}
            className={`relative flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold transition-colors ${
              currentTab === "myths"
                ? "text-hh-ink"
                : "text-hh-ink-soft hover:text-hh-ink"
            }`}
          >
            {currentTab === "myths" && (
              <motion.div
                layoutId="stories-tab-active"
                className="absolute inset-0 rounded-full bg-hh-cream shadow-xs border border-hh-line/60"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <Sparkles className="relative z-10 h-4 w-4 text-amber-600" />
            <span className="relative z-10">Myth or Fact? ({myths.length})</span>
          </button>
        </div>
      </div>

      {/* Tab Panels */}
      <div>
        {currentTab === "stories" ? (
          <AnonymousStoriesTab stories={stories} emotions={emotions} />
        ) : (
          <MythOrFactTab myths={myths} />
        )}
      </div>
    </div>
  );
}
