"use client";

import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

interface EmotionMapping {
  slug: string;
  title: string;
  keywords: RegExp[];
}

const EMOTIONS_METADATA: EmotionMapping[] = [
  {
    slug: "anxiety",
    title: "Anxiety",
    keywords: [/\banxiety\b/i, /\banxious\b/i, /\bworrying\b/i],
  },
  {
    slug: "loneliness",
    title: "Loneliness",
    keywords: [/\bloneliness\b/i, /\blonely\b/i, /\bisolation\b/i],
  },
  {
    slug: "burnout",
    title: "Burnout",
    keywords: [/\bburnout\b/i, /\bmental exhaustion\b/i, /\brun on empty\b/i],
  },
  {
    slug: "emotional-numbness",
    title: "Emotional Numbness",
    keywords: [/\bnumbness\b/i, /\bemotionally numb\b/i, /\bfeeling numb\b/i],
  },
  {
    slug: "identity-stress",
    title: "Identity Stress",
    keywords: [/\bidentity stress\b/i, /\bwho i am\b/i, /\bidentity\b/i],
  },
  {
    slug: "feeling-invisible",
    title: "Social Exclusion",
    keywords: [/\bfeeling invisible\b/i, /\bsocial exclusion\b/i, /\bleft out\b/i],
  },
  {
    slug: "academic-pressure",
    title: "Academic Pressure",
    keywords: [/\bacademic pressure\b/i, /\bexam stress\b/i, /\bschool pressure\b/i],
  },
  {
    slug: "family-pressure",
    title: "Family Pressure",
    keywords: [/\bfamily pressure\b/i, /\bexpectations at home\b/i],
  },
  {
    slug: "self-esteem-confusion",
    title: "Self-Esteem",
    keywords: [/\bself-esteem\b/i, /\blow confidence\b/i, /\bself esteem\b/i],
  },
];

interface ResourceChipLinkerProps {
  content: string;
}

export function ResourceChipLinker({ content }: ResourceChipLinkerProps) {
  if (!content) return null;

  // Find unique emotions mentioned in the text
  const matchedEmotions: EmotionMapping[] = [];

  for (const emotion of EMOTIONS_METADATA) {
    for (const kw of emotion.keywords) {
      if (kw.test(content)) {
        if (!matchedEmotions.some((e) => e.slug === emotion.slug)) {
          matchedEmotions.push(emotion);
        }
        break;
      }
    }
  }

  if (matchedEmotions.length === 0) return null;

  return (
    <div className="pt-3 mt-3 border-t border-black/5 flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold text-[var(--hh-ink-soft)] flex items-center gap-1">
        <Compass className="w-3.5 h-3.5 text-[var(--hh-blue-deep)]" aria-hidden="true" />
        <span>Related Guide:</span>
      </span>

      {matchedEmotions.slice(0, 2).map((emotion) => (
        <Link
          key={emotion.slug}
          href={`/feelings/${emotion.slug}`}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EBF3F9] text-[var(--hh-blue-deep)] text-xs font-bold hover:bg-[#DDEBF5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] transition-colors"
        >
          <span>Explore {emotion.title}</span>
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      ))}
    </div>
  );
}
