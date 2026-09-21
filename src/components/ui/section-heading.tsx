import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  className,
  as: HeadingTag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-hh-sage/25 px-3.5 py-1 text-xs font-semibold text-hh-sage-deep uppercase tracking-wider">
          {badge}
        </span>
      )}
      <HeadingTag className="font-display font-bold tracking-tight text-hh-ink">
        {title}
      </HeadingTag>
      {description && (
        <p className="max-w-2xl text-base sm:text-lg text-hh-ink-soft leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
