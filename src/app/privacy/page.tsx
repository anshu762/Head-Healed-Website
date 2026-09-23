import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SUBMISSION_PRIVACY_NOTICE } from "@/lib/safety/disclaimers";
import { Shield, Lock, Trash2, Mail, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Data Policy | Heard & Healed",
  description:
    "Our privacy commitments for young people, what information is stored, and how your privacy is protected.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container size="narrow">
        <SectionHeading
          badge="Your Privacy Matters"
          title="Privacy &amp; Safety Policy"
          description="Heard &amp; Healed is designed to be a safe, private space to explore emotions, learn about mental health, and reflect without fear."
          as="h1"
        />

        <div className="mt-10 space-y-8 text-hh-ink leading-relaxed">
          {/* A REMINDER: Highlighted Notice Card */}
          <div className="rounded-[24px] border border-hh-blue/30 bg-hh-blue/10 p-6 shadow-warm-sm">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-hh-blue-deep shadow-xs">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-1">
                <h2 className="font-display text-base font-bold text-hh-ink">
                  A reminder:
                </h2>
                <p className="text-sm text-hh-ink-soft leading-relaxed font-medium">
                  {SUBMISSION_PRIVACY_NOTICE}
                </p>
              </div>
            </div>
          </div>

          {/* Core Privacy Overview */}
          <div className="rounded-[28px] border border-hh-line bg-white p-7 sm:p-9 shadow-warm space-y-5 text-sm sm:text-base">
            <h2 className="font-display text-xl font-bold text-hh-ink">
              Our Privacy Commitment
            </h2>
            <p>
              We take privacy seriously. We do not ask you to share personal
              identifying information unless it is genuinely needed (such as an
              email address if you voluntarily contact us). If you choose to share
              a story or submit feedback, only share what you are comfortable
              making available.
            </p>
            <p>
              Anonymous spaces should never be used to share identifying details
              about yourself or someone else. We actively moderate all submissions
              to ensure privacy is upheld.
            </p>
          </div>

          {/* Plain Language Data Storage Breakdown */}
          <div className="rounded-[28px] border border-hh-line bg-white p-7 sm:p-9 shadow-warm space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-hh-sage-deep uppercase tracking-wider">
              <Shield className="h-4 w-4" />
              <span>Transparency</span>
            </div>
            <h2 className="font-display text-xl font-bold text-hh-ink">
              What Heard &amp; Healed Actually Stores
            </h2>
            <div className="grid gap-4 text-sm">
              <div className="rounded-2xl border border-hh-line/80 bg-hh-cream/50 p-4">
                <h3 className="font-bold text-hh-ink mb-1">
                  1. Anonymous Chat Session ID
                </h3>
                <p className="text-hh-ink-soft leading-relaxed">
                  We generate a random, anonymous session ID stored in a secure{" "}
                  <code>httpOnly</code> cookie (<code>hh_session_id</code>). We do
                  NOT store your IP address, name, or account credentials in
                  connection with this session.
                </p>
              </div>

              <div className="rounded-2xl border border-hh-line/80 bg-hh-cream/50 p-4">
                <h3 className="font-bold text-hh-ink mb-1">
                  2. Chat Conversation Messages
                </h3>
                <p className="text-hh-ink-soft leading-relaxed">
                  Messages exchanged with Echo are stored anonymously tied only to
                  your random session ID so your current conversation thread stays
                  intact while you browse. You can clear your entire thread at any
                  time using the “Clear conversation” button.
                </p>
              </div>

              <div className="rounded-2xl border border-hh-line/80 bg-hh-cream/50 p-4">
                <h3 className="font-bold text-hh-ink mb-1">
                  3. Submitted Stories
                </h3>
                <p className="text-hh-ink-soft leading-relaxed">
                  When you submit a story, we store the title, body, selected
                  emotion, and chosen display name (default “Anonymous”). Every
                  story remains in a private <code>PENDING</code> or{" "}
                  <code>FLAGGED</code> state and is NEVER shown publicly until
                  moderated and approved.
                </p>
              </div>

              <div className="rounded-2xl border border-hh-line/80 bg-hh-cream/50 p-4">
                <h3 className="font-bold text-hh-ink mb-1">
                  4. Contact Messages
                </h3>
                <p className="text-hh-ink-soft leading-relaxed">
                  If you contact us via the contact form, we store your email
                  address, subject, and message solely to respond to your inquiry
                  or feedback.
                </p>
              </div>
            </div>
          </div>

          {/* How to Request Removal */}
          <div className="rounded-[28px] border border-hh-line bg-white p-7 sm:p-9 shadow-warm space-y-4 text-sm sm:text-base">
            <div className="flex items-center gap-2 text-xs font-bold text-hh-coral uppercase tracking-wider">
              <Trash2 className="h-4 w-4" />
              <span>Your Rights</span>
            </div>
            <h2 className="font-display text-xl font-bold text-hh-ink">
              How to Request Removal or Deletion
            </h2>
            <p className="leading-relaxed">
              If you have submitted a story, reflection, or message and want it
              removed from our database, you can contact us at any time. Simply send
              a message via our{" "}
              <Link href="/contact" className="font-bold text-hh-blue-deep underline">
                Contact Page
              </Link>{" "}
              or email us directly at{" "}
              <a
                href="mailto:support@heardandhealed.org"
                className="font-bold text-hh-blue-deep underline"
              >
                support@heardandhealed.org
              </a>
              . We will promptly delete your submission.
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
