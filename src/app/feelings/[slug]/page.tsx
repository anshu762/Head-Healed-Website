import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { EmotionDetail } from "@/components/feelings/emotion-detail";
import {
  getAllEmotions,
  getEmotionBySlug,
  getRelatedStoryForEmotion,
} from "@/lib/data/feelings-data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const emotions = await getAllEmotions();
  return emotions.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const emotion = await getEmotionBySlug(slug);

  if (!emotion) {
    return {
      title: "Emotion Not Found | Heard & Healed",
    };
  }

  return {
    title: `${emotion.title} — What it feels like & grounding activity | Heard & Healed`,
    description: emotion.description,
    openGraph: {
      title: `${emotion.title} | Heard & Healed`,
      description: emotion.description,
    },
  };
}

export default async function EmotionPage({ params }: Props) {
  const { slug } = await params;
  const emotion = await getEmotionBySlug(slug);

  if (!emotion) {
    notFound();
  }

  const relatedStory = await getRelatedStoryForEmotion(emotion.slug);

  return (
    <div className="py-10 sm:py-16">
      <Container size="narrow">
        <nav className="mb-8" aria-label="Breadcrumb">
          <Link
            href="/feelings"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--hh-blue-deep)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] rounded-md px-2 py-1 -ml-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to all feelings</span>
          </Link>
        </nav>

        <EmotionDetail
          emotion={emotion}
          relatedStory={relatedStory}
          isFullPage={true}
        />
      </Container>
    </div>
  );
}
