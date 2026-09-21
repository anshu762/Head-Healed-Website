"use client";

import * as React from "react";
import { LifeBuoy } from "lucide-react";
import { useEmergency } from "./emergency-provider";

export function EmergencyFab() {
  const { openEmergency } = useEmergency();

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <button
        type="button"
        onClick={openEmergency}
        aria-label="Open emergency support and crisis helplines"
        className="group relative flex items-center gap-2.5 rounded-full bg-hh-coral px-4 py-3 text-sm font-bold text-white shadow-[0_8px_25px_rgba(232,131,111,0.45)] ring-2 ring-white/70 transition-all duration-200 hover:scale-[1.03] hover:shadow-[0_12px_30px_rgba(232,131,111,0.6)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-hh-blue-deep"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20">
          <LifeBuoy className="h-4 w-4 text-white" aria-hidden="true" />
        </span>
        <span className="tracking-wide">Emergency Support</span>
      </button>
    </div>
  );
}
