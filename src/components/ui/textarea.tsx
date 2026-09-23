import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[120px] w-full rounded-2xl border border-hh-line bg-white px-4 py-3 text-sm text-hh-ink placeholder:text-hh-ink-soft/60 transition-colors focus-visible:outline-none focus-visible:border-hh-blue-deep focus-visible:ring-2 focus-visible:ring-hh-blue-deep/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
