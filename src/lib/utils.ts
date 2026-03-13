/**
 * Format weight for display based on user preference.
 * Stored as grams, displayed as g/kg or oz/lb.
 */
export function formatWeight(
  grams: number | null | undefined,
  unit: "metric" | "imperial" = "metric"
): string {
  if (grams == null) return "—";

  if (unit === "imperial") {
    const oz = grams / 28.3495;
    if (oz >= 16) {
      const lb = Math.floor(oz / 16);
      const remainOz = Math.round(oz % 16);
      return remainOz > 0 ? `${lb} lb ${remainOz} oz` : `${lb} lb`;
    }
    return `${oz.toFixed(1)} oz`;
  }

  if (grams >= 1000) {
    return `${(grams / 1000).toFixed(2)} kg`;
  }
  return `${grams} g`;
}

/**
 * Format currency for display.
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

/**
 * Format a date string for display.
 */
export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Calculate total weight of items in grams.
 */
export function totalWeight(
  items: Array<{ weight_grams: number | null; quantity?: number }>
): number {
  return items.reduce((sum, item) => {
    return sum + (item.weight_grams ?? 0) * (item.quantity ?? 1);
  }, 0);
}

/**
 * Calculate percentage of capacity used.
 */
export function capacityPercent(used: number, max: number | null): number {
  if (!max || max <= 0) return 0;
  return Math.min(100, Math.round((used / max) * 100));
}

/**
 * Get the color for a capacity bar.
 */
export function capacityColor(percent: number): string {
  if (percent >= 90) return "#EF4444"; // red
  if (percent >= 70) return "#E87040"; // orange
  if (percent >= 50) return "#F59E0B"; // amber
  return "#22C55E"; // green
}

/**
 * Generate initials from a display name.
 */
export function initials(name: string | null | undefined): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Classname merge utility (simple version).
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Days until a date. Negative = overdue.
 */
export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr);
  const now = new Date();
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
