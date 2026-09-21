import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { GLOBAL_DISCLAIMER, EMERGENCY_DISCLAIMER } from "@/lib/safety/disclaimers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Heard & Healed",
  description: "Educational platform boundaries, medical disclaimers, and crisis guidelines.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          badge="Platform Boundaries"
          title="Educational Disclaimer"
          description="Heard & Healed is a starting point — not a replacement for professional care or emergency services."
          as="h1"
        />

        <div className="mt-8 space-y-6 text-hh-ink leading-relaxed">
          <div className="rounded-2xl border border-hh-line bg-white p-6 shadow-xs">
            <h3 className="font-display text-base font-bold text-hh-ink mb-2">
              General Educational Disclaimer
            </h3>
            <p className="text-[15px] text-hh-ink leading-relaxed">
              {GLOBAL_DISCLAIMER}
            </p>
          </div>

          <div className="rounded-2xl border border-hh-coral/30 bg-hh-coral/10 p-6 shadow-xs">
            <h3 className="font-display text-base font-bold text-hh-ink mb-2">
              Emergency &amp; Crisis Notice
            </h3>
            <p className="text-[15px] text-hh-ink leading-relaxed">
              {EMERGENCY_DISCLAIMER}
            </p>
          </div>

          <div className="space-y-4 pt-4 text-hh-ink-soft text-sm leading-relaxed">
            <p>
              The information on this website is intended for education, reflection, and support. It is not medical or psychological advice and should not be used to diagnose yourself or someone else.
            </p>
            <p>
              Our reflections and activities can help you put words to what you feel, but they cannot tell you what is happening medically or prescribe treatment. If you are struggling, we warmly encourage you to reach out to a trusted adult, doctor, or mental health professional.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
