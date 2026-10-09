"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, LifeBuoy } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEmergency } from "@/components/emergency/emergency-provider";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/feelings", label: "Explore Feelings" },
  { href: "/echo", label: "Talk to Echo" },
  { href: "/stories", label: "Stories + Myths" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const { openEmergency } = useEmergency();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open to prevent background content bleed/scroll
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile drawer on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 transition-all duration-300",
        mobileMenuOpen
          ? "z-50 bg-[#FAF7F2] border-b border-hh-line shadow-sm"
          : cn(
              "z-40",
              isScrolled
                ? "bg-[#FAF7F2]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(59,59,59,0.04)] border-b border-hh-line"
                : "bg-[#FAF7F2]/85 backdrop-blur-xs border-b border-transparent"
            )
      )}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo Mark: Sprout & Heart Emblem */}
        <Link
          href="/"
          onClick={() => setMobileMenuOpen(false)}
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep rounded-full pr-2"
          aria-label="Heard & Healed Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-hh-sage/35 text-hh-sage-deep transition-transform duration-200 group-hover:scale-105 border border-hh-sage/40 shadow-xs">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-hh-sage-deep"
              aria-hidden="true"
            >
              {/* Sprout emerging into heart curves */}
              <path d="M12 22v-9" />
              <path d="M12 13a5 5 0 0 0-5-5c-2.5 0-4 1.8-4 4.5 0 4.5 9 8.5 9 8.5s9-4 9-8.5C21 9.8 19.5 8 17 8a5 5 0 0 0-5 5Z" />
              <path d="M12 13c-1.5-2.5-4-3-6-2" />
              <path d="M12 13c1.5-2.5 4-3 6-2" />
            </svg>
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-hh-ink">
            Heard <span className="text-hh-blue-deep font-normal">&amp;</span> Healed
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-hh-line bg-white/70 p-1.5 shadow-xs backdrop-blur-xs">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep",
                  isActive
                    ? "text-hh-ink font-semibold"
                    : "text-hh-ink-soft hover:text-hh-ink"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-full bg-hh-yellow/45 shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Trigger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-hh-line bg-white text-hh-ink shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Sheet Drawer - Solid Opaque Background to completely prevent bleeding */}
      {mobileMenuOpen && (
        <div className="fixed inset-x-0 top-20 bottom-0 z-50 bg-[#FAF7F2] md:hidden border-t border-hh-line flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200">
          <nav className="flex flex-col gap-2.5 p-5 sm:p-6">
            {NAV_ITEMS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-2xl px-5 py-4 text-base font-semibold transition-all border",
                    isActive
                      ? "bg-hh-yellow/45 border-hh-yellow/80 text-hh-ink shadow-xs font-bold"
                      : "bg-white border-hh-line/70 text-hh-ink hover:bg-white/90 active:scale-[0.99]"
                  )}
                >
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="h-2.5 w-2.5 rounded-full bg-hh-blue-deep" />
                  ) : (
                    <span className="text-xs text-hh-ink-soft">→</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Quick Emergency Support CTA inside mobile drawer */}
          <div className="p-5 sm:p-6 border-t border-hh-line bg-white/50 mt-auto">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                openEmergency();
              }}
              className="flex w-full items-center justify-center gap-2.5 rounded-full bg-hh-coral px-5 py-3.5 text-sm font-bold text-white shadow-[0_4px_20px_rgba(232,131,111,0.35)] active:scale-[0.98] transition-transform"
            >
              <LifeBuoy className="h-4 w-4" aria-hidden="true" />
              <span>Need Immediate Help? Emergency Support</span>
            </button>
            <p className="mt-2.5 text-center text-xs text-hh-ink-soft">
              Free, confidential help available 24/7. Not a replacement for emergency care.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
