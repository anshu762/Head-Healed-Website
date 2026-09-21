"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { MessageSquareHeart, BookHeart, Sparkles, LifeBuoy } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useSafeMotion } from "@/lib/motion";

const FOCUS_AREAS = [
  {
    title: "Talk & Reflect",
    description:
      "A safe, non-judgmental space to talk through your feelings, reflect, and understand what you’re experiencing.",
    icon: MessageSquareHeart,
    chipBg: "bg-hh-blue/20 text-hh-blue-deep",
    borderColor: "hover:border-hh-blue",
    tokenBar: "bg-hh-blue",
  },
  {
    title: "Share & Relate",
    description:
      "Read and anonymously share real experiences, helping young people realise they aren’t alone in what they feel.",
    icon: BookHeart,
    chipBg: "bg-hh-yellow/50 text-hh-ink",
    borderColor: "hover:border-hh-yellow",
    tokenBar: "bg-hh-yellow",
  },
  {
    title: "Understand & Learn",
    description:
      "Explore emotions, therapy, myths, and simple guides that make mental health easier to understand.",
    icon: Sparkles,
    chipBg: "bg-hh-sage/30 text-hh-sage-deep",
    borderColor: "hover:border-hh-sage",
    tokenBar: "bg-hh-sage",
  },
  {
    title: "Find Support",
    description:
      "Connect users with helpful resources, trusted adults, professionals, helplines, and support when they need it.",
    icon: LifeBuoy,
    chipBg: "bg-hh-coral/20 text-hh-coral",
    borderColor: "hover:border-hh-coral",
    tokenBar: "bg-hh-coral",
  },
];

export function FocusAreas() {
  const { fadeUp, stagger } = useSafeMotion();

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="What We Offer"
          title="Four Ways to Explore"
          description="Whether you need to reflect quietly, read relatable stories, or find real-world help, there is a path for you."
          align="center"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 sm:grid-cols-2"
        >
          {FOCUS_AREAS.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={idx}
                variants={fadeUp}
                className={`group relative overflow-hidden rounded-[24px] border border-hh-line bg-white p-7 sm:p-8 shadow-[0_8px_30px_rgba(59,59,59,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(59,59,59,0.1)] ${item.borderColor}`}
              >
                {/* Colored accent top bar */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${item.tokenBar}`}
                  aria-hidden="true"
                />

                <div className="flex items-start gap-4">
                  {/* Tinted icon chip */}
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${item.chipBg} transition-transform duration-300 group-hover:scale-105 shadow-xs`}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold tracking-tight text-hh-ink">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-hh-ink-soft leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </Container>
    </section>
  );
}
