"use client";

import { useState, useMemo } from "react";
import { useDraggable } from "@dnd-kit/core";
import { GEAR_CATEGORIES, CATEGORY_COLORS } from "@/lib/constants";
import type { GearItem, GearCategory } from "@/types";

// Mock gear for prototype — will be replaced with real DB data
const MOCK_GEAR: GearItem[] = [
  { id: "g1", user_id: "", name: "Tent — Copper Spur HV UL2", category: "shelter", brand: "Big Agnes", model: "Copper Spur HV UL2", weight_grams: 1270, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g2", user_id: "", name: "Sleeping Bag — Magma 15", category: "sleep", brand: "REI", model: "Magma 15", weight_grams: 820, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g3", user_id: "", name: "Sleeping Pad — NeoAir XTherm", category: "sleep", brand: "Therm-a-Rest", model: "NeoAir XTherm", weight_grams: 430, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g4", user_id: "", name: "Stove — PocketRocket 2", category: "cook", brand: "MSR", model: "PocketRocket 2", weight_grams: 73, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "new", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g5", user_id: "", name: "Cook Pot — Titanium 700ml", category: "cook", brand: "TOAKS", model: "Titanium 700ml", weight_grams: 86, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g6", user_id: "", name: "Rain Jacket — Torrentshell", category: "clothing", brand: "Patagonia", model: "Torrentshell 3L", weight_grams: 394, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g7", user_id: "", name: "Multitool — Squirt PS4", category: "tools", brand: "Leatherman", model: "Squirt PS4", weight_grams: 56, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g8", user_id: "", name: "Headlamp — Actik Core", category: "electronics", brand: "Petzl", model: "Actik Core", weight_grams: 75, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g9", user_id: "", name: "Water Filter — Sawyer Squeeze", category: "hydration", brand: "Sawyer", model: "Squeeze", weight_grams: 85, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g10", user_id: "", name: "Water Bottle — 1L Nalgene", category: "hydration", brand: "Nalgene", model: "Wide Mouth 1L", weight_grams: 175, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g11", user_id: "", name: "Bike Pump — Mini", category: "tools", brand: "Topeak", model: "Micro Rocket", weight_grams: 55, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g12", user_id: "", name: "Power Bank — 10000mAh", category: "electronics", brand: "Anker", model: "PowerCore 10000", weight_grams: 180, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g13", user_id: "", name: "Trail Mix — 500g", category: "food", brand: "", model: "", weight_grams: 500, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "new", notes: null, is_consumable: true, is_shared: false, created_at: "", updated_at: "" },
  { id: "g14", user_id: "", name: "Tube Repair Kit", category: "tools", brand: "Park Tool", model: "VP-1", weight_grams: 28, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g15", user_id: "", name: "Down Puffy — Ghost Whisperer", category: "clothing", brand: "Mountain Hardwear", model: "Ghost Whisperer/2", weight_grams: 210, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
  { id: "g16", user_id: "", name: "First Aid Kit — Ultralight", category: "tools", brand: "Adventure Medical", model: "Ultralight .7", weight_grams: 200, dimensions_mm: null, purchase_price: null, purchase_date: null, purchase_url: null, condition: "good", notes: null, is_consumable: false, is_shared: false, created_at: "", updated_at: "" },
];

interface GearPanelProps {
  packedGearIds: Set<string>;
  className?: string;
}

export function GearPanel({ packedGearIds, className = "" }: GearPanelProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<GearCategory | "all">("all");

  const filtered = useMemo(() => {
    return MOCK_GEAR.filter((g) => {
      if (activeCategory !== "all" && g.category !== activeCategory) return false;
      if (search && !g.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, activeCategory]);

  const unpackedCount = MOCK_GEAR.filter((g) => !packedGearIds.has(g.id)).length;

  return (
    <div className={`flex flex-col h-full bg-[#0A0F1C] border-l border-white/[0.04] ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/[0.04]">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-[10px] font-semibold text-white/40 uppercase tracking-widest">
            Gear Inventory
          </h3>
          <span className="text-[9px] text-white/20 tabular-nums">
            {unpackedCount} unpacked
          </span>
        </div>
        <div className="relative">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/20">
            <circle cx="8.5" cy="8.5" r="5.5" />
            <path d="M13 13l4 4" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gear..."
            className="w-full bg-white/[0.03] border border-white/[0.06] rounded-lg pl-8 pr-3 py-1.5 text-xs text-white/80 placeholder:text-white/15 outline-none focus:border-copper/30 transition-colors"
          />
        </div>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap gap-1 px-3 py-2 border-b border-white/[0.04]">
        <button
          onClick={() => setActiveCategory("all")}
          className={`text-[9px] px-2 py-0.5 rounded-full transition-all duration-150 ${
            activeCategory === "all"
              ? "bg-copper/15 text-copper/90 font-medium"
              : "bg-white/[0.03] text-white/30 hover:text-white/50"
          }`}
        >
          All
        </button>
        {GEAR_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value as GearCategory)}
            className={`text-[9px] px-2 py-0.5 rounded-full transition-all duration-150 ${
              activeCategory === cat.value
                ? "bg-copper/15 text-copper/90 font-medium"
                : "bg-white/[0.03] text-white/30 hover:text-white/50"
            }`}
          >
            {cat.label.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Gear list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar-dark p-2 space-y-0.5">
        {filtered.map((gear, i) => (
          <DraggableGearCard
            key={gear.id}
            gear={gear}
            isPacked={packedGearIds.has(gear.id)}
            index={i}
          />
        ))}
        {filtered.length === 0 && (
          <p className="text-[10px] text-white/15 text-center py-8">No gear found</p>
        )}
      </div>

      {/* Footer stats */}
      <div className="px-4 py-2.5 border-t border-white/[0.04] flex justify-between text-[9px] text-white/20">
        <span>{MOCK_GEAR.length} items</span>
        <span className="tabular-nums">
          {(MOCK_GEAR.reduce((s, g) => s + (g.weight_grams ?? 0), 0) / 1000).toFixed(1)}kg total
        </span>
      </div>
    </div>
  );
}

function DraggableGearCard({
  gear,
  isPacked,
  index,
}: {
  gear: GearItem;
  isPacked: boolean;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `gear-${gear.id}`,
    data: { type: "gear-item", gearItem: gear },
    disabled: isPacked,
  });

  const catColor = CATEGORY_COLORS[gear.category] || "#9CA3AF";

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`
        flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg transition-all duration-150 animate-fade-up
        ${isPacked
          ? "opacity-30"
          : "cursor-grab active:cursor-grabbing hover:bg-white/[0.04]"
        }
        ${isDragging ? "opacity-15 scale-95" : ""}
      `}
      style={{ animationDelay: `${index * 20}ms` }}
    >
      {/* Category indicator */}
      <div
        className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-opacity"
        style={{ backgroundColor: catColor, opacity: isPacked ? 0.3 : 0.7 }}
      />
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-white/70 truncate leading-tight">{gear.name}</div>
        {gear.brand && (
          <div className="text-[9px] text-white/20 truncate">{gear.brand}</div>
        )}
      </div>
      <span className="text-[9px] text-white/25 flex-shrink-0 tabular-nums font-medium">
        {gear.weight_grams ? `${gear.weight_grams}g` : "—"}
      </span>
      {isPacked && (
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 text-copper/60">
          <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}
