import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stories & Myths | Heard & Healed",
  description: "Anonymous youth stories and evidence-based facts debunking therapy myths.",
};

export default function StoriesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="Community &amp; Perspectives"
          title="Stories &amp; Therapy Myths"
          description="Read real experiences from other young people, discover that you aren't the only one feeling this way, and bust common myths about getting help."
          as="h1"
        />
      </Container>
    </div>
  );
}
