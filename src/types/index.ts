// ============================================================
// VeloSync — TypeScript Types
// ============================================================

// --- Users ---
export interface User {
  id: string;
  display_name: string | null;
  avatar_url: string | null;
  unit_preference: "metric" | "imperial";
  created_at: string;
  updated_at: string;
}

// --- Gear ---
export type GearCategory =
  | "shelter"
  | "sleep"
  | "cook"
  | "clothing"
  | "tools"
  | "electronics"
  | "hydration"
  | "food"
  | "misc";

export type GearCondition = "new" | "good" | "worn" | "needs-repair";

export interface GearItem {
  id: string;
  user_id: string;
  name: string;
  category: GearCategory;
  brand: string | null;
  model: string | null;
  weight_grams: number | null;
  dimensions_mm: { length: number; width: number; height: number } | null;
  purchase_price: number | null;
  purchase_date: string | null;
  purchase_url: string | null;
  condition: GearCondition;
  notes: string | null;
  is_consumable: boolean;
  is_shared: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  photos?: GearPhoto[];
}

export interface GearPhoto {
  id: string;
  gear_item_id: string;
  photo_url: string;
  storage_path: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

// --- Maintenance ---
export type MaintenanceType = "cleaning" | "repair" | "replacement" | "inspection";

export interface MaintenanceRecord {
  id: string;
  gear_item_id: string;
  type: MaintenanceType;
  description: string | null;
  performed_at: string;
  cost: number | null;
  next_due_at: string | null;
  interval_days: number | null;
  created_at: string;
}

// --- Bikes ---
export type BikeType = "touring" | "gravel" | "mountain" | "fat" | "road" | "ebike";

export interface Bike {
  id: string;
  user_id: string;
  name: string;
  type: BikeType | null;
  brand: string | null;
  model: string | null;
  year: number | null;
  weight_grams: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  // Joined
  photos?: BikePhoto[];
  bag_slots?: BagSlot[];
}

export interface BikePhoto {
  id: string;
  bike_id: string;
  photo_url: string;
  storage_path: string;
  is_primary: boolean;
  sort_order: number;
  created_at: string;
}

export type BagPosition =
  | "handlebar"
  | "frame"
  | "seat"
  | "rear-rack"
  | "front-rack"
  | "fork-L"
  | "fork-R"
  | "top-tube"
  | "stem"
  | "downtube";

export interface BagSlot {
  id: string;
  bike_id: string;
  name: string;
  position: BagPosition;
  max_volume_ml: number | null;
  max_weight_grams: number | null;
  brand: string | null;
  model: string | null;
  color: string | null;
  created_at: string;
}

// --- Trips ---
export type TripTerrain = "road" | "gravel" | "mixed" | "singletrack";
export type TripClimate = "tropical" | "temperate" | "alpine" | "desert" | "arctic";
export type TripStatus = "planning" | "packed" | "active" | "completed";

export interface Trip {
  id: string;
  created_by: string;
  name: string;
  description: string | null;
  destination: string | null;
  start_date: string | null;
  end_date: string | null;
  distance_km: number | null;
  terrain: TripTerrain | null;
  climate: TripClimate | null;
  expected_conditions: string | null;
  status: TripStatus;
  created_at: string;
  updated_at: string;
  // Joined
  members?: TripMember[];
  packing_items?: PackingItem[];
}

export type TripRole = "owner" | "member";

export interface TripMember {
  id: string;
  trip_id: string;
  user_id: string;
  role: TripRole;
  joined_at: string;
  // Joined
  user?: User;
}

// --- Packing ---
export interface PackingItem {
  id: string;
  trip_id: string;
  gear_item_id: string;
  bag_slot_id: string | null;
  packed_by: string;
  is_shared: boolean;
  quantity: number;
  sort_order: number;
  created_at: string;
  // Joined
  gear_item?: GearItem;
}

// --- AI ---
export type AISuggestionType = "packing_list" | "weight_estimate" | "missing_gear";

export interface AISuggestion {
  id: string;
  trip_id: string;
  user_id: string;
  suggestion_type: AISuggestionType;
  input_context: Record<string, unknown>;
  suggestion: Record<string, unknown>;
  accepted: boolean | null;
  created_at: string;
}

// --- UI Helpers ---
export interface SelectOption {
  value: string;
  label: string;
}
