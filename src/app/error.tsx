"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { useEmergency } from "@/components/emergency/emergency-provider";
import { AlertCircle, RotateCcw, Home, ShieldAlert } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { openEmergency } = useEmergency();

  React.useEffect(() => {
    console.error("Unhandled platform error:", error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 sm:py-24">
      <Container size="narrow">
        <div className="rounded-[28px] border border-hh-line bg-white p-8 sm:p-12 text-center shadow-warm space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hh-yellow/40 text-amber-700">
            <AlertCircle className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-hh-ink-soft uppercase tracking-wider">
              Something went quietly off track
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-hh-ink">
              We encountered a temporary bump
            </h1>
            <p className="text-sm text-hh-ink-soft max-w-md mx-auto leading-relaxed">
              Don’t worry — your space is safe. You can try refreshing this page,
              head back to our safe home space, or reach out for real-world support.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button variant="primary" onClick={() => reset()}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Try again
            </Button>

            <Button variant="secondary" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </Link>
            </Button>

            <Button
              variant="emergency"
              onClick={openEmergency}
              className="shadow-xs"
            >
              <ShieldAlert className="h-4 w-4 mr-2" />
              Emergency Support
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}
