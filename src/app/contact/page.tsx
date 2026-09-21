import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EMERGENCY_DISCLAIMER } from "@/lib/safety/disclaimers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Heard & Healed",
  description: "Get in touch with the Heard & Healed team with feedback or questions.",
};

export default function ContactPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          badge="Get in Touch"
          title="Contact &amp; Feedback"
          description="Have thoughts, feedback, or need help with a story submission? We'd love to hear from you."
          as="h1"
        />

        <div className="mt-8 rounded-2xl border border-hh-line bg-white p-6 shadow-xs space-y-4">
          <p className="text-sm text-hh-ink leading-relaxed">
            Heard &amp; Healed is an educational platform run with care. For general feedback, suggestions, or takedown requests, please email us directly at:
          </p>
          <div className="p-3 bg-hh-cream rounded-xl text-center font-mono text-sm text-hh-blue-deep font-semibold">
            support@heardandhealed.org
          </div>
          <div className="mt-4 pt-4 border-t border-hh-line">
            <p className="text-xs text-hh-ink-soft leading-relaxed">
              <strong>Emergency Notice:</strong> {EMERGENCY_DISCLAIMER}
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
