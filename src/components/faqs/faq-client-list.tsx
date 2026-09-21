"use client";

import * as React from "react";
import { Search, X, HelpCircle, LifeBuoy } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useEmergency } from "@/components/emergency/emergency-provider";
import type { FaqItem } from "@/lib/data/faq-data";

interface FaqClientListProps {
  initialFaqs: FaqItem[];
}

const CATEGORIES = [
  { id: "about", title: "🌱 About Heard & Healed" },
  { id: "feelings", title: "💭 What Are You Feeling?" },
  { id: "therapy", title: "🧠 Decode Therapy" },
  { id: "stories", title: "🫂 Stories, Identity & Belonging" },
  { id: "privacy", title: "🔒 Privacy & Safety" },
];

export function FaqClientList({ initialFaqs }: FaqClientListProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("about");
  const { openEmergency } = useEmergency();
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Group FAQs by normalized category
  const groupedFaqs = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = initialFaqs.filter((faq) => {
      if (!query) return true;
      return (
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
      );
    });

    const groups: Record<string, FaqItem[]> = {};
    for (const cat of CATEGORIES) {
      groups[cat.title] = [];
    }

    for (const faq of filtered) {
      // Normalize category match
      const matchedCat = CATEGORIES.find(
        (c) =>
          faq.category.includes(c.title) ||
          c.title.includes(faq.category) ||
          faq.category.toLowerCase().includes(c.id)
      );

      const catKey = matchedCat ? matchedCat.title : faq.category;
      if (!groups[catKey]) groups[catKey] = [];
      groups[catKey].push(faq);
    }

    return groups;
  }, [initialFaqs, searchQuery]);

  // Scroll-spy observer for sticky nav
  React.useEffect(() => {
    if (searchQuery) return; // Disable scroll-spy during search

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    for (const cat of CATEGORIES) {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [searchQuery]);

  // Scroll to section helper
  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const navOffset = 110;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    searchInputRef.current?.focus();
  };

  // Keyboard shortcut: Escape to clear search
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setSearchQuery("");
    }
  };

  const totalResults = Object.values(groupedFaqs).reduce(
    (acc, list) => acc + list.length,
    0
  );

  return (
    <div className="mt-8 space-y-12">
      {/* Search Input Bar */}
      <div className="mx-auto max-w-xl">
        <div className="relative flex items-center">
          <Search className="pointer-events-none absolute left-4 h-5 w-5 text-hh-ink-soft" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search all 25 questions (e.g. therapy, anonymous, diagnose)..."
            className="w-full rounded-full border border-hh-line bg-white py-3.5 pl-12 pr-12 text-sm sm:text-base text-hh-ink shadow-xs placeholder:text-hh-ink-soft/70 transition-all focus:border-hh-blue-deep focus:outline-none focus:ring-2 focus:ring-hh-blue-deep"
            aria-label="Search frequently asked questions"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-4 rounded-full p-1 text-hh-ink-soft hover:bg-hh-line/40 hover:text-hh-ink transition-colors"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {searchQuery && (
          <p className="mt-2 text-center text-xs text-hh-ink-soft">
            Found {totalResults} question{totalResults === 1 ? "" : "s"} matching &ldquo;{searchQuery}&rdquo;
          </p>
        )}
      </div>

      {/* Main Content Layout: Sticky Nav on Desktop + Category Sections */}
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Sticky Desktop Category Navigation (Col 1-4) */}
        <aside className="hidden lg:block lg:col-span-4">
          <div className="sticky top-28 space-y-2 rounded-[24px] border border-hh-line bg-white/80 p-5 shadow-xs backdrop-blur-xs">
            <span className="block px-3 py-1 text-xs font-bold uppercase tracking-wider text-hh-ink-soft">
              Jump to Category
            </span>
            <nav className="flex flex-col space-y-1">
              {CATEGORIES.map((cat) => {
                const count = groupedFaqs[cat.title]?.length || 0;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => scrollToCategory(cat.id)}
                    className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all text-left ${
                      isActive
                        ? "bg-hh-yellow/45 text-hh-ink font-bold shadow-xs"
                        : "text-hh-ink-soft hover:bg-hh-cream hover:text-hh-ink"
                    }`}
                  >
                    <span className="truncate pr-2">{cat.title}</span>
                    <span className="rounded-full bg-hh-line/50 px-2 py-0.5 text-xs text-hh-ink-soft">
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Quick Emergency Box inside Desktop Nav */}
            <div className="pt-4 mt-4 border-t border-hh-line">
              <button
                type="button"
                onClick={openEmergency}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-hh-coral/15 border border-hh-coral/30 px-3 py-2 text-xs font-bold text-hh-coral hover:bg-hh-coral hover:text-white transition-colors"
              >
                <LifeBuoy className="h-4 w-4" />
                <span>Need help right now?</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Horizontal Category Tabs */}
        <div className="lg:hidden flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => scrollToCategory(cat.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
                  isActive
                    ? "bg-hh-yellow/45 border-hh-yellow text-hh-ink shadow-xs"
                    : "bg-white border-hh-line text-hh-ink-soft"
                }`}
              >
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* FAQ Category Lists (Col 5-12) */}
        <div className="lg:col-span-8 space-y-12">
          {totalResults === 0 ? (
            <div className="rounded-[24px] border border-hh-line bg-white p-10 text-center space-y-4">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-hh-cream text-hh-ink-soft">
                <HelpCircle className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold text-hh-ink">
                No matching questions found
              </h3>
              <p className="text-sm text-hh-ink-soft max-w-sm mx-auto">
                We couldn&apos;t find any FAQs matching &ldquo;{searchQuery}&rdquo;. Try another word or browse the full categories.
              </p>
              <Button
                type="button"
                onClick={handleClearSearch}
                variant="secondary"
                size="sm"
              >
                Clear search
              </Button>
            </div>
          ) : (
            CATEGORIES.map((cat) => {
              const categoryFaqs = groupedFaqs[cat.title] || [];
              if (categoryFaqs.length === 0) return null;

              return (
                <section
                  key={cat.id}
                  id={cat.id}
                  className="scroll-mt-28 space-y-4"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-hh-line">
                    <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-hh-ink">
                      {cat.title}
                    </h2>
                    <span className="text-xs font-semibold text-hh-ink-soft">
                      {categoryFaqs.length} Qs
                    </span>
                  </div>

                  <Accordion type="single" collapsible className="space-y-3">
                    {categoryFaqs.map((faq) => (
                      <AccordionItem key={faq.slug} value={faq.slug}>
                        <AccordionTrigger>
                          <span>{faq.question}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <p>{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </section>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
