import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Mission | Heard & Healed",
  description: "Why Heard & Healed was created and our commitment to youth emotional education.",
};

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          badge="About Heard &amp; Healed"
          title="A space to feel heard, understood, and less alone."
          description="Heard & Healed is a youth-focused platform created to make conversations around emotions and mental health feel approachable, gentle, and non-judgmental."
          as="h1"
        />
      </Container>
    </div>
  );
}
