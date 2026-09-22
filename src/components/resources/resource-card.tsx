"use client";

import { ExternalLink, Phone, ShieldAlert } from "lucide-react";
import { useEmergency } from "@/components/emergency/emergency-provider";
import type { ResourceItem } from "@/lib/data/resources-data";

interface ResourceCardProps {
  resource: ResourceItem;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { openEmergency } = useEmergency();
  const isHelpline = resource.category === "Helplines" || resource.type === "HELPLINE";

  return (
    <div
      className={`flex flex-col justify-between p-6 sm:p-7 rounded-3xl border bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${
        isHelpline
          ? "border-[var(--hh-coral)]/30 bg-[#FFFBF8]"
          : "border-[var(--hh-line)]"
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
              isHelpline
                ? "bg-[#FDECE8] text-[#C24E39]"
                : "bg-[var(--hh-cream)] text-[var(--hh-ink-soft)]"
            }`}
          >
            {resource.category}
          </span>
          {resource.region && (
            <span className="text-xs font-medium text-[var(--hh-ink-soft)] bg-black/5 px-2 py-0.5 rounded-md">
              {resource.region}
            </span>
          )}
        </div>

        <h3 className="text-lg sm:text-xl font-bold font-display text-[var(--hh-ink)] mb-2">
          {resource.title}
        </h3>

        <p className="text-sm text-[var(--hh-ink-soft)] leading-relaxed mb-6">
          {resource.description}
        </p>
      </div>

      <div className="pt-4 border-t border-[var(--hh-line)] flex flex-wrap items-center justify-between gap-3">
        {isHelpline ? (
          <div className="flex flex-wrap items-center gap-2 w-full justify-between">
            <button
              type="button"
              onClick={openEmergency}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8836F] text-white text-xs font-semibold hover:bg-[#D66B57] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8836F] focus-visible:ring-offset-2 transition-colors shadow-xs"
            >
              <ShieldAlert className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Open Helplines Modal</span>
            </button>

            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--hh-blue-deep)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] rounded-sm"
            >
              <span>Visit website</span>
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        ) : (
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--hh-blue-deep)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hh-blue-deep)] rounded-sm"
          >
            <span>Visit resource</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  );
}
