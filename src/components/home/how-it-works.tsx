"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Heart, Compass, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { useSafeMotion } from "@/lib/motion";

const STEPS = [
  {
    step: "01",
    title: "Notice what you're feeling",
    description: "Take a breath and name what you are carrying today without judgment.",
    icon: Heart,
    color: "text-hh-blue-deep bg-hh-blue/20",
  },
  {
    step: "02",
    title: "Explore it gently",
    description: "Read grounding reflections, relatable teen stories, and simple explanations.",
    icon: Compass,
    color: "text-hh-sage-deep bg-hh-sage/25",
  },
  {
    step: "03",
    title: "Find what helps",
    description: "Reflect with Echo or reach out to real-world support whenever you need.",
    icon: Sparkles,
    color: "text-hh-ink bg-hh-yellow/45",
  },
];

export function HowItWorks() {
  const shouldReduce = useReducedMotion();
  const { fadeUp, stagger } = useSafeMotion();

  return (
    <section className="relative overflow-hidden border-t border-hh-line bg-[#FAF7F2] py-20 sm:py-28">
      <Container>
        <SectionHeading
          badge="Simple &amp; Safe"
          title="How Heard &amp; Healed Works"
          description="Take things one small step at a time. There are no quizzes, scores, or right answers here."
          align="center"
        />

        <div className="relative mt-16 sm:mt-20">
          {/* Animated Connecting Line on Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] -translate-y-8 z-0 pointer-events-none">
            <svg className="w-full h-4 overflow-visible" fill="none">
              <motion.line
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke="#A8C8B0"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                initial={{ pathLength: shouldReduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            </svg>
          </div>

          {/* 3 Step Cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-8 lg:grid-cols-3 relative z-10"
          >
            {STEPS.map((item, idx) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex flex-col items-center text-center rounded-[24px] border border-hh-line bg-white p-8 shadow-[0_8px_30px_rgba(59,59,59,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Number Badge Pill */}
                  <span className="inline-flex items-center justify-center rounded-full bg-hh-cream px-3 py-1 text-xs font-bold font-mono text-hh-ink-soft border border-hh-line mb-4">
                    Step {item.step}
                  </span>

                  {/* Icon Circle */}
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${item.color} mb-5 shadow-xs`}
                  >
                    <Icon className="h-7 w-7" aria-hidden="true" />
                  </div>

                  <h3 className="font-display text-xl font-bold tracking-tight text-hh-ink mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-hh-ink-soft leading-relaxed max-w-xs">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
