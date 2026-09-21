import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors select-none",
  {
    variants: {
      variant: {
        default: "bg-hh-line/60 text-hh-ink border border-hh-line",
        blue: "bg-hh-blue/20 text-hh-blue-deep border border-hh-blue/30",
        sage: "bg-hh-sage/25 text-hh-sage-deep border border-hh-sage/35",
        yellow: "bg-hh-yellow/40 text-hh-ink border border-hh-yellow/60",
        coral: "bg-hh-coral/20 text-hh-coral border border-hh-coral/30",
        outline: "border border-hh-line text-hh-ink-soft bg-white",
      },
      size: {
        sm: "px-2.5 py-0.5 text-[11px]",
        default: "px-3.5 py-1 text-xs",
        lg: "px-4 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface PillProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {
  icon?: React.ReactNode;
}

export function Pill({ className, variant, size, icon, children, ...props }: PillProps) {
  return (
    <span className={cn(pillVariants({ variant, size, className }))} {...props}>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
