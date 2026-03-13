import type { SelectOption } from "@/types";

export const GEAR_CATEGORIES: SelectOption[] = [
  { value: "shelter", label: "Shelter" },
  { value: "sleep", label: "Sleep System" },
  { value: "cook", label: "Cook & Eat" },
  { value: "clothing", label: "Clothing" },
  { value: "tools", label: "Tools & Repair" },
  { value: "electronics", label: "Electronics" },
  { value: "hydration", label: "Hydration" },
  { value: "food", label: "Food & Fuel" },
  { value: "misc", label: "Miscellaneous" },
];

export const GEAR_CONDITIONS: SelectOption[] = [
  { value: "new", label: "New" },
  { value: "good", label: "Good" },
  { value: "worn", label: "Worn" },
  { value: "needs-repair", label: "Needs Repair" },
];

export const BIKE_TYPES: SelectOption[] = [
  { value: "touring", label: "Touring" },
  { value: "gravel", label: "Gravel" },
  { value: "mountain", label: "Mountain" },
  { value: "fat", label: "Fat Bike" },
  { value: "road", label: "Road" },
  { value: "ebike", label: "E-Bike" },
];

export const BAG_POSITIONS: SelectOption[] = [
  { value: "handlebar", label: "Handlebar" },
  { value: "frame", label: "Frame Bag" },
  { value: "seat", label: "Seat Pack" },
  { value: "rear-rack", label: "Rear Rack" },
  { value: "front-rack", label: "Front Rack" },
  { value: "fork-L", label: "Fork (Left)" },
  { value: "fork-R", label: "Fork (Right)" },
  { value: "top-tube", label: "Top Tube" },
  { value: "stem", label: "Stem Bag" },
  { value: "downtube", label: "Downtube" },
];

export const TRIP_TERRAINS: SelectOption[] = [
  { value: "road", label: "Road" },
  { value: "gravel", label: "Gravel" },
  { value: "mixed", label: "Mixed" },
  { value: "singletrack", label: "Singletrack" },
];

export const TRIP_CLIMATES: SelectOption[] = [
  { value: "tropical", label: "Tropical" },
  { value: "temperate", label: "Temperate" },
  { value: "alpine", label: "Alpine" },
  { value: "desert", label: "Desert" },
  { value: "arctic", label: "Arctic" },
];

export const MAINTENANCE_TYPES: SelectOption[] = [
  { value: "cleaning", label: "Cleaning" },
  { value: "repair", label: "Repair" },
  { value: "replacement", label: "Replacement" },
  { value: "inspection", label: "Inspection" },
];

export const CATEGORY_ICONS: Record<string, string> = {
  shelter: "🏕️",
  sleep: "🛏️",
  cook: "🍳",
  clothing: "👕",
  tools: "🔧",
  electronics: "🔋",
  hydration: "💧",
  food: "🥤",
  misc: "📦",
};

export const CATEGORY_COLORS: Record<string, string> = {
  shelter: "#C8553D",
  sleep: "#5B8FB9",
  cook: "#D4A574",
  clothing: "#8B5CF6",
  tools: "#6E7787",
  electronics: "#47759A",
  hydration: "#06B6D4",
  food: "#6B8F71",
  misc: "#9CA3AF",
};
