import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { TrustStrip } from "@/components/home/trust-strip";
import { FocusAreas } from "@/components/home/focus-areas";
import { HowItWorks } from "@/components/home/how-it-works";
import { EmotionPreview } from "@/components/home/emotion-preview";
import { StoryPreview } from "@/components/home/story-preview";
import { EchoTeaser } from "@/components/home/echo-teaser";
import { HomeFaqs } from "@/components/home/home-faqs";
import { ClosingBand } from "@/components/home/closing-band";
import {
  getHomeEmotions,
  getHomeStories,
  getHomeFaqs,
} from "@/lib/data/home-data";

export const metadata: Metadata = {
  title: "Heard & Healed | Youth Emotional Wellbeing & Safe Space",
  description:
    "A gentle, safe space to understand what you're feeling, explore emotions, reflect with Echo AI, and discover supportive mental health resources.",
};

export default async function HomePage() {
  const [emotions, stories, faqs] = await Promise.all([
    getHomeEmotions(),
    getHomeStories(),
    getHomeFaqs(),
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section with staggered H1 and dynamic hand-drawn scene */}
      <HeroSection />

      {/* 2. Trust Strip stating what this is and is not */}
      <TrustStrip />

      {/* 3. Four Focus Areas (2x2 grid) */}
      <FocusAreas />

      {/* 4. How It Works (3 calm steps with animated connector) */}
      <HowItWorks />

      {/* 5. Emotion Preview (6 emotions with icons) */}
      <EmotionPreview emotions={emotions} />

      {/* 6. Story Preview (3 approved teen stories) */}
      <StoryPreview stories={stories} />

      {/* 7. Echo Teaser (Mock chat simulation + visible disclaimer) */}
      <EchoTeaser />

      {/* 8. FAQ Accordion (6 curated questions) */}
      <HomeFaqs faqs={faqs} />

      {/* 9. Closing Sage Reassurance Band */}
      <ClosingBand />
    </div>
  );
}
