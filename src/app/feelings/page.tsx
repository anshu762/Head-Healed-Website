import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Feelings | Heard & Healed",
  description: "Explore 9 core emotions, grounding exercises, and practical reflections.",
};

export default function FeelingsPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="Explore Feelings"
          title="What are you feeling right now?"
          description="Emotions can feel tangled, heavy, or hard to name. Explore different feelings, discover simple grounding reflections, and remember you're not alone."
          as="h1"
        />
      </Container>
    </div>
  );
}
