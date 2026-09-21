import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hh-blue-deep focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-hh-blue text-white shadow-xs hover:bg-hh-blue-deep active:scale-[0.98]",
        secondary:
          "bg-white text-hh-ink border border-hh-line shadow-xs hover:bg-hh-cream hover:border-hh-ink-soft/20 active:scale-[0.98]",
        ghost:
          "text-hh-ink-soft hover:text-hh-ink hover:bg-hh-blue/10 active:scale-[0.98]",
        emergency:
          "bg-hh-coral text-white font-bold tracking-wide shadow-md hover:brightness-105 active:scale-[0.98] ring-2 ring-white/40",
        outline:
          "border border-hh-blue text-hh-blue-deep hover:bg-hh-blue/10 active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
