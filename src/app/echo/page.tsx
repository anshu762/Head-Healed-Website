import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ECHO_DISCLAIMER } from "@/lib/safety/disclaimers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talk to Echo | Heard & Healed",
  description: "A calm, reflective space to put feelings into words with Echo AI.",
};

export default function EchoPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="sm">
        <SectionHeading
          badge="Reflective AI Companion"
          title="Talk to Echo"
          description="A warm, non-judgmental space to reflect, untangle tricky emotions, and explore supportive tools."
          as="h1"
        />

        {/* Prominent safety disclaimer card visible before interaction */}
        <div className="mt-8 rounded-2xl border border-hh-line bg-white p-5 shadow-xs">
          <p className="text-xs font-bold uppercase tracking-wider text-hh-ink-soft mb-1">
            Important Notice
          </p>
          <p className="text-sm text-hh-ink leading-relaxed">
            {ECHO_DISCLAIMER}
          </p>
        </div>
      </Container>
    </div>
  );
}
