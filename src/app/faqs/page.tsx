import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqClientList } from "@/components/faqs/faq-client-list";
import { getAllFaqs } from "@/lib/data/faq-data";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Heard & Healed",
  description:
    "Explore 25 honest questions and answers about emotions, therapy misconceptions, community stories, and privacy.",
};

export default async function FaqsPage() {
  const faqs = await getAllFaqs();

  return (
    <div className="py-12 sm:py-20 bg-[#FAF7F2]">
      <Container>
        <SectionHeading
          badge="Answers &amp; Clarity"
          title="Frequently Asked Questions"
          description="Honest answers to 25 common questions about Heard &amp; Healed, how therapy works, sharing stories, and privacy."
          align="center"
          as="h1"
        />

        <FaqClientList initialFaqs={faqs} />
      </Container>
    </div>
  );
}
