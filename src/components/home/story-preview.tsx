"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ArrowRight, Quote } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { useSafeMotion } from "@/lib/motion";
import type { HomeStoryItem } from "@/lib/data/home-data";

interface StoryPreviewProps {
  stories: HomeStoryItem[];
}

export function StoryPreview({ stories }: StoryPreviewProps) {
  const { fadeUp, stagger } = useSafeMotion();

  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-hh-line">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            badge="Real Voices"
            title="Stories From Other Teens"
            description="Real, anonymous experiences written in honest youth voices. Discover that what you’re feeling is something others have felt too."
            align="left"
          />

          <Button asChild variant="outline" size="default" className="shrink-0 self-start md:self-auto">
            <Link href="/stories" className="flex items-center gap-1.5 font-semibold">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              <span>Read all stories</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* 3 Story Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-6 lg:grid-cols-3"
        >
          {stories.map((story) => (
            <motion.div key={story.slug} variants={fadeUp}>
              <div className="group relative flex flex-col justify-between h-full rounded-[24px] border border-hh-line bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    {story.emotionSlug && (
                      <Pill variant="sage" size="sm" className="capitalize">
                        {story.emotionSlug.replace("-", " ")}
                      </Pill>
                    )}
                    <span className="text-xs font-semibold text-hh-ink-soft">
                      {story.authorName}
                    </span>
                  </div>

                  <h3 className="font-display text-lg font-bold text-hh-ink mb-3 group-hover:text-hh-blue-deep transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <div className="relative pl-3 border-l-2 border-hh-yellow">
                    <p className="text-xs sm:text-sm text-hh-ink-soft leading-relaxed italic">
                      “{story.excerpt}”
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-hh-line/60">
                  <Link
                    href={`/stories#${story.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-hh-blue-deep hover:underline"
                  >
                    <span>Read full story</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
