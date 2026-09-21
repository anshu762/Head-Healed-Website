import * as React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

export function TrustStrip() {
  return (
    <section id="trust-strip" className="border-y border-hh-line bg-white/50 py-4 sm:py-5">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-sm text-hh-ink-soft">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-hh-sage-deep shrink-0" aria-hidden="true" />
            <span>
              Heard &amp; Healed is an educational platform to help you reflect — not a therapy, medical, or crisis intervention service.
            </span>
          </div>
          <Link
            href="/disclaimer"
            className="inline-flex items-center gap-1 font-semibold text-hh-blue-deep hover:text-hh-ink hover:underline transition-colors shrink-0"
          >
            <span>Read our full disclaimer</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
