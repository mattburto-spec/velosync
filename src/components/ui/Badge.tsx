import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

type BadgeColor =
  | "copper"
  | "steel"
  | "sand"
  | "summit"
  | "muted"
  | "red"
  | "purple"
  // Legacy aliases for backward compat
  | "forest"
  | "trail"
  | "sky"
  | "sunset"
  | "stone";

interface BadgeProps {
  children: ReactNode;
  color?: BadgeColor;
  className?: string;
}

const colorStyles: Record<BadgeColor, string> = {
  copper: "bg-copper/10 text-copper",
  steel: "bg-steel/10 text-steel",
  sand: "bg-sand/10 text-sand",
  summit: "bg-summit/10 text-summit",
  muted: "bg-surface-warm text-muted",
  red: "bg-red-100 text-red-700",
  purple: "bg-purple-100 text-purple-700",
  // Legacy aliases
  forest: "bg-summit/10 text-summit",
  trail: "bg-sand/10 text-sand",
  sky: "bg-steel/10 text-steel",
  sunset: "bg-copper/10 text-copper",
  stone: "bg-surface-warm text-muted",
};

function Badge({ children, color = "muted", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge, type BadgeProps, type BadgeColor };
