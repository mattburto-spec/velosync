/**
 * VeloSync pricing tiers and feature gating.
 * Set MONETIZATION_ENABLED to true when ready to enforce limits.
 */

export const MONETIZATION_ENABLED = false;

export type PlanId = "free" | "pro" | "lifetime";

export interface PlanConfig {
  id: PlanId;
  name: string;
  tagline: string;
  price: string;
  priceNote?: string;
  features: string[];
  limits: {
    bikes: number;
    gearItems: number;
    trips: number;
    aiSuggestionsPerMonth: number;
    collaboratorsPerTrip: number;
    photoStorage: string;
  };
}

export const PLANS: Record<PlanId, PlanConfig> = {
  free: {
    id: "free",
    name: "Trailhead",
    tagline: "Get started for free",
    price: "$0",
    features: [
      "1 bike in your garage",
      "20 gear items",
      "3 active trips",
      "Basic packing lists",
      "Manual weight tracking",
    ],
    limits: {
      bikes: 1,
      gearItems: 20,
      trips: 3,
      aiSuggestionsPerMonth: 0,
      collaboratorsPerTrip: 0,
      photoStorage: "50 MB",
    },
  },
  pro: {
    id: "pro",
    name: "Summit",
    tagline: "Pack smarter with AI",
    price: "$6",
    priceNote: "/month",
    features: [
      "Unlimited bikes & gear",
      "Unlimited trips",
      "AI packing suggestions (Velo Assistant)",
      "Weather integration",
      "Trip collaboration",
      "Loadout presets",
      "Export & share packing lists",
      "Priority support",
    ],
    limits: {
      bikes: Infinity,
      gearItems: Infinity,
      trips: Infinity,
      aiSuggestionsPerMonth: 100,
      collaboratorsPerTrip: 10,
      photoStorage: "5 GB",
    },
  },
  lifetime: {
    id: "lifetime",
    name: "Summit Lifetime",
    tagline: "One-time purchase, ride forever",
    price: "$39",
    priceNote: "one time",
    features: [
      "Everything in Summit",
      "Lifetime access — no recurring fees",
      "Early access to new features",
    ],
    limits: {
      bikes: Infinity,
      gearItems: Infinity,
      trips: Infinity,
      aiSuggestionsPerMonth: 100,
      collaboratorsPerTrip: 10,
      photoStorage: "5 GB",
    },
  },
};

/**
 * Check if user can perform an action based on their plan.
 * Returns true when monetization is disabled (everything unlocked).
 */
export function canAccess(
  userPlan: PlanId,
  resource: keyof PlanConfig["limits"],
  currentCount: number
): boolean {
  if (!MONETIZATION_ENABLED) return true;
  const limit = PLANS[userPlan].limits[resource];
  if (typeof limit === "number") return currentCount < limit;
  return true;
}

/**
 * Check if a feature is available on a given plan.
 */
export function hasFeature(userPlan: PlanId, feature: string): boolean {
  if (!MONETIZATION_ENABLED) return true;
  if (userPlan === "pro" || userPlan === "lifetime") return true;

  // Free plan feature restrictions
  const proOnlyFeatures = [
    "ai_suggestions",
    "velo_assistant",
    "weather",
    "collaboration",
    "presets",
    "export",
  ];
  return !proOnlyFeatures.includes(feature);
}
