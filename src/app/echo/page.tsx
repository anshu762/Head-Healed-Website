import { Suspense } from "react";
import type { Metadata } from "next";
import {
  MessageSquareHeart,
  Compass,
  BookOpen,
  Sprout,
  ShieldAlert,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EchoChat } from "@/components/echo/echo-chat";
import { getEmotionBySlug } from "@/lib/data/feelings-data";

export const metadata: Metadata = {
  title: "Talk to Echo — Reflective AI Companion | Heard & Healed",
  description:
    "A calm, non-judgmental space to put feelings into words, explore confusing emotions, and discover supportive tools.",
  openGraph: {
    title: "Talk to Echo | Heard & Healed",
    description:
      "A calm, non-judgmental space to put feelings into words, explore confusing emotions, and discover supportive tools.",
  },
};

const ECHO_CAPABILITIES = [
  {
    icon: MessageSquareHeart,
    title: "Talk it out",
    description:
      "Put tangled thoughts and feelings into words without fear of judgment or interruption.",
    color: "bg-[#EEF5FA] text-[var(--hh-blue-deep)]",
  },
  {
    icon: Compass,
    title: "Reflect",
    description:
      "Pause and gently explore what your body and emotions might be trying to tell you.",
    color: "bg-[#F1F7F3] text-[#477053]",
  },
  {
    icon: BookOpen,
    title: "Explore",
    description:
      "Discover relatable stories, interactive grounding activities, and printable worksheets.",
    color: "bg-[#FDFBF2] text-[#7A6B29]",
  },
  {
    icon: Sprout,
    title: "Find support",
    description:
      "Learn about talking to trusted adults, demystifying therapy, and exploring youth resources.",
    color: "bg-[#DFEFE4] text-[#477053]",
  },
  {
    icon: ShieldAlert,
    title: "Need immediate help?",
    description:
      "Fast, direct access to free 24/7 confidential helplines whenever you or a friend feel unsafe.",
    color: "bg-[#FFF5F2] text-[var(--hh-coral)]",
  },
];

interface EchoPageProps {
  searchParams: Promise<{ emotion?: string }>;
}

async function EchoChatIsland({ searchParams }: EchoPageProps) {
  const { emotion: emotionSlug } = await searchParams;
  let emotionTitle: string | undefined = undefined;

  if (emotionSlug) {
    const emotion = await getEmotionBySlug(emotionSlug);
    if (emotion) {
      emotionTitle = emotion.title;
    }
  }

  return (
    <EchoChat
      initialEmotionSlug={emotionSlug}
      initialEmotionTitle={emotionTitle}
    />
  );
}

export default async function EchoPage({ searchParams }: EchoPageProps) {
  return (
    <div className="py-12 sm:py-20">
      <Container>
        {/* Header & Welcome */}
        <div className="max-w-3xl mx-auto mb-10 text-center space-y-4">
          <SectionHeading
            badge="Reflective AI Space"
            title="Talk to Echo"
            description="Hi, I'm Echo. 🌱 I'm here to help you put your feelings into words, explore what's going on, and find something that might help."
            align="center"
            as="h1"
          />
        </div>

        {/* 5-Item "Echo can" Grid (Verbatim from CONTENT_SOURCE) */}
        <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
          <div className="text-center mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--hh-ink-soft)]">
              What Echo Can Help With
            </h2>
          </div>

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5"
            role="list"
            aria-label="Echo capabilities"
          >
            {ECHO_CAPABILITIES.map((cap) => {
              const Icon = cap.icon;
              return (
                <div
                  key={cap.title}
                  role="listitem"
                  className="p-4 rounded-2xl bg-white border border-[var(--hh-line)] shadow-2xs flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-9 h-9 rounded-xl ${cap.color} flex items-center justify-center mb-3`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-sm text-[var(--hh-ink)] mb-1 font-display">
                      {cap.title}
                    </h3>
                    <p className="text-xs text-[var(--hh-ink-soft)] leading-relaxed">
                      {cap.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Echo Chat Island */}
        <Suspense
          fallback={
            <div className="max-w-3xl mx-auto h-[650px] bg-white/60 rounded-[28px] animate-pulse border border-[var(--hh-line)]" />
          }
        >
          <EchoChatIsland searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}
