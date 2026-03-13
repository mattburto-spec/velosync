"use client";

import { useState, useId, useCallback } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { GearSidebar } from "./GearSidebar";
import { BagDropZone } from "./BagDropZone";
import { WeightSummary } from "./WeightSummary";
import { PackingItemOverlay } from "./PackingItem";
import type {
  GearItem,
  Bike,
  BagSlot,
  PackingItem as PackingItemType,
} from "@/types";

interface PackingWorkspaceProps {
  tripId: string;
  gearItems: GearItem[];
  bikes: Bike[];
  packingItems: PackingItemType[];
}

function PackingWorkspace({
  tripId,
  gearItems,
  bikes,
  packingItems: initialItems,
}: PackingWorkspaceProps) {
  const dndId = useId();
  const [packingItems, setPackingItems] = useState<PackingItemType[]>(initialItems);
  const [activeDragItem, setActiveDragItem] = useState<GearItem | null>(null);
  const [selectedBikeId, setSelectedBikeId] = useState<string>(
    bikes[0]?.id ?? ""
  );

  const selectedBike = bikes.find((b) => b.id === selectedBikeId) ?? null;
  const bagSlots = selectedBike?.bag_slots ?? [];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor)
  );

  // ---- Drag handlers ----

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current;
    if (data?.gearItem) {
      setActiveDragItem(data.gearItem as GearItem);
    }
  }

  const handleDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setActiveDragItem(null);

      const { active, over } = event;
      if (!over) return;

      const activeData = active.data.current;
      const overData = over.data.current;
      if (!activeData) return;

      const gearItem = activeData.gearItem as GearItem;
      const packingId = activeData.packingId as string | undefined;
      const isFromSidebar = !packingId;

      // --- Dropped on sidebar => remove from packing ---
      if (overData?.type === "sidebar") {
        if (packingId) {
          // Optimistic remove
          setPackingItems((prev) => prev.filter((pi) => pi.id !== packingId));
          await fetch(`/api/packing?id=${packingId}`, { method: "DELETE" });
        }
        return;
      }

      // --- Dropped on a bag slot ---
      if (overData?.type === "bag-slot") {
        const targetBagSlotId = overData.bagSlotId as string;

        if (isFromSidebar) {
          // Check if already packed
          const alreadyPacked = packingItems.some(
            (pi) => pi.gear_item_id === gearItem.id
          );
          if (alreadyPacked) return;

          // Add to packing list
          try {
            const res = await fetch("/api/packing", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                trip_id: tripId,
                gear_item_id: gearItem.id,
                bag_slot_id: targetBagSlotId,
                is_shared: false,
              }),
            });

            if (res.ok) {
              const newItem = await res.json();
              setPackingItems((prev) => [...prev, newItem]);
            }
          } catch {
            // Silently fail
          }
        } else {
          // Move between bags — optimistic update
          setPackingItems((prev) =>
            prev.map((pi) =>
              pi.id === packingId
                ? { ...pi, bag_slot_id: targetBagSlotId }
                : pi
            )
          );

          await fetch("/api/packing", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: packingId,
              bag_slot_id: targetBagSlotId,
            }),
          });
        }
      }
    },
    [tripId, packingItems]
  );

  return (
    <DndContext
      id={dndId}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex h-full flex-col">
        {/* Main area */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left sidebar — gear inventory */}
          <GearSidebar gearItems={gearItems} packingItems={packingItems} />

          {/* Center — bag slots */}
          <div className="flex-1 overflow-y-auto bg-[#F9FAFB] p-6">
            {/* Bike selector */}
            {bikes.length > 0 && (
              <div className="mb-6 flex items-center gap-3">
                <label className="text-sm font-medium text-slate-text">
                  Bike:
                </label>
                <select
                  value={selectedBikeId}
                  onChange={(e) => setSelectedBikeId(e.target.value)}
                  className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-slate-text focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                >
                  {bikes.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name}
                      {b.brand ? ` (${b.brand})` : ""}
                    </option>
                  ))}
                </select>
                {selectedBike?.type && (
                  <span className="text-xs text-muted capitalize">
                    {selectedBike.type}
                  </span>
                )}
              </div>
            )}

            {/* Bag slots grid */}
            {bagSlots.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {bagSlots.map((slot) => {
                  const slotItems = packingItems.filter(
                    (pi) => pi.bag_slot_id === slot.id
                  );
                  return (
                    <BagDropZone
                      key={slot.id}
                      bagSlot={slot}
                      items={slotItems}
                    />
                  );
                })}
              </div>
            ) : bikes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mb-3 text-gray-300"
                >
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
                </svg>
                <p className="text-sm font-medium text-slate-text">
                  No bikes set up
                </p>
                <p className="mt-1 text-xs text-muted">
                  Add a bike in the Garage to start packing gear into bags.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm font-medium text-slate-text">
                  No bag slots on this bike
                </p>
                <p className="mt-1 text-xs text-muted">
                  Add bags to your bike in the Garage to create drop zones.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom bar — weight summary */}
        <div className="shrink-0 border-t border-surface-warm bg-gray-50 px-4 py-3">
          <WeightSummary
            packingItems={packingItems}
            bagSlots={bagSlots}
            bike={selectedBike}
          />
        </div>
      </div>

      {/* Drag overlay */}
      <DragOverlay dropAnimation={null}>
        {activeDragItem ? (
          <PackingItemOverlay gearItem={activeDragItem} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

export { PackingWorkspace };
