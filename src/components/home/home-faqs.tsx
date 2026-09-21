"use client";

import * as React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import type { HomeFaqItem } from "@/lib/data/home-data";

interface HomeFaqsProps {
  faqs: HomeFaqItem[];
}

export function HomeFaqs({ faqs }: HomeFaqsProps) {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF7F2] border-t border-hh-line">
      <Container size="narrow">
        <SectionHeading
          badge="Common Questions"
          title="Frequently Asked Questions"
          description="Quick, honest answers about Heard &amp; Healed, how our safe space works, and privacy."
          align="center"
        />

        <div className="mt-12 sm:mt-16">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem key={faq.slug} value={faq.slug}>
                <AccordionTrigger>
                  <span>{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <p>{faq.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="secondary" size="lg">
            <Link href="/faqs" className="flex items-center gap-2 font-bold">
              <HelpCircle className="h-4 w-4 text-hh-blue-deep" aria-hidden="true" />
              <span>See all 25 FAQs</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
