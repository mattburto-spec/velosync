"use client";

import type { PlacedBag, LoadoutItem } from "@/hooks/useLoadoutState";
import { GROUP_COLORS } from "./bag-positions";

interface StatsHUDProps {
  placedBags: PlacedBag[];
  packedItems: LoadoutItem[];
  totalWeight: number;
}

export function StatsHUD({ placedBags, packedItems, totalWeight }: StatsHUDProps) {
  const frontPositions = ["handlebar", "fork-L", "fork-R", "front-rack", "stem"];
  const rearPositions = ["seat", "rear-rack"];

  const getGroupWeight = (positions: string[]) =>
    packedItems
      .filter((i) => {
        const bag = placedBags.find((b) => b.id === i.bagId);
        return bag && positions.includes(bag.position);
      })
      .reduce((sum, i) => sum + (i.gearItem.weight_grams ?? 0), 0);

  const frontWeight = getGroupWeight(frontPositions);
  const rearWeight = getGroupWeight(rearPositions);
  const centerWeight = totalWeight - frontWeight - rearWeight;

  const frontPct = totalWeight > 0 ? Math.round((frontWeight / totalWeight) * 100) : 0;
  const rearPct = totalWeight > 0 ? Math.round((rearWeight / totalWeight) * 100) : 0;
  const centerPct = totalWeight > 0 ? 100 - frontPct - rearPct : 0;

  if (placedBags.length === 0 && packedItems.length === 0) return null;

  return (
    <div className="absolute bottom-4 left-4 bg-midnight/60 backdrop-blur-xl rounded-2xl border border-white/[0.04] px-5 py-4 min-w-[170px] shadow-2xl">
      {/* Total weight — big number */}
      <div className="text-center mb-3">
        <div className="text-3xl font-display font-bold text-white/90 tabular-nums tracking-tight leading-none">
          {(totalWeight / 1000).toFixed(1)}
        </div>
        <div className="text-[9px] text-white/25 uppercase tracking-[0.15em] mt-1 font-medium">
          kg gear weight
        </div>
      </div>

      {/* Distribution bars */}
      {totalWeight > 0 && (
        <div className="space-y-1.5 mb-3">
          <DistRow label="Front" color={GROUP_COLORS.front} pct={frontPct} weight={frontWeight} />
          <DistRow label="Center" color={GROUP_COLORS.center} pct={centerPct} weight={centerWeight} />
          <DistRow label="Rear" color={GROUP_COLORS.rear} pct={rearPct} weight={rearWeight} />

          {/* Stacked bar */}
          <div className="h-1.5 flex rounded-full overflow-hidden mt-2 bg-white/[0.03]">
            {frontPct > 0 && (
              <div
                className="transition-all duration-500 ease-out"
                style={{ width: `${frontPct}%`, backgroundColor: GROUP_COLORS.front }}
              />
            )}
            {centerPct > 0 && (
              <div
                className="transition-all duration-500 ease-out"
                style={{ width: `${centerPct}%`, backgroundColor: GROUP_COLORS.center }}
              />
            )}
            {rearPct > 0 && (
              <div
                className="transition-all duration-500 ease-out"
                style={{ width: `${rearPct}%`, backgroundColor: GROUP_COLORS.rear }}
              />
            )}
          </div>
        </div>
      )}

      {/* Bag/item counts */}
      <div className="flex items-center justify-around pt-2 border-t border-white/[0.04]">
        <div className="text-center">
          <div className="text-sm font-display font-semibold text-white/70 tabular-nums">
            {placedBags.length}
          </div>
          <div className="text-[8px] text-white/20 uppercase tracking-wider">bags</div>
        </div>
        <div className="w-px h-6 bg-white/[0.04]" />
        <div className="text-center">
          <div className="text-sm font-display font-semibold text-white/70 tabular-nums">
            {packedItems.length}
          </div>
          <div className="text-[8px] text-white/20 uppercase tracking-wider">items</div>
        </div>
      </div>
    </div>
  );
}

function DistRow({ label, color, pct, weight }: { label: string; color: string; pct: number; weight: number }) {
  return (
    <div className="flex items-center gap-2 text-[9px]">
      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
      <span className="text-white/35 w-10">{label}</span>
      <span className="text-white/50 flex-1 text-right tabular-nums font-medium">
        {(weight / 1000).toFixed(1)}kg
      </span>
      <span className="text-white/25 w-7 text-right tabular-nums">{pct}%</span>
    </div>
  );
}
