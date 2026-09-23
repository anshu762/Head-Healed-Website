import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { DisclaimerEmergencyButton } from "@/components/emergency/disclaimer-emergency-button";
import { Compass, Home, BookOpen, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Heard & Healed",
  description: "The page you're looking for doesn't exist or has moved.",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 sm:py-24">
      <Container size="narrow">
        <div className="rounded-[28px] border border-hh-line bg-white p-8 sm:p-12 text-center shadow-warm space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-hh-blue/20 text-hh-blue-deep">
            <Compass className="h-8 w-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-hh-blue-deep uppercase tracking-wider">
              404 · Uncharted territory
            </span>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-hh-ink">
              This page seems to have wandered off
            </h1>
            <p className="text-sm text-hh-ink-soft max-w-md mx-auto leading-relaxed">
              We couldn’t find the page you were looking for. Here are a few safe
              places to start instead:
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button variant="primary" asChild>
              <Link href="/">
                <Home className="h-4 w-4 mr-2" />
                Return Home
              </Link>
            </Button>

            <Button variant="secondary" asChild>
              <Link href="/feelings">
                <Compass className="h-4 w-4 mr-2" />
                Explore Feelings
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link href="/stories">
                <BookOpen className="h-4 w-4 mr-2" />
                Read Stories
              </Link>
            </Button>

            <DisclaimerEmergencyButton />
          </div>
        </div>
      </Container>
    </div>
  );
}
