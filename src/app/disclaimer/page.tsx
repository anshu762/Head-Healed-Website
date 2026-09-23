import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  GLOBAL_DISCLAIMER,
  EMERGENCY_DISCLAIMER,
  ECHO_DISCLAIMER,
} from "@/lib/safety/disclaimers";
import { DisclaimerEmergencyButton } from "@/components/emergency/disclaimer-emergency-button";
import { ShieldAlert, BookOpen, Bot, HeartHandshake } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer & Boundaries | Heard & Healed",
  description:
    "Educational platform boundaries, medical disclaimers, and emergency crisis safety guidelines.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container size="narrow">
        <SectionHeading
          badge="Platform Boundaries"
          title="Educational Disclaimer"
          description="Heard & Healed is a supportive starting point — not a replacement for professional care, medical diagnosis, or emergency intervention."
          as="h1"
        />

        <div className="mt-10 space-y-8 text-hh-ink leading-relaxed">
          {/* 1. Global Platform Disclaimer */}
          <div className="rounded-[28px] border border-hh-line bg-white p-7 sm:p-9 shadow-warm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-hh-blue-deep uppercase tracking-wider">
              <BookOpen className="h-4 w-4" />
              <span>Platform Educational Purpose</span>
            </div>
            <h2 className="font-display text-xl font-bold text-hh-ink">
              General Disclaimer
            </h2>
            <p className="text-[16px] text-hh-ink font-medium leading-relaxed">
              {GLOBAL_DISCLAIMER}
            </p>
          </div>

          {/* 2. Non-Negotiable Verbatim Emergency Disclaimer */}
          <div className="rounded-[28px] border border-hh-coral/40 bg-hh-coral/10 p-7 sm:p-9 shadow-warm space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-hh-coral uppercase tracking-wider">
              <ShieldAlert className="h-4 w-4" />
              <span>Immediate Safety Notice</span>
            </div>
            <h2 className="font-display text-xl font-bold text-hh-ink">
              Emergency &amp; Crisis Notice
            </h2>
            <p className="text-[16px] text-hh-ink font-medium leading-relaxed">
              {EMERGENCY_DISCLAIMER}
            </p>
            <div className="pt-2">
              <DisclaimerEmergencyButton />
            </div>
          </div>

          {/* 3. Echo AI Disclaimer */}
          <div className="rounded-[28px] border border-hh-line bg-white p-7 sm:p-9 shadow-warm space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-hh-sage-deep uppercase tracking-wider">
              <Bot className="h-4 w-4" />
              <span>Artificial Intelligence Limitations</span>
            </div>
            <h2 className="font-display text-xl font-bold text-hh-ink">
              Echo AI Assistant Disclaimer
            </h2>
            <p className="text-[16px] text-hh-ink font-medium leading-relaxed">
              {ECHO_DISCLAIMER}
            </p>
          </div>

          {/* 4. Platform Boundaries & Professional Support Guidance */}
          <div className="rounded-[28px] border border-hh-line bg-white p-7 sm:p-9 shadow-warm space-y-4 text-sm sm:text-base">
            <div className="flex items-center gap-2 text-xs font-bold text-hh-ink-soft uppercase tracking-wider">
              <HeartHandshake className="h-4 w-4" />
              <span>Professional Care</span>
            </div>
            <h2 className="font-display text-xl font-bold text-hh-ink">
              When to Seek Professional Support
            </h2>
            <p>
              The reflections, activities, and educational explanations on Heard
              &amp; Healed are designed to help you notice and explore emotions.
              They are not psychological advice and cannot evaluate or diagnose any
              condition.
            </p>
            <p>
              If your feelings feel unmanageable, persistent, or are interfering
              with your daily life, school, or relationships, we warmly encourage
              you to speak with a trusted adult, family doctor, school counsellor,
              or qualified mental health professional.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
