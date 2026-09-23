import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Shield,
  HelpCircle,
  Mail,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Our Mission | Heard & Healed",
  description:
    "Heard & Healed is a youth-focused platform dedicated to making emotional wellbeing approachable, educational, and safe.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-20 space-y-16 sm:space-y-24">
      {/* 1. Hero Mission Section */}
      <section>
        <Container size="narrow">
          <SectionHeading
            badge="About Heard &amp; Healed"
            title="A space to feel heard, understood, and less alone."
            description="Heard & Healed is a youth-focused space to explore emotions, understand mental health, and feel a little less alone."
            as="h1"
          />

          <div className="mt-8 rounded-[28px] border border-hh-line bg-white p-7 sm:p-10 shadow-warm space-y-5 text-[17px] text-hh-ink leading-relaxed">
            <p>
              Growing up comes with intense pressure — academic expectations,
              shifting friendships, family dynamics, and confusing changes in how
              we feel. Often, the hardest part isn’t the feeling itself, but the
              sense that you’re the only one experiencing it.
            </p>
            <p>
              Heard &amp; Healed was created because understanding what you feel
              shouldn’t feel confusing, embarrassing, or lonely. We provide a
              calm, supportive starting point to reflect on emotions, learn
              grounding techniques, and find trustworthy resources.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Why This Matters (Three Stats) */}
      <section className="bg-hh-cream/70 py-6">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-hh-blue/15 px-3.5 py-1 text-xs font-bold text-hh-blue-deep uppercase tracking-wider mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              Evidence &amp; Context
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-hh-ink">
              Why This Matters
            </h2>
            <p className="mt-2 text-sm text-hh-ink-soft">
              Understanding youth mental health starts with acknowledging real facts and unlearning silence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stat 1 */}
            <div className="flex flex-col justify-between rounded-[24px] border border-hh-line bg-white p-7 shadow-warm-sm transition-all duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display text-4xl sm:text-5xl font-bold text-hh-blue-deep">
                  1 in 7
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-hh-ink">
                  Adolescents Globally
                </h3>
                <p className="mt-2 text-sm text-hh-ink-soft leading-relaxed">
                  According to the World Health Organization, 1 in 7 young people
                  aged 10–19 experiences a mental health challenge, yet many feel
                  unable to speak about it.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hh-line/60">
                <a
                  href="https://www.who.int/news-room/fact-sheets/detail/adolescent-mental-health"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-hh-blue-deep hover:underline"
                >
                  WHO Adolescent Health Report{" "}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col justify-between rounded-[24px] border border-hh-line bg-white p-7 shadow-warm-sm transition-all duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display text-4xl sm:text-5xl font-bold text-hh-sage-deep">
                  Most
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-hh-ink">
                  Go Unrecognised
                </h3>
                <p className="mt-2 text-sm text-hh-ink-soft leading-relaxed">
                  The vast majority of emotional struggles in adolescents remain
                  unrecognised and untreated due to stigma, fear of being judged,
                  and lack of approachable resources.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hh-line/60">
                <a
                  href="https://www.unicef.org/parenting/mental-health/adolescents"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-hh-blue-deep hover:underline"
                >
                  UNICEF Adolescent Report{" "}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col justify-between rounded-[24px] border border-hh-line bg-white p-7 shadow-warm-sm transition-all duration-300 hover:-translate-y-1">
              <div>
                <span className="font-display text-4xl sm:text-5xl font-bold text-amber-700">
                  Early
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-hh-ink">
                  Support Matters
                </h3>
                <p className="mt-2 text-sm text-hh-ink-soft leading-relaxed">
                  Learning to identify emotions, put feelings into words, and reach
                  out for real-world support early builds resilience that lasts a
                  lifetime.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-hh-line/60">
                <a
                  href="https://www.apa.org/topics/psychotherapy"
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-hh-blue-deep hover:underline"
                >
                  APA Psychotherapy Research{" "}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Built With Care (Design & Safety Principles) */}
      <section>
        <Container size="narrow">
          <div className="rounded-[28px] border border-hh-line bg-white p-8 sm:p-10 shadow-warm space-y-6">
            <div className="flex items-center gap-2 text-xs font-bold text-hh-sage-deep uppercase tracking-wider">
              <Shield className="h-4 w-4" />
              <span>Our Principles</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-hh-ink">
              Built With Care &amp; Responsibility
            </h2>
            <div className="space-y-4 text-sm text-hh-ink leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-hh-sage-deep shrink-0 mt-0.5" />
                <p>
                  <strong>Youth-Centered &amp; Non-Clinical:</strong> We speak
                  directly to young people using gentle, friendly language. No
                  cold clinical jargon, no scary labels.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-hh-sage-deep shrink-0 mt-0.5" />
                <p>
                  <strong>Strict Educational Boundaries:</strong> Heard &amp;
                  Healed does not diagnose, prescribe, or replace professional
                  therapy. We help you reflect and direct you to qualified care.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-hh-sage-deep shrink-0 mt-0.5" />
                <p>
                  <strong>Privacy First:</strong> Anonymous chat sessions and
                  moderated submissions ensure you can explore without fear of
                  exposure or surveillance.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 4. Have Questions? Cross-link to FAQs & Contact */}
      <section>
        <Container size="narrow">
          <div className="rounded-[28px] border border-hh-blue/30 bg-hh-blue/10 p-8 sm:p-10 text-center space-y-4">
            <h2 className="font-display text-2xl font-bold text-hh-ink">
              Still Have Questions?
            </h2>
            <p className="text-sm text-hh-ink-soft max-w-md mx-auto leading-relaxed">
              Check our 25 curated questions in the FAQs or send a message directly
              to our team.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Button variant="primary" asChild>
                <Link href="/faqs">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Explore FAQs
                </Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Get in Touch
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
