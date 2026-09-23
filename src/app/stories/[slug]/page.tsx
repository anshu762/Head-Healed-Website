import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { getStoryBySlug, getApprovedStories } from "@/lib/data/stories-data";
import {
  ArrowLeft,
  Clock,
  HeartHandshake,
  MessageCircle,
  Compass,
  BookOpen,
  Share2,
} from "lucide-react";

interface StoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Story Not Found | Heard & Healed",
    };
  }

  return {
    title: `${story.title} | Heard & Healed Stories`,
    description: story.excerpt,
    openGraph: {
      title: story.title,
      description: story.excerpt,
      type: "article",
    },
  };
}

export async function generateStaticParams() {
  const stories = await getApprovedStories();
  return stories.map((s) => ({
    slug: s.slug,
  }));
}

export default async function StoryDetailPage({ params }: StoryPageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  const formattedEmotion = story.emotionSlug
    ? story.emotionSlug.replace(/-/g, " ")
    : null;

  return (
    <article className="py-12 sm:py-20">
      <Container size="narrow">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-xs font-bold text-hh-ink-soft hover:text-hh-blue-deep transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to all stories</span>
          </Link>
        </div>

        {/* Story Header */}
        <header className="space-y-4 pb-8 border-b border-hh-line">
          {/* Tags & Read Time */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {formattedEmotion && story.emotionSlug ? (
              <Link
                href={`/feelings/${story.emotionSlug}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-hh-blue/15 px-3 py-1 font-semibold text-hh-blue-deep hover:bg-hh-blue/25 transition-colors capitalize"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-hh-blue-deep" />
                {formattedEmotion}
              </Link>
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

          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-hh-ink leading-tight">
            {story.title}
          </h1>

          <div className="flex items-center justify-between text-xs text-hh-ink-soft pt-1">
            <span>
              Shared by <strong className="text-hh-ink">{story.authorName}</strong>
            </span>
            <span>Anonymous Community Voice</span>
          </div>
        </header>

        {/* Story Body */}
        <div className="py-8 prose prose-neutral max-w-none text-hh-ink text-[17px] leading-[1.8] space-y-5">
          <p className="whitespace-pre-line">{story.content}</p>
        </div>

        {/* Supportive Next Steps Card */}
        <div className="mt-12 rounded-[28px] border border-hh-line bg-white p-7 sm:p-8 shadow-warm">
          <div className="flex items-center gap-2.5 text-xs font-bold text-hh-blue-deep uppercase tracking-wider mb-2">
            <Compass className="h-4 w-4" />
            <span>Reflect &amp; Support</span>
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-hh-ink">
            Relating to this experience?
          </h2>

          <p className="mt-2 text-sm text-hh-ink-soft leading-relaxed">
            You don’t have to carry your thoughts alone. Explore our guided
            reflections for this emotion, or pause and talk through what you’re
            feeling with Echo.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {story.emotionSlug && (
              <>
                <Button variant="primary" asChild>
                  <Link href={`/echo?emotion=${story.emotionSlug}`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Talk to Echo about this
                  </Link>
                </Button>

                <Button variant="secondary" asChild>
                  <Link href={`/feelings/${story.emotionSlug}`}>
                    <Compass className="h-4 w-4 mr-2" />
                    Explore the {formattedEmotion} guide
                  </Link>
                </Button>
              </>
            )}

            <Button variant="ghost" asChild>
              <Link href="/stories">
                <BookOpen className="h-4 w-4 mr-2" />
                Read more stories
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </article>
  );
}
