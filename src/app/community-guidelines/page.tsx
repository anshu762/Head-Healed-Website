import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines | Heard & Healed",
  description:
    "Our safe space principles to keep Heard & Healed compassionate, respectful, and safe for all young people.",
};

const GUIDELINES = [
  {
    icon: "🤍",
    title: "Be respectful",
    description:
      "Everyone’s experiences are different. Respond with kindness, even when you disagree.",
  },
  {
    icon: "🌱",
    title: "Don’t judge",
    description:
      "Avoid comments that shame, mock, dismiss, or invalidate someone’s feelings.",
  },
  {
    icon: "🔒",
    title: "Protect privacy",
    description:
      "Don’t share someone else’s personal information, screenshots, stories, or identifying details without permission.",
  },
  {
    icon: "💬",
    title: "Share responsibly",
    description:
      "Speak from your own experience rather than diagnosing or giving professional advice to others.",
  },
  {
    icon: "🚫",
    title: "No harmful content",
    description:
      "Never post content that encourages self-harm, dangerous behavior, harassment, discrimination, or abuse.",
  },
  {
    icon: "🫶",
    title: "Don’t pressure people",
    description:
      "Nobody has to share more than they’re comfortable with. Respect boundaries and the choice to remain anonymous.",
  },
  {
    icon: "🆘",
    title: "Prioritise safety",
    description:
      "If you or someone else is in immediate distress or danger, do not rely on public stories or AI chat. Connect with a trusted adult, professional, or 24/7 emergency helpline right away.",
  },
];

export default function CommunityGuidelinesPage() {
  return (
    <div className="py-12 sm:py-20">
      <Container size="narrow">
        <SectionHeading
          badge="Our Safe Space Principles"
          title="Community Guidelines"
          description="Help keep Heard &amp; Healed a space where young people feel safe, respected, and heard."
          as="h1"
        />

        <div className="mt-10 grid gap-4">
          {GUIDELINES.map((item, idx) => (
            <div
              key={idx}
              className="rounded-[24px] border border-hh-line bg-white p-6 shadow-warm-sm transition-all duration-300 hover:border-hh-sage/80 hover:shadow-warm"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl select-none shrink-0" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-hh-ink">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm text-hh-ink-soft leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verbatim Closing Quote */}
        <div className="mt-10 rounded-[24px] border border-hh-sage/40 bg-hh-sage/15 p-6 sm:p-7 text-center">
          <p className="text-sm sm:text-base font-semibold text-hh-ink leading-relaxed italic">
            “When in doubt, choose kindness. Heard &amp; Healed works best when
            everyone helps make the space feel a little safer for someone else.”
          </p>
        </div>
      </Container>
    </div>
  );
}
