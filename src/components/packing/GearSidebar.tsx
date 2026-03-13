"use client";

import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { GEAR_CATEGORIES } from "@/lib/constants";
import { PackingItem } from "./PackingItem";
import type { GearItem, PackingItem as PackingItemType } from "@/types";

interface GearSidebarProps {
  gearItems: GearItem[];
  packingItems: PackingItemType[];
}

function GearSidebar({ gearItems, packingItems }: GearSidebarProps) {
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  // Make the sidebar a drop zone so items can be dragged back
  const { setNodeRef, isOver } = useDroppable({
    id: "sidebar-drop",
    data: { type: "sidebar" },
  });

  const packedGearIds = new Set(packingItems.map((pi) => pi.gear_item_id));

  const filtered = gearItems.filter((item) => {
    if (filter !== "all" && item.category !== filter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.brand?.toLowerCase().includes(q) ?? false)
      );
    }
    return true;
  });

  // Show packed items last
  const sorted = [...filtered].sort((a, b) => {
    const aPacked = packedGearIds.has(a.id) ? 1 : 0;
    const bPacked = packedGearIds.has(b.id) ? 1 : 0;
    return aPacked - bPacked;
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex h-full w-[300px] shrink-0 flex-col border-r border-surface-warm bg-white transition-colors",
        isOver && "bg-red-50/50"
      )}
    >
      {/* Header */}
      <div className="border-b border-surface-warm px-4 py-3">
        <h3 className="text-sm font-semibold text-slate-text">Gear Inventory</h3>
        <p className="text-xs text-muted">
          {packedGearIds.size} of {gearItems.length} packed
        </p>
      </div>

      {/* Search */}
      <div className="border-b border-surface-warm px-3 py-2">
        <input
          type="text"
          placeholder="Search gear..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-1.5 text-xs text-slate-text placeholder:text-gray-400 focus:border-copper focus:outline-none focus:ring-1 focus:ring-copper/20"
        />
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1 border-b border-surface-warm px-3 py-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
            filter === "all"
              ? "bg-copper text-white"
              : "bg-surface-warm text-muted hover:bg-gray-200"
          )}
        >
          All
        </button>
        {GEAR_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setFilter(cat.value)}
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors",
              filter === cat.value
                ? "bg-copper text-white"
                : "bg-surface-warm text-muted hover:bg-gray-200"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Items list */}
      <div className="custom-scrollbar flex-1 space-y-1 overflow-y-auto p-3">
        {sorted.length === 0 ? (
          <p className="py-8 text-center text-xs text-gray-400">
            {search ? "No matching gear" : "No gear items yet"}
          </p>
        ) : (
          sorted.map((item) => (
            <PackingItem
              key={item.id}
              gearItem={item}
              isPacked={packedGearIds.has(item.id)}
              dragId={`gear-${item.id}`}
            />
          ))
        )}
      </div>

      {/* Drop-back hint */}
      {isOver && (
        <div className="border-t border-red-200 bg-red-50 px-3 py-2 text-center text-xs font-medium text-red-600">
          Drop to remove from bag
        </div>
      )}
    </div>
  );
}

export { GearSidebar };
