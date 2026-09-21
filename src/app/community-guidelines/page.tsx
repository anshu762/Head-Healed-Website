import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Guidelines | Heard & Healed",
  description: "Guidelines to keep Heard & Healed a safe, compassionate, and supportive community for all youth.",
};

const GUIDELINES = [
  {
    icon: "🤍",
    title: "Be respectful",
    description: "Everyone's experiences are different. Respond with kindness, even when you disagree.",
  },
  {
    icon: "🌱",
    title: "Don't judge",
    description: "Avoid comments that shame, mock, dismiss, or invalidate someone's feelings.",
  },
  {
    icon: "🔒",
    title: "Protect privacy",
    description: "Don't share someone else's personal information, screenshots, stories, or identifying details without permission.",
  },
  {
    icon: "💬",
    title: "Share responsibly",
    description: "Speak from your own experience rather than diagnosing or giving professional advice to others.",
  },
  {
    icon: "🚫",
    title: "No harmful content",
    description: "Never post content that encourages self-harm, dangerous behavior, harassment, discrimination, or abuse.",
  },
  {
    icon: "🫶",
    title: "Don't pressure people",
    description: "Nobody has to share more than they're comfortable with. Respect boundaries and the choice to remain anonymous.",
  },
];

export default function CommunityGuidelinesPage() {
  return (
    <div className="py-16 sm:py-24">
      <Container size="sm">
        <SectionHeading
          badge="Our Safe Space Principles"
          title="Community Guidelines"
          description="Help keep Heard & Healed a space where people feel safe, respected, and heard."
          as="h1"
        />

        <div className="mt-10 grid gap-4">
          {GUIDELINES.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-hh-line bg-white p-5 shadow-xs transition-colors hover:border-hh-sage"
            >
              <div className="flex items-start gap-3.5">
                <span className="text-2xl select-none" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-bold text-hh-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-hh-ink-soft leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm font-semibold text-hh-ink-soft italic">
            “When in doubt, choose kindness. Heard & Healed works best when everyone helps make the space feel a little safer for someone else.”
          </p>
        </div>
      </Container>
    </div>
  );
}
