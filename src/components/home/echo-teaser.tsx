"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquareHeart, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { ECHO_CAROUSEL_SHORT } from "@/lib/safety/disclaimers";

export function EchoTeaser() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="py-20 sm:py-28 bg-white/50 border-t border-hh-line">
      <Container size="sm">
        <SectionHeading
          badge="Reflective AI Space"
          title="Meet Echo"
          description="A calm conversation partner designed to help you untangle confusing feelings and discover supportive tools."
          align="center"
        />

        {/* Mock Chat Window */}
        <div className="mt-12 overflow-hidden rounded-[28px] border border-hh-line bg-white shadow-[0_12px_36px_rgba(59,59,59,0.06)]">
          {/* Chat Window Top Bar */}
          <div className="flex items-center justify-between border-b border-hh-line bg-[#FAF7F2] px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-hh-sage/35 text-hh-sage-deep shadow-xs">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </div>
              <div>
                <span className="font-display font-bold text-hh-ink text-sm">
                  Echo
                </span>
                <span className="block text-[11px] text-hh-sage-deep font-semibold">
                  Reflective AI Assistant
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-hh-sage/20 px-3 py-1 text-[11px] font-semibold text-hh-sage-deep">
              <span className="h-1.5 w-1.5 rounded-full bg-hh-sage-deep animate-pulse" />
              <span>Ready to listen</span>
            </span>
          </div>

          {/* Chat Messages Body */}
          <div className="p-6 sm:p-8 space-y-6 bg-white/80">
            {/* Echo Welcome Message (Verbatim from CONTENT_SOURCE) */}
            <div className="flex items-start gap-3 max-w-lg">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-hh-sage/30 text-hh-sage-deep mt-1 text-xs font-bold">
                🌱
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-hh-cream p-5 text-sm text-hh-ink leading-relaxed border border-hh-line shadow-xs space-y-2">
                <p className="font-semibold text-hh-ink">
                  Hi, I&apos;m Echo. 🌱
                </p>
                <p className="text-hh-ink-soft">
                  I&apos;m here to help you put your feelings into words, explore what&apos;s going on, and find something that might help.
                </p>
              </div>
            </div>

            {/* Typing Dots Animation */}
            <div className="flex items-center gap-2 pl-11">
              <div className="flex items-center gap-1 rounded-full bg-hh-line/50 px-3.5 py-1.5 shadow-xs">
                <motion.span
                  animate={shouldReduce ? {} : { opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0 }}
                  className="h-1.5 w-1.5 rounded-full bg-hh-ink-soft"
                />
                <motion.span
                  animate={shouldReduce ? {} : { opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.2 }}
                  className="h-1.5 w-1.5 rounded-full bg-hh-ink-soft"
                />
                <motion.span
                  animate={shouldReduce ? {} : { opacity: [0.3, 1, 0.3] }}
                  transition={{ repeat: Infinity, duration: 1.2, delay: 0.4 }}
                  className="h-1.5 w-1.5 rounded-full bg-hh-ink-soft"
                />
              </div>
              <span className="text-xs text-hh-ink-soft italic">Echo is listening gently</span>
            </div>

            {/* Non-negotiable visible at rest safety disclaimer */}
            <div className="rounded-2xl border border-hh-line bg-hh-cream/70 p-4">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="h-4 w-4 text-hh-ink-soft shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-hh-ink-soft font-medium leading-relaxed">
                  {ECHO_CAROUSEL_SHORT}
                </p>
              </div>
            </div>
          </div>

          {/* Chat Footer with CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-hh-line bg-[#FAF7F2] p-5 sm:px-8">
            <p className="text-xs text-hh-ink-soft text-center sm:text-left">
              Conversations with Echo are private and non-clinical.
            </p>
            <Button asChild variant="primary" size="default" className="w-full sm:w-auto">
              <Link href="/echo" className="flex items-center gap-2 font-bold">
                <MessageSquareHeart className="h-4 w-4" aria-hidden="true" />
                <span>Talk to Echo</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
