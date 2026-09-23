"use client";

import { useState, useEffect } from "react";
import { ShieldCheck, Info } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import {
  ECHO_DISCLAIMER,
  ECHO_CAROUSEL_SHORT,
} from "@/lib/safety/disclaimers";

interface EchoDisclaimerGateProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

const EMERGENCY_CAROUSEL_SHORT =
  "If you are in immediate danger or need urgent help, please reach out to emergency services or a trusted adult.";

export function EchoDisclaimerGate({
  onAcknowledge,
  isAcknowledged,
}: EchoDisclaimerGateProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const carouselItems = [ECHO_CAROUSEL_SHORT, EMERGENCY_CAROUSEL_SHORT];

  // 6-second rotation when collapsed into compact strip
  useEffect(() => {
    if (!isAcknowledged || isPaused || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselItems.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAcknowledged, isPaused, shouldReduceMotion, carouselItems.length]);

  if (!isAcknowledged) {
    return (
      <div
        className="rounded-3xl border border-[#DFEFE4] bg-[#F4F9F5] p-6 sm:p-7 shadow-xs space-y-4"
        role="region"
        aria-labelledby="echo-safety-heading"
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#DFEFE4] text-[#477053]">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3
              id="echo-safety-heading"
              className="text-base sm:text-lg font-bold font-display text-[var(--hh-ink)]"
            >
              Before You Start: Important Safety Notice
            </h3>
            <p className="text-base text-[var(--hh-ink)] leading-relaxed mt-2">
              {ECHO_DISCLAIMER}
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={onAcknowledge}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--hh-blue-deep)] text-white text-sm font-semibold hover:bg-[var(--hh-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] focus-visible:ring-offset-2 transition-colors shadow-xs"
          >
            I understand & wish to continue
          </button>
        </div>
      </div>
    );
  }

  // Persistent Compact Cycling Strip Above Composer
  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      tabIndex={0}
      className="flex items-center gap-2.5 py-2 px-4 rounded-full bg-white/80 border border-[var(--hh-line)] text-xs text-[var(--hh-ink-soft)] shadow-2xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--hh-blue)] transition-all"
      aria-label="Safety reminder strip"
    >
      <Info className="w-3.5 h-3.5 text-[var(--hh-blue-deep)] shrink-0" aria-hidden="true" />
      <span className="truncate transition-opacity duration-300">
        {shouldReduceMotion
          ? ECHO_CAROUSEL_SHORT
          : carouselItems[carouselIndex]}
      </span>
    </div>
  );
}
