"use client";

import * as React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowDown, MessageSquareHeart, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { defaultTransition } from "@/lib/motion";

// Dynamically import the animated hero visual so it doesn't block the critical LCP path
const HeroVisual = dynamic(() => import("./hero-visual"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-[480px] aspect-[540/460] rounded-3xl bg-hh-line/20 animate-pulse" />
  ),
});

const H1_WORDS = ["You", "deserve", "to", "feel", "heard."];

export function HeroSection() {
  const shouldReduce = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0 : 0.06,
        delayChildren: 0.05,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: defaultTransition,
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: defaultTransition,
    },
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-center pt-8 pb-16 lg:py-24 overflow-hidden">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Typography & CTAs (Col 1-7) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
          >
            {/* Kicker / Eyebrow */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 rounded-full bg-hh-yellow/45 border border-hh-yellow/60 px-4 py-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-hh-ink shadow-xs">
                <Sparkles className="h-3.5 w-3.5 text-hh-ink" aria-hidden="true" />
                <span>Understand. Reflect. Feel less alone.</span>
              </span>
            </motion.div>

            {/* H1 with Staggered Word Reveal */}
            <h1 className="font-display font-extrabold tracking-tight text-hh-ink leading-[1.12]">
              {H1_WORDS.map((word, idx) => (
                <motion.span
                  key={idx}
                  variants={wordVariants}
                  className="inline-block mr-[0.25em] last:mr-0"
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            {/* Sub-paragraph (Verbatim from CONTENT_SOURCE) */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-hh-ink-soft leading-relaxed max-w-xl"
            >
              Heard &amp; Healed is a safe, youth-friendly space to understand what you’re feeling, explore mental health, understand therapy, and find supportive resources — without judgment, pressure, or complicated language.
            </motion.p>

            {/* Emphasis Line (Verbatim from CONTENT_SOURCE) */}
            <motion.div
              variants={itemVariants}
              className="rounded-2xl border-l-4 border-hh-blue-deep bg-hh-blue/15 px-4 py-3"
            >
              <p className="text-sm sm:text-base font-semibold text-hh-ink">
                Discover stories that remind you: you’re not alone.
              </p>
            </motion.div>

            {/* Three CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-3 pt-2 w-full sm:w-auto"
            >
              {/* Primary CTA -> /echo */}
              <Button asChild variant="primary" size="lg" className="w-full sm:w-auto">
                <Link href="/echo" className="flex items-center gap-2">
                  <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
                  <span>Talk to Echo</span>
                </Link>
              </Button>

              {/* Secondary CTA -> /feelings */}
              <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
                <Link href="/feelings" className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-hh-sage-deep" aria-hidden="true" />
                  <span>Explore Feelings</span>
                </Link>
              </Button>

              {/* Ghost CTA -> /stories */}
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                <Link href="/stories" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-hh-ink-soft" aria-hidden="true" />
                  <span>Read Stories</span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Column: Visual Scene & Illustration (Col 8-12) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <HeroVisual />
          </div>
        </div>

        {/* Below the Fold Animated Scroll Hint */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-14 sm:mt-20 flex flex-col items-center justify-center text-center select-none"
        >
          <a
            href="#trust-strip"
            className="group flex flex-col items-center gap-1 text-xs font-semibold uppercase tracking-wider text-hh-ink-soft/70 hover:text-hh-ink transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep rounded-full p-2"
            aria-label="Scroll down to explore Heard & Healed"
          >
            <span>Scroll to explore</span>
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            >
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </motion.div>
          </a>
        </motion.div>
      </Container>
    </section>
  );
}
