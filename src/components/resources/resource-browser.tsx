"use client";

import { useMemo, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Download, FileText, Phone, ShieldAlert, Sparkles } from "lucide-react";
import { ResourceCard } from "@/components/resources/resource-card";
import { useEmergency } from "@/components/emergency/emergency-provider";
import type { ResourceItem, DownloadItem } from "@/lib/data/resources-data";
import type { EmergencyContactItem } from "@/components/emergency/emergency-provider";

interface ResourceBrowserProps {
  downloads: DownloadItem[];
  resources: ResourceItem[];
  emergencyContacts: EmergencyContactItem[];
}

const CATEGORIES = [
  { id: "all", label: "All Support", countLabel: "all resources" },
  { id: "counsellors-services", label: "Counsellors & services", match: "Counsellors & services" },
  { id: "organisations", label: "Organisations", match: "Organisations" },
  { id: "helplines", label: "Helplines", match: "Helplines" },
  { id: "articles", label: "Articles", match: "Articles" },
] as const;

export function ResourceBrowser({
  downloads,
  resources,
  emergencyContacts,
}: ResourceBrowserProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const { openEmergency } = useEmergency();

  // Get active category from URL search params
  const activeParam = (searchParams.get("category") || "all").toLowerCase();

  // Find matching category
  const activeCategory = useMemo(() => {
    const found = CATEGORIES.find(
      (c) =>
        c.id === activeParam ||
        ("match" in c && c.match.toLowerCase() === activeParam)
    );
    return found ? found.id : "all";
  }, [activeParam]);

  const handleSelectCategory = (catId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (catId === "all") {
        params.delete("category");
      } else {
        params.set("category", catId);
      }
      const qs = params.toString();
      router.replace(qs ? `/resources?${qs}` : "/resources", { scroll: false });
    });
  };

  const filteredResources = useMemo(() => {
    if (activeCategory === "all") return resources;
    const cat = CATEGORIES.find((c) => c.id === activeCategory);
    if (!cat || !("match" in cat)) return resources;
    return resources.filter((r) => r.category === cat.match);
  }, [resources, activeCategory]);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* SECTION 1: DOWNLOADS BLOCK */}
      <section aria-labelledby="downloads-heading" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--hh-line)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFEFE4] text-[#477053] text-xs font-semibold uppercase tracking-wider mb-2">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Printable Guides & Worksheets</span>
            </div>
            <h2
              id="downloads-heading"
              className="text-2xl sm:text-3xl font-bold font-display text-[var(--hh-ink)]"
            >
              Downloads & Grounding Sheets
            </h2>
            <p className="text-sm sm:text-base text-[var(--hh-ink-soft)] mt-1 max-w-xl">
              Free, bite-sized PDFs to save to your device, print out, or practice with whenever you need grounding.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
          {downloads.map((item) => (
            <div
              key={item.slug}
              role="listitem"
              className="group flex flex-col justify-between p-6 sm:p-7 rounded-3xl border border-[var(--hh-line)] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--hh-cream)] text-[var(--hh-ink)]">
                    {item.category}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#EBF3F9] text-[var(--hh-blue-deep)]">
                    {item.fileSize}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[var(--hh-ink)] mb-2 group-hover:text-[var(--hh-blue-deep)] transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-[var(--hh-ink-soft)] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[var(--hh-line)] flex items-center justify-between">
                <span className="text-xs text-[var(--hh-ink-soft)] font-medium">
                  Verified Safe PDF Document
                </span>

                <a
                  href={item.fileUrl}
                  download
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--hh-blue)] text-white text-xs sm:text-sm font-semibold hover:bg-[var(--hh-blue-deep)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] focus-visible:ring-offset-2 transition-colors shadow-xs"
                  aria-label={`Download ${item.title} as PDF`}
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EMERGENCY HELPLINES CALLOUT BANNER */}
      <section
        aria-label="Immediate Help Callout"
        className="p-6 sm:p-8 rounded-3xl bg-[#FFF6F3] border border-[#FADCD5] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#C24E39] uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4 text-[var(--hh-coral)]" aria-hidden="true" />
            <span>Need immediate, confidential support?</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--hh-ink)]">
            Free 24/7 Helplines Available Right Now
          </h3>
          <p className="text-sm text-[var(--hh-ink-soft)] leading-relaxed">
            If you or someone you care about feels unsafe or in crisis, you don&apos;t have to navigate it alone. Trained counsellors are ready to listen for free without judgment.
          </p>
          <div className="flex flex-wrap gap-4 pt-2 text-xs font-semibold text-[var(--hh-ink)]">
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#FADCD5]">
              <Phone className="w-3.5 h-3.5 text-[var(--hh-coral)]" />
              <span>India: 1098 (Childline) or 14416 (Tele-MANAS)</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white/80 px-3 py-1.5 rounded-full border border-[#FADCD5]">
              <Phone className="w-3.5 h-3.5 text-[var(--hh-coral)]" />
              <span>US / CA: 988 or Text HOME to 741741</span>
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={openEmergency}
          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--hh-coral)] text-white text-sm font-bold hover:bg-[#D66B57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-coral)] focus-visible:ring-offset-2 transition-colors shadow-sm"
        >
          <ShieldAlert className="w-4 h-4" aria-hidden="true" />
          <span>View All Helplines</span>
        </button>
      </section>

      {/* SECTION 2: EXPLORE SUPPORT (CATEGORIZED LINKS) */}
      <section aria-labelledby="support-heading" className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3F9] text-[var(--hh-blue-deep)] text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Trusted Guidance & Directories</span>
          </div>
          <h2
            id="support-heading"
            className="text-2xl sm:text-3xl font-bold font-display text-[var(--hh-ink)]"
          >
            Explore Support
          </h2>
          <p className="text-sm sm:text-base text-[var(--hh-ink-soft)] mt-1 max-w-xl">
            Evidence-based adolescent mental health organisations, verified helplines, educational articles, and youth counselling resources.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="tablist"
          aria-label="Resource categories"
          className="flex items-center gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                role="tab"
                id={`tab-${cat.id}`}
                aria-selected={isSelected}
                aria-controls={`tabpanel-${cat.id}`}
                onClick={() => handleSelectCategory(cat.id)}
                className={`shrink-0 px-4 py-2.5 rounded-full text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] ${
                  isSelected
                    ? "bg-[var(--hh-blue-deep)] text-white shadow-xs"
                    : "bg-white text-[var(--hh-ink)] border border-[var(--hh-line)] hover:border-[var(--hh-blue)]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div
          id={`tabpanel-${activeCategory}`}
          role="tabpanel"
          aria-labelledby={`tab-${activeCategory}`}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200 ${
            isPending ? "opacity-60" : "opacity-100"
          }`}
        >
          {filteredResources.map((res) => (
            <ResourceCard key={res.slug} resource={res} />
          ))}
        </div>
      </section>
    </div>
  );
}
