"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { formatWeight } from "@/lib/utils";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "@/lib/constants";
import type { GearItem } from "@/types";

interface PackingItemProps {
  gearItem: GearItem;
  /** The packing_items.id if this item is already packed */
  packingId?: string;
  /** Whether this item has been packed somewhere */
  isPacked?: boolean;
  /** Drag ID — must be unique across the whole DndContext */
  dragId: string;
}

function PackingItem({ gearItem, packingId, isPacked, dragId }: PackingItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: dragId,
      data: {
        type: "gear-item",
        gearItem,
        packingId,
      },
    });

  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : undefined;

  const icon = CATEGORY_ICONS[gearItem.category] ?? "📦";
  const accentColor = CATEGORY_COLORS[gearItem.category] ?? "#6B7280";

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center gap-2.5 rounded-lg border bg-white px-3 py-2 text-sm transition-all select-none",
        "cursor-grab active:cursor-grabbing",
        "hover:shadow-sm hover:border-gray-300",
        isDragging && "opacity-30",
        isPacked && !packingId && "opacity-40"
      )}
    >
      {/* Category icon */}
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs"
        style={{ backgroundColor: accentColor + "18" }}
      >
        {icon}
      </span>

      {/* Name */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-slate-text">{gearItem.name}</p>
        {gearItem.brand && (
          <p className="truncate text-xs text-muted">{gearItem.brand}</p>
        )}
      </div>

      {/* Weight badge */}
      <span className="shrink-0 rounded-full bg-surface-warm px-2 py-0.5 text-xs font-medium text-muted">
        {formatWeight(gearItem.weight_grams)}
      </span>

      {/* Packed checkmark */}
      {isPacked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#22C55E"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="shrink-0"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </div>
  );
}

/** Render-only version for the DragOverlay (no dnd hooks). */
function PackingItemOverlay({ gearItem }: { gearItem: GearItem }) {
  const icon = CATEGORY_ICONS[gearItem.category] ?? "📦";
  const accentColor = CATEGORY_COLORS[gearItem.category] ?? "#6B7280";

  return (
    <div className="drag-overlay flex items-center gap-2.5 rounded-lg border border-copper/30 bg-white px-3 py-2 text-sm shadow-xl">
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs"
        style={{ backgroundColor: accentColor + "18" }}
      >
        {icon}
      </span>
      <span className="font-medium text-slate-text">{gearItem.name}</span>
      <span className="ml-auto shrink-0 rounded-full bg-surface-warm px-2 py-0.5 text-xs font-medium text-muted">
        {formatWeight(gearItem.weight_grams)}
      </span>
    </div>
  );
}

export { PackingItem, PackingItemOverlay };
