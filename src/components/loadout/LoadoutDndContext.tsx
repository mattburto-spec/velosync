"use client";

import { DndContext, DragOverlay, useSensor, useSensors, PointerSensor, type DragStartEvent, type DragEndEvent } from "@dnd-kit/core";
import type { ReactNode } from "react";
import type { BagTemplate } from "./bag-templates";
import type { GearItem, BagPosition } from "@/types";
import type { ActiveDragType } from "@/hooks/useLoadoutState";
import { BagShape } from "./BagShapes";
import { CATEGORY_COLORS, CATEGORY_ICONS } from "@/lib/constants";

interface LoadoutDndContextProps {
  children: ReactNode;
  onPlaceBag: (template: BagTemplate, position: BagPosition) => void;
  onPackItem: (gearItem: GearItem, bagId: string) => void;
  onSetActiveDrag: (drag: ActiveDragType) => void;
  activeDrag: ActiveDragType;
}

export function LoadoutDndContext({
  children,
  onPlaceBag,
  onPackItem,
  onSetActiveDrag,
  activeDrag,
}: LoadoutDndContextProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current;
    if (data?.type === "bag-template") {
      onSetActiveDrag({ kind: "bag-template", template: data.template });
    } else if (data?.type === "gear-item") {
      onSetActiveDrag({ kind: "gear-item", gearItem: data.gearItem });
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over) {
      const activeData = active.data.current;
      const overData = over.data.current;

      // Bag template → hotspot
      if (activeData?.type === "bag-template" && overData?.type === "hotspot") {
        onPlaceBag(activeData.template, overData.position as BagPosition);
      }

      // Gear item → placed bag (hotspot with a bag)
      if (activeData?.type === "gear-item" && overData?.type === "hotspot" && overData?.bagId) {
        onPackItem(activeData.gearItem, overData.bagId);
      }
    }

    onSetActiveDrag(null);
  }

  function handleDragCancel() {
    onSetActiveDrag(null);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {activeDrag?.kind === "bag-template" && (
          <div className="bg-midnight/90 border border-copper/30 rounded-lg px-3 py-2 flex items-center gap-2 shadow-xl">
            <BagShape shape={activeDrag.template.shape} color="#C8553D" opacity={0.7} size={28} />
            <span className="text-[11px] text-white/70 font-medium">
              {activeDrag.template.name}
            </span>
          </div>
        )}
        {activeDrag?.kind === "gear-item" && (
          <div className="bg-midnight/90 border border-white/10 rounded-lg px-3 py-2 flex items-center gap-2 shadow-xl">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[activeDrag.gearItem.category] || "#9CA3AF" }}
            />
            <span className="text-[11px] text-white/70">
              {activeDrag.gearItem.name}
            </span>
            <span className="text-[9px] text-white/30 tabular-nums">
              {activeDrag.gearItem.weight_grams ?? 0}g
            </span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
