"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X, Phone, Globe, HeartHandshake, ShieldAlert, ArrowUpRight } from "lucide-react";
import { EMERGENCY_DISCLAIMER } from "@/lib/safety/disclaimers";
import type { EmergencyContactItem } from "./emergency-provider";

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  contacts: EmergencyContactItem[];
}

export function EmergencyModal({ isOpen, onClose, contacts }: EmergencyModalProps) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        {/* Backdrop: 150ms calm fade */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-hh-ink/40 backdrop-blur-xs transition-opacity duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          aria-describedby="emergency-description"
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-hh-line bg-white p-6 sm:p-8 shadow-2xl transition-all duration-150 max-h-[90vh] overflow-y-auto focus:outline-none"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-hh-line">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-hh-coral/15 text-hh-coral">
                <ShieldAlert className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <DialogPrimitive.Title className="font-display text-2xl font-bold tracking-tight text-hh-ink">
                  If you need help right now
                </DialogPrimitive.Title>
                <p className="text-xs font-medium text-hh-ink-soft">
                  Immediate, free, confidential real-world support
                </p>
              </div>
            </div>
            <DialogPrimitive.Close
              onClick={onClose}
              className="rounded-full p-2 text-hh-ink-soft hover:bg-hh-cream hover:text-hh-ink transition-colors focus-visible:ring-2 focus-visible:ring-hh-blue-deep"
              aria-label="Close emergency support modal"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div id="emergency-description" className="space-y-6 pt-5">
            {/* Non-negotiable Verbatim Emergency Disclaimer */}
            <div className="rounded-2xl border border-hh-coral/30 bg-hh-coral/10 p-4 sm:p-5">
              <p className="text-sm font-medium leading-relaxed text-hh-ink">
                {EMERGENCY_DISCLAIMER}
              </p>
            </div>

            {/* Talk to a trusted adult guidance */}
            <div className="rounded-2xl border border-hh-sage/40 bg-hh-sage/10 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <HeartHandshake className="h-5 w-5 text-hh-sage-deep shrink-0 mt-0.5" aria-hidden="true" />
                <div className="space-y-1.5">
                  <h4 className="font-display text-base font-bold text-hh-ink">
                    Talk to a trusted adult
                  </h4>
                  <p className="text-sm text-hh-ink-soft leading-relaxed">
                    If you feel overwhelmed, reaching out to a parent, caregiver, family member, school counsellor, teacher, or nurse is often the fastest step to feeling supported and safe. You do not have to explain everything perfectly—just saying <em>“I’m really not okay right now and I need help”</em> is enough.
                  </p>
                </div>
              </div>
            </div>

            {/* Helplines List */}
            <div className="space-y-3">
              <h4 className="font-display text-base font-bold text-hh-ink">
                Free, confidential crisis helplines
              </h4>
              <div className="grid gap-3 sm:grid-cols-2">
                {contacts.map((contact, idx) => (
                  <div
                    key={contact.id || idx}
                    className="flex flex-col justify-between rounded-xl border border-hh-line bg-hh-cream/50 p-4 transition-colors hover:bg-hh-cream"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-hh-ink">
                          {contact.name}
                        </span>
                        {contact.region && (
                          <span className="text-[11px] font-medium text-hh-ink-soft uppercase bg-white px-2 py-0.5 rounded-full border border-hh-line">
                            {contact.region}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-xs text-hh-ink-soft line-clamp-2">
                        {contact.description}
                      </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-hh-line/60 flex items-center justify-between gap-2">
                      <a
                        href={`tel:${contact.phone.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-hh-blue-deep px-3 py-1.5 text-xs font-semibold text-white hover:bg-hh-ink transition-colors"
                      >
                        <Phone className="h-3 w-3" aria-hidden="true" />
                        <span>{contact.phone}</span>
                      </a>

                      {contact.url && (
                        <a
                          href={contact.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="inline-flex items-center gap-1 text-xs font-medium text-hh-blue-deep hover:underline"
                        >
                          <Globe className="h-3 w-3" aria-hidden="true" />
                          <span>Website</span>
                          <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Closing reassurance */}
            <div className="pt-2 text-center">
              <p className="text-sm font-semibold text-hh-ink-soft italic">
                “You don't have to figure everything out alone.”
              </p>
            </div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
