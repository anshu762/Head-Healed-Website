"use client";

import * as React from "react";
import Link from "next/link";
import { LifeBuoy, Sparkles, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useEmergency } from "@/components/emergency/emergency-provider";

export function ClosingBand() {
  const { openEmergency } = useEmergency();

  return (
    <section className="border-t border-hh-line bg-hh-sage/20 py-20 sm:py-28 relative overflow-hidden">
      <Container size="sm" className="relative z-10 text-center space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-hh-sage/35 border border-hh-sage/50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-hh-sage-deep shadow-xs">
          <Heart className="h-3.5 w-3.5 fill-hh-sage-deep/30" aria-hidden="true" />
          <span>A Safe Place For You</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-hh-ink">
          You don&apos;t have to figure everything out alone.
        </h2>

        <p className="mx-auto max-w-xl text-base sm:text-lg text-hh-ink-soft leading-relaxed">
          Whether you want to reflect quietly, explore an emotion, or reach out to real-world help, there is support whenever you feel ready.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {/* Emergency Support Button (Trigger modal) */}
          <Button
            type="button"
            onClick={openEmergency}
            variant="emergency"
            size="lg"
            className="flex items-center gap-2 font-bold shadow-md"
          >
            <LifeBuoy className="h-5 w-5" aria-hidden="true" />
            <span>Emergency Support</span>
          </Button>

          {/* Explore Feelings CTA */}
          <Button asChild variant="secondary" size="lg">
            <Link href="/feelings" className="flex items-center gap-2 font-bold">
              <Sparkles className="h-4 w-4 text-hh-sage-deep" aria-hidden="true" />
              <span>Explore Feelings</span>
            </Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
