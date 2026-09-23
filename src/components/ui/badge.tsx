import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide transition-colors focus:outline-none focus:ring-2 focus:ring-hh-blue-deep focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border border-hh-line bg-white text-hh-ink",
        blue: "bg-hh-blue/15 text-hh-blue-deep border border-hh-blue/30",
        sage: "bg-hh-sage/20 text-hh-sage-deep border border-hh-sage/35",
        coral: "bg-hh-coral/15 text-hh-ink border border-hh-coral/30",
        yellow: "bg-hh-yellow/40 text-hh-ink border border-hh-yellow/60",
        outline: "border border-hh-line text-hh-ink-soft bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
