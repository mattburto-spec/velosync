"use client";

import type { PlacedBag, LoadoutItem } from "@/hooks/useLoadoutState";
import { BagShape } from "./BagShapes";
import { GROUP_COLORS } from "./bag-positions";
import { HOTSPOT_POSITIONS } from "./bag-positions";
import { CATEGORY_COLORS } from "@/lib/constants";

interface BagInspectorProps {
  bag: PlacedBag;
  items: LoadoutItem[];
  bagWeight: number;
  onClose: () => void;
  onRemoveBag: (bagId: string) => void;
  onUnpackItem: (itemId: string) => void;
}

export function BagInspector({
  bag,
  items,
  bagWeight,
  onClose,
  onRemoveBag,
  onUnpackItem,
}: BagInspectorProps) {
  const hotspot = HOTSPOT_POSITIONS[bag.position];
  const groupColor = hotspot ? GROUP_COLORS[hotspot.group] : "#C8553D";
  const weightPct = bag.maxWeight > 0 ? Math.min((bagWeight / bag.maxWeight) * 100, 100) : 0;
  const isOverweight = bagWeight > bag.maxWeight;

  return (
    <div className="absolute top-0 right-0 h-full w-[300px] bg-[#0D1321] border-l border-white/5 flex flex-col animate-[slide-in-right_0.2s_ease-out] z-20">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/5 flex items-center gap-3">
        <BagShape shape={bag.shape} color={groupColor} opacity={0.7} size={32} />
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-white/80 truncate">{bag.name}</div>
          <div className="text-[10px] text-white/30">{hotspot?.label ?? bag.position}</div>
        </div>
        <button
          onClick={onClose}
          className="text-white/30 hover:text-white/60 transition-colors p-1"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>

      {/* Weight bar */}
      <div className="px-4 py-3 border-b border-white/5">
        <div className="flex justify-between text-[10px] mb-1">
          <span className="text-white/40">Weight</span>
          <span className={isOverweight ? "text-red-400" : "text-white/50"}>
            {(bagWeight / 1000).toFixed(1)} / {(bag.maxWeight / 1000).toFixed(1)} kg
          </span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{
              width: `${weightPct}%`,
              backgroundColor: isOverweight ? "#EF4444" : groupColor,
            }}
          />
        </div>
      </div>

      {/* Items list */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {items.length === 0 && (
          <p className="text-[10px] text-white/20 text-center py-8">
            Drag gear items here to pack them
          </p>
        )}
        {items.map((item) => {
          const catColor = CATEGORY_COLORS[item.gearItem.category] || "#9CA3AF";
          return (
            <div
              key={item.id}
              className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/[0.02] hover:bg-white/[0.04] group"
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: catColor }}
              />
              <span className="text-[11px] text-white/60 flex-1 truncate">
                {item.gearItem.name}
              </span>
              <span className="text-[9px] text-white/25 tabular-nums">
                {item.gearItem.weight_grams ?? 0}g
              </span>
              <button
                onClick={() => onUnpackItem(item.id)}
                className="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 transition-all p-0.5"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 3l6 6M9 3l-6 6" />
                </svg>
              </button>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="px-4 py-3 border-t border-white/5 space-y-2">
        <button
          onClick={() => onRemoveBag(bag.id)}
          className="w-full text-[11px] text-red-400/70 hover:text-red-400 hover:bg-red-400/5 rounded-md py-1.5 transition-colors"
        >
          Remove Bag
        </button>
      </div>
    </div>
  );
}
