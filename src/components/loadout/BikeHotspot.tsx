"use client";

import { useDroppable } from "@dnd-kit/core";
import type { PlacedBag } from "@/hooks/useLoadoutState";
import type { HotspotPosition } from "./bag-positions";
import { BagShape } from "./BagShapes";
import { GROUP_COLORS } from "./bag-positions";

interface BikeHotspotProps {
  positionKey: string;
  hotspot: HotspotPosition;
  placedBag: PlacedBag | null;
  bagWeight: number;
  isDraggingBag: boolean;
  isDraggingGear?: boolean;
  onClick: () => void;
}

export function BikeHotspot({
  positionKey,
  hotspot,
  placedBag,
  bagWeight,
  isDraggingBag,
  isDraggingGear,
  onClick,
}: BikeHotspotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `hotspot-${positionKey}`,
    data: { type: "hotspot", position: positionKey, bagId: placedBag?.id ?? null },
  });

  const groupColor = GROUP_COLORS[hotspot.group];
  const isEmpty = !placedBag;
  const showBagDropzone = isDraggingBag && isEmpty;
  const showGearDropzone = isDraggingGear && placedBag;

  return (
    <div
      ref={setNodeRef}
      onClick={onClick}
      className="absolute flex items-center justify-center transition-all duration-200"
      style={{
        left: hotspot.x,
        top: hotspot.y,
        width: hotspot.w,
        height: hotspot.h,
        cursor: placedBag ? "pointer" : isDraggingBag ? "copy" : "default",
      }}
    >
      <div
        className={`
          w-full h-full rounded-lg flex flex-col items-center justify-center gap-1
          transition-all duration-200 ease-out
          ${isEmpty && !showBagDropzone ? "border border-dashed border-white/[0.06]" : ""}
          ${showBagDropzone && !isOver ? "border-2 border-dashed border-white/20 bg-white/[0.03] animate-[hotspot-pulse_2s_ease-in-out_infinite]" : ""}
          ${showBagDropzone && isOver ? "border-2 border-copper/60 bg-copper/10 scale-[1.06] shadow-[0_0_20px_rgba(200,85,61,0.15)]" : ""}
          ${showGearDropzone && isOver ? "ring-2 ring-copper/40 bg-copper/[0.06] scale-[1.04]" : ""}
          ${placedBag && !showGearDropzone ? "border-0" : ""}
          ${placedBag && showGearDropzone && !isOver ? "ring-1 ring-white/10 bg-white/[0.02]" : ""}
        `}
      >
        {isEmpty && (
          <span className={`text-[8px] font-medium text-center leading-tight px-1 transition-colors duration-200 ${
            showBagDropzone ? "text-white/30" : "text-white/[0.12]"
          }`}>
            {hotspot.label}
          </span>
        )}

        {placedBag && (
          <div className="flex flex-col items-center gap-0.5 group animate-[bag-placed_0.3s_ease-out]">
            <div className="transition-transform duration-200 group-hover:scale-110">
              <BagShape
                shape={placedBag.shape}
                color={groupColor}
                opacity={0.75}
                size={Math.min(parseInt(hotspot.w) * 0.6, 38)}
              />
            </div>
            <span className={`text-[8px] font-semibold tabular-nums transition-all duration-200 ${
              bagWeight > 0
                ? "text-white/60 group-hover:text-white/80"
                : "text-white/30 group-hover:text-white/50"
            }`}>
              {bagWeight > 0 ? `${(bagWeight / 1000).toFixed(1)}kg` : placedBag.name.split(" ")[0]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
