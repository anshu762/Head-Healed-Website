import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/contact/contact-form";
import { DisclaimerEmergencyButton } from "@/components/emergency/disclaimer-emergency-button";
import { Mail, AlertCircle, ShieldAlert } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Feedback | Heard & Healed",
  description:
    "Get in touch with the Heard & Healed team for general questions, feedback, or content takedown requests.",
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container size="narrow">
        <SectionHeading
          badge="Get in Touch"
          title="Contact &amp; Feedback"
          description="Have thoughts, feedback, questions, or need help with a story takedown request? We’d love to hear from you."
          as="h1"
        />

        {/* NON-EMERGENCY NOTICE: Prominent banner warning that inbox is not monitored for emergencies */}
        <div className="mt-8 rounded-[24px] border border-hh-coral/30 bg-hh-coral/10 p-5 sm:p-6 shadow-warm-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-start gap-3">
              <ShieldAlert className="h-5 w-5 text-hh-coral shrink-0 mt-0.5" />
              <div>
                <h2 className="font-display text-sm font-bold text-hh-ink">
                  This inbox is not monitored for emergencies
                </h2>
                <p className="mt-0.5 text-xs text-hh-ink-soft leading-relaxed">
                  If you are in distress, feel unable to keep yourself safe, or
                  need immediate help, please do not wait for an email reply.
                  Connect with free 24/7 emergency support right now.
                </p>
              </div>
            </div>
            <div className="shrink-0 self-start sm:self-center">
              <DisclaimerEmergencyButton />
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-8">
          <ContactForm />
        </div>

        {/* Direct Email fallback */}
        <div className="mt-8 text-center text-xs text-hh-ink-soft">
          <p>
            Prefer direct email? You can also write to us at{" "}
            <a
              href="mailto:support@heardandhealed.org"
              className="font-bold text-hh-blue-deep hover:underline"
            >
              support@heardandhealed.org
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
