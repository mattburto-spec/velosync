"use client";

import { formatWeight, capacityPercent, capacityColor } from "@/lib/utils";
import { CATEGORY_COLORS } from "@/lib/constants";
import { BAG_POSITIONS } from "@/lib/constants";
import type { BagSlot, PackingItem, Bike } from "@/types";

interface WeightSummaryProps {
  packingItems: PackingItem[];
  bagSlots: BagSlot[];
  bike: Bike | null;
}

function WeightSummary({ packingItems, bagSlots, bike }: WeightSummaryProps) {
  const totalPacked = packingItems.reduce(
    (sum, item) => sum + (item.gear_item?.weight_grams ?? 0) * (item.quantity ?? 1),
    0
  );
  const bikeWeight = bike?.weight_grams ?? 0;
  const grandTotal = totalPacked + bikeWeight;

  // Per-bag breakdown
  const bagWeights = bagSlots.map((slot) => {
    const items = packingItems.filter((pi) => pi.bag_slot_id === slot.id);
    const weight = items.reduce(
      (sum, item) => sum + (item.gear_item?.weight_grams ?? 0) * (item.quantity ?? 1),
      0
    );
    const positionLabel =
      BAG_POSITIONS.find((p) => p.value === slot.position)?.label ?? slot.position;
    return { slot, weight, positionLabel };
  });

  // Unassigned items weight
  const unassignedWeight = packingItems
    .filter((pi) => !pi.bag_slot_id)
    .reduce(
      (sum, item) => sum + (item.gear_item?.weight_grams ?? 0) * (item.quantity ?? 1),
      0
    );

  // Position-based colors for visual variety
  const slotColors = Object.values(CATEGORY_COLORS);

  return (
    <div className="flex items-center gap-6 overflow-x-auto rounded-xl border border-surface-warm bg-white px-5 py-3">
      {/* Total packed */}
      <div className="shrink-0">
        <p className="text-xs text-muted">Packed Gear</p>
        <p className="text-lg font-bold text-slate-text">
          {formatWeight(totalPacked)}
        </p>
      </div>

      {/* Bike weight */}
      {bikeWeight > 0 && (
        <>
          <div className="h-8 w-px shrink-0 bg-gray-200" />
          <div className="shrink-0">
            <p className="text-xs text-muted">Bike</p>
            <p className="text-lg font-bold text-muted">
              {formatWeight(bikeWeight)}
            </p>
          </div>
        </>
      )}

      {/* Grand total */}
      <div className="h-8 w-px shrink-0 bg-gray-200" />
      <div className="shrink-0">
        <p className="text-xs text-muted">Grand Total</p>
        <p className="text-lg font-bold text-copper">
          {formatWeight(grandTotal)}
        </p>
      </div>

      {/* Bag breakdown */}
      {bagWeights.length > 0 && (
        <>
          <div className="h-8 w-px shrink-0 bg-gray-200" />
          <div className="flex items-center gap-3 overflow-x-auto">
            {bagWeights.map((bw, idx) => {
              const pct = capacityPercent(
                bw.weight,
                bw.slot.max_weight_grams
              );
              const color = bw.slot.max_weight_grams
                ? capacityColor(pct)
                : slotColors[idx % slotColors.length];
              return (
                <div key={bw.slot.id} className="shrink-0">
                  <p className="text-[10px] text-muted truncate max-w-[80px]">
                    {bw.slot.name}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5">
                    <div className="h-2 w-12 overflow-hidden rounded-full bg-gray-200">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: bw.slot.max_weight_grams
                            ? `${pct}%`
                            : bw.weight > 0
                              ? "100%"
                              : "0%",
                          backgroundColor: color,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-medium text-muted">
                      {formatWeight(bw.weight)}
                    </span>
                  </div>
                </div>
              );
            })}
            {unassignedWeight > 0 && (
              <div className="shrink-0">
                <p className="text-[10px] text-muted">Unassigned</p>
                <div className="mt-0.5 flex items-center gap-1.5">
                  <div className="h-2 w-12 overflow-hidden rounded-full bg-gray-200">
                    <div
                      className="h-full rounded-full bg-gray-400"
                      style={{ width: "100%" }}
                    />
                  </div>
                  <span className="text-[10px] font-medium text-muted">
                    {formatWeight(unassignedWeight)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export { WeightSummary };
