import * as React from "react";
import {
  CloudRain,
  Compass,
  Flame,
  CloudFog,
  Sparkles,
  Ghost,
  BookOpen,
  Home,
  HeartHandshake,
  Heart,
  type LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface EmotionIconProps extends LucideProps {
  slug?: string;
  iconName?: string;
  className?: string;
}

const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  anxiety: CloudRain,
  loneliness: Compass,
  burnout: Flame,
  "emotional-numbness": CloudFog,
  "identity-stress": Sparkles,
  "feeling-invisible": Ghost,
  "academic-pressure": BookOpen,
  "family-pressure": Home,
  "self-esteem-confusion": HeartHandshake,
  // By iconName fallback
  CloudRain,
  Compass,
  Flame,
  CloudFog,
  Sparkles,
  Ghost,
  BookOpen,
  Home,
  HeartHandshake,
};

export function EmotionIcon({
  slug,
  iconName,
  className,
  ...props
}: EmotionIconProps) {
  const IconComponent =
    (slug && ICON_MAP[slug]) ||
    (iconName && ICON_MAP[iconName]) ||
    Heart;

  return <IconComponent className={cn("shrink-0", className)} {...props} />;
}
