"use client";

import * as React from "react";
import Link from "next/link";
import { Heart, LifeBuoy, ArrowUpRight } from "lucide-react";
import { GLOBAL_DISCLAIMER } from "@/lib/safety/disclaimers";
import { useEmergency } from "@/components/emergency/emergency-provider";

export function Footer() {
  const { openEmergency } = useEmergency();

  return (
    <footer className="mt-auto border-t border-hh-line bg-white/60 pt-16 pb-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-12 lg:gap-12">
          {/* Column 1: Brand & Prominent Global Disclaimer Card (Col 1-6) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-hh-sage/35 text-hh-sage-deep">
                <Heart className="h-4 w-4" aria-hidden="true" />
              </div>
              <span className="font-display text-lg font-bold tracking-tight text-hh-ink">
                Heard &amp; Healed
              </span>
            </div>

            {/* Non-negotiable GLOBAL_DISCLAIMER rendered inside a prominent bordered card at 15px text */}
            <div className="rounded-2xl border border-hh-line bg-hh-cream/70 p-5 shadow-xs">
              <div className="text-[12px] font-bold uppercase tracking-wider text-hh-ink-soft/80 mb-1.5 flex items-center gap-1.5">
                <span>Important Safety Disclaimer</span>
              </div>
              <p className="text-[15px] leading-relaxed text-hh-ink-soft">
                {GLOBAL_DISCLAIMER}
              </p>
            </div>
          </div>

          {/* Column 2: Explore (Col 7-8) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-hh-ink">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/feelings"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Explore Feelings
                </Link>
              </li>
              <li>
                <Link
                  href="/echo"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Talk to Echo AI
                </Link>
              </li>
              <li>
                <Link
                  href="/stories"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Stories &amp; Myths
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Resource Library
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support (Col 9-10) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-hh-ink">
              Support
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  onClick={openEmergency}
                  className="group flex items-center gap-1.5 font-bold text-hh-coral hover:brightness-95 transition-all text-left"
                >
                  <LifeBuoy className="h-4 w-4" aria-hidden="true" />
                  <span>Emergency Support</span>
                </button>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Common FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/community-guidelines"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Community Guidelines
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & About (Col 11-12) */}
          <div className="md:col-span-2 space-y-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-hh-ink">
              Platform
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Full Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-hh-ink-soft hover:text-hh-ink hover:underline transition-colors"
                >
                  Contact &amp; Feedback
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between border-t border-hh-line pt-6 text-xs text-hh-ink-soft gap-4">
          <p>© {new Date().getFullYear()} Heard &amp; Healed. An educational mental health platform for youth.</p>
          <p className="flex items-center gap-1 text-center">
            Designed for calm reflection and safe emotional learning.
          </p>
        </div>
      </div>
    </footer>
  );
}
