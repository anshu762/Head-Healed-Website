import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SUBMISSION_PRIVACY_NOTICE } from "@/lib/safety/disclaimers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Heard & Healed",
  description: "Our privacy policy and safety protections for young people.",
};

export default function PrivacyPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="narrow">
        <SectionHeading
          badge="Your Privacy Matters"
          title="Privacy &amp; Safety Policy"
          description="Heard & Healed is designed to be a safe space to explore emotions, learn about mental health, and reflect."
          as="h1"
        />

        <div className="mt-8 space-y-6 text-hh-ink leading-relaxed">
          <div className="rounded-2xl border border-hh-line bg-white p-5 shadow-xs">
            <h3 className="font-display text-base font-bold text-hh-ink mb-2">
              Submission Privacy Reminder
            </h3>
            <p className="text-sm text-hh-ink-soft leading-relaxed">
              {SUBMISSION_PRIVACY_NOTICE}
            </p>
          </div>

          <p>
            We do not ask you to share personal information unless it is genuinely needed. If you choose to share a story or response, only share what you are comfortable making available. Anonymous spaces should never be used to share identifying details about yourself or someone else.
          </p>
        </div>
      </Container>
    </div>
  );
}
