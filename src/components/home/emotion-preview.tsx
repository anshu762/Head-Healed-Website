"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CloudRain,
  Compass,
  Flame,
  CloudFog,
  Sparkles,
  Ghost,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { useSafeMotion } from "@/lib/motion";
import type { HomeEmotionItem } from "@/lib/data/home-data";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  CloudRain,
  Compass,
  Flame,
  CloudFog,
  Sparkles,
  Ghost,
};

interface EmotionPreviewProps {
  emotions: HomeEmotionItem[];
}

export function EmotionPreview({ emotions }: EmotionPreviewProps) {
  const { fadeUp, stagger } = useSafeMotion();

  return (
    <section className="py-20 sm:py-28 bg-white/40 border-t border-hh-line">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16">
          <SectionHeading
            badge="What Are You Feeling?"
            title="Explore Common Emotions"
            description="Name what’s inside. Tap any emotion to explore what it feels like and try a gentle grounding reset."
            align="left"
          />

          <Button asChild variant="outline" size="default" className="shrink-0 self-start md:self-auto">
            <Link href="/feelings" className="flex items-center gap-1.5 font-semibold">
              <span>Explore all feelings</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>

        {/* Grid of Emotion Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {emotions.map((emotion) => {
            const IconComponent = ICON_MAP[emotion.iconName] || Heart;

            return (
              <motion.div key={emotion.slug} variants={fadeUp}>
                <Link
                  href={`/feelings#${emotion.slug}`}
                  className="group flex flex-col justify-between h-full rounded-[24px] border border-hh-line bg-white p-6 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-hh-blue hover:shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-display text-lg font-bold text-hh-ink group-hover:text-hh-blue-deep transition-colors">
                        {emotion.title}
                      </span>
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-hh-blue/15 text-hh-blue-deep group-hover:bg-hh-blue group-hover:text-white transition-colors">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-hh-ink-soft leading-relaxed line-clamp-2">
                      {emotion.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-hh-line/60 flex items-center gap-1 text-xs font-semibold text-hh-blue-deep group-hover:underline">
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
