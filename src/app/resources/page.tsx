import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resource Library | Heard & Healed",
  description: "Evidence-based guides, grounding worksheets, and youth mental health organisations.",
};

export default function ResourcesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container>
        <SectionHeading
          badge="Support &amp; Learning"
          title="Helpful Resources"
          description="Curated worksheets, educational guides, and reputable youth support organisations to explore at your own pace."
          as="h1"
        />
      </Container>
    </div>
  );
}
