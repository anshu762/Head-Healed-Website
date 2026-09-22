"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { EmotionDetail } from "./emotion-detail";
import type { EmotionItem, RelatedStoryItem } from "@/lib/data/feelings-data";

interface EmotionModalDialogProps {
  emotion: EmotionItem;
  relatedStory?: RelatedStoryItem | null;
}

export function EmotionModalDialog({
  emotion,
  relatedStory,
}: EmotionModalDialogProps) {
  const router = useRouter();
  const [open, setOpen] = React.useState(true);

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setOpen(false);
      router.back();
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        {/* Backdrop: 200ms calm fade */}
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-hh-ink/40 backdrop-blur-xs transition-opacity duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <DialogPrimitive.Content
          aria-describedby="emotion-detail-content"
          className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-[28px] border border-hh-line bg-white p-6 sm:p-8 shadow-2xl transition-all duration-200 max-h-[90vh] overflow-y-auto focus:outline-none"
        >
          {/* Close button at top right */}
          <div className="flex justify-end -mt-2 -mr-2 mb-2">
            <DialogPrimitive.Close
              onClick={() => handleOpenChange(false)}
              className="rounded-full p-2 text-hh-ink-soft hover:bg-hh-cream hover:text-hh-ink transition-colors focus-visible:ring-2 focus-visible:ring-hh-blue-deep"
              aria-label="Close emotion guide"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </DialogPrimitive.Close>
          </div>

          <div id="emotion-detail-content">
            <EmotionDetail emotion={emotion} relatedStory={relatedStory} />
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
