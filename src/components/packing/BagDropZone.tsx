"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn, formatWeight, capacityPercent, capacityColor } from "@/lib/utils";
import { BAG_POSITIONS } from "@/lib/constants";
import { PackingItem } from "./PackingItem";
import type { BagSlot, PackingItem as PackingItemType } from "@/types";

interface BagDropZoneProps {
  bagSlot: BagSlot;
  items: PackingItemType[];
}

function BagDropZone({ bagSlot, items }: BagDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `bag-${bagSlot.id}`,
    data: {
      type: "bag-slot",
      bagSlotId: bagSlot.id,
    },
  });

  const currentWeight = items.reduce(
    (sum, item) => sum + (item.gear_item?.weight_grams ?? 0) * (item.quantity ?? 1),
    0
  );
  const weightPct = capacityPercent(currentWeight, bagSlot.max_weight_grams);
  const barColor = capacityColor(weightPct);

  const positionLabel =
    BAG_POSITIONS.find((p) => p.value === bagSlot.position)?.label ?? bagSlot.position;

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "rounded-xl border-2 border-dashed bg-gray-50/50 p-3 transition-all min-h-[120px]",
        isOver
          ? "border-copper bg-copper/5 shadow-inner"
          : "border-surface-warm hover:border-gray-300"
      )}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h4 className="text-sm font-semibold text-slate-text">{bagSlot.name}</h4>
          <p className="text-xs text-muted">{positionLabel}</p>
        </div>
        <span className="text-xs font-medium text-muted">
          {formatWeight(currentWeight)}
          {bagSlot.max_weight_grams
            ? ` / ${formatWeight(bagSlot.max_weight_grams)}`
            : ""}
        </span>
      </div>

      {/* Weight progress bar */}
      {bagSlot.max_weight_grams && (
        <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="capacity-bar h-full rounded-full transition-all"
            style={{
              width: `${weightPct}%`,
              backgroundColor: barColor,
            }}
          />
        </div>
      )}

      {/* Packed items */}
      {items.length > 0 ? (
        <div className="space-y-1.5">
          {items.map((item) => (
            <PackingItem
              key={item.id}
              gearItem={item.gear_item!}
              packingId={item.id}
              dragId={`packed-${item.id}`}
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center py-4">
          <p className={cn(
            "text-xs",
            isOver ? "text-copper font-medium" : "text-gray-400"
          )}>
            {isOver ? "Drop here" : "Drag gear here"}
          </p>
        </div>
      )}
    </div>
  );
}

export { BagDropZone };
