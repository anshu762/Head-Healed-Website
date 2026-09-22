import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeelingsGrid } from "@/components/feelings/feelings-grid";
import { getAllEmotions } from "@/lib/data/feelings-data";

export const metadata: Metadata = {
  title: "Explore Feelings | Heard & Healed",
  description:
    "Explore core emotions, understand what they feel like, try simple grounding reflections, and find supportive resources.",
  openGraph: {
    title: "Explore Feelings | Heard & Healed",
    description:
      "Explore core emotions, understand what they feel like, try simple grounding reflections, and find supportive resources.",
  },
};

export default async function FeelingsPage() {
  const emotions = await getAllEmotions();

  return (
    <div className="py-12 sm:py-20">
      <Container>
        <div className="max-w-3xl mx-auto mb-12 sm:mb-16">
          <SectionHeading
            badge="Explore Feelings"
            title="What are you feeling right now?"
            description="Emotions can feel tangled, heavy, or hard to name. Explore different feelings, discover simple grounding reflections, and remember you are not alone."
            as="h1"
          />
        </div>

        <FeelingsGrid emotions={emotions} />
      </Container>
    </div>
  );
}
