import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Heard & Healed",
  description: "Answers to 25 common questions about Heard & Healed, therapy, emotions, and safety.",
};

export default function FaqsPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="Got Questions?"
          title="Frequently Asked Questions"
          description="Everything you need to know about Heard & Healed, exploring emotions, therapy misconceptions, and safety."
          as="h1"
        />
      </Container>
    </div>
  );
}
