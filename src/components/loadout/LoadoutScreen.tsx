"use client";

import { useState, useEffect } from "react";
import { useLoadoutState } from "@/hooks/useLoadoutState";
import { LoadoutDndContext } from "./LoadoutDndContext";
import { BagTemplatePanel } from "./BagTemplatePanel";
import { GearPanel } from "./GearPanel";
import { BikeIllustration } from "./BikeIllustration";
import { BikeHotspot } from "./BikeHotspot";
import { BagInspector } from "./BagInspector";
import { StatsHUD } from "./StatsHUD";
import { HOTSPOT_POSITIONS } from "./bag-positions";
import type { BagPosition } from "@/types";

/* ──────────────────────────────────────────────────────────
 * Swappable background scenes.
 * To add a real photo/video background later, add a new entry
 * with a bgClass that references a CSS background-image.
 * ────────────────────────────────────────────────────────── */
export interface LoadoutScene {
  id: string;
  name: string;
  icon: string;
  bgClass: string;
  bikeFilter?: string;
  ambientColor: string;
}

export const LOADOUT_SCENES: LoadoutScene[] = [
  {
    id: "workshop",
    name: "Workshop",
    icon: "\u{1F527}",
    bgClass: "loadout-bg-workshop",
    ambientColor: "rgba(200, 165, 116, 0.06)",
  },
  {
    id: "trail",
    name: "Trail",
    icon: "\u{1F332}",
    bgClass: "loadout-bg-trail",
    bikeFilter: "drop-shadow(0 0 40px rgba(107, 143, 113, 0.1))",
    ambientColor: "rgba(107, 143, 113, 0.06)",
  },
  {
    id: "night",
    name: "Night Ride",
    icon: "\u{1F319}",
    bgClass: "loadout-bg-night",
    bikeFilter: "drop-shadow(0 0 30px rgba(91, 143, 185, 0.15))",
    ambientColor: "rgba(91, 143, 185, 0.08)",
  },
  {
    id: "minimal",
    name: "Clean",
    icon: "\u25FB\uFE0F",
    bgClass: "loadout-bg-minimal",
    ambientColor: "rgba(255, 255, 255, 0.03)",
  },
];

interface LoadoutScreenProps {
  tripName?: string;
  onExit?: () => void;
}

export function LoadoutScreen({ tripName = "Trip", onExit }: LoadoutScreenProps) {
  const [mounted, setMounted] = useState(false);
  const [scene, setScene] = useState<LoadoutScene>(LOADOUT_SCENES[0]);
  const [bagsOpen, setBagsOpen] = useState(true);
  const [gearOpen, setGearOpen] = useState(true);

  useEffect(() => setMounted(true), []);

  const {
    state,
    placeBag,
    removeBag,
    packItem,
    unpackItem,
    setInspectedBag,
    setActiveDrag,
    clearAll,
    getBagItems,
    getBagWeight,
    totalWeight,
    packedGearIds,
  } = useLoadoutState();

  const isDraggingBag = state.activeDrag?.kind === "bag-template";
  const isDraggingGear = state.activeDrag?.kind === "gear-item";
  const inspectedBag = state.inspectedBagId
    ? state.placedBags.find((b) => b.id === state.inspectedBagId) ?? null
    : null;

  return (
    <div className="fixed inset-0 z-50 bg-midnight flex flex-col overflow-hidden select-none">
      {/* Header bar */}
      <header className="relative flex items-center justify-between px-5 py-2.5 border-b border-white/[0.04] bg-midnight/70 backdrop-blur-xl z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onExit}
            className="text-white/40 hover:text-white/80 transition-colors duration-200 p-1.5 -ml-1.5 rounded-lg hover:bg-white/5"
            aria-label="Back"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M13 4L7 10l6 6" />
            </svg>
          </button>
          <div>
            <h1 className="text-sm font-display font-semibold text-white/90 tracking-tight leading-tight">
              {tripName}
            </h1>
            <p className="text-[9px] text-white/20 font-medium tracking-widest uppercase">
              Loadout
            </p>
          </div>
        </div>

        {/* Scene picker */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-0.5 bg-white/[0.03] rounded-lg p-0.5 border border-white/[0.04]">
          {LOADOUT_SCENES.map((s) => (
            <button
              key={s.id}
              onClick={() => setScene(s)}
              className={`text-[10px] px-2.5 py-1 rounded-md transition-all duration-200 ${
                scene.id === s.id
                  ? "bg-white/10 text-white/80 shadow-sm"
                  : "text-white/25 hover:text-white/50 hover:bg-white/[0.03]"
              }`}
              title={s.name}
            >
              {s.icon}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setBagsOpen(!bagsOpen)}
            className={`text-[10px] px-2.5 py-1.5 rounded-md border transition-all duration-200 font-medium ${
              bagsOpen
                ? "border-copper/20 text-copper/80 bg-copper/5"
                : "border-white/[0.04] text-white/25 hover:text-white/50 hover:bg-white/[0.03]"
            }`}
          >
            Bags
          </button>
          <button
            onClick={() => setGearOpen(!gearOpen)}
            className={`text-[10px] px-2.5 py-1.5 rounded-md border transition-all duration-200 font-medium ${
              gearOpen
                ? "border-copper/20 text-copper/80 bg-copper/5"
                : "border-white/[0.04] text-white/25 hover:text-white/50 hover:bg-white/[0.03]"
            }`}
          >
            Gear
          </button>
          <div className="w-px h-4 bg-white/[0.04] mx-0.5" />
          <button
            onClick={clearAll}
            className="text-[10px] text-white/20 hover:text-red-400/70 px-2 py-1.5 rounded-md hover:bg-red-400/5 transition-all duration-200"
          >
            Clear
          </button>
        </div>
      </header>

      {/* Main canvas */}
      {!mounted ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
        </div>
      ) : (
        <LoadoutDndContext
          onPlaceBag={placeBag}
          onPackItem={packItem}
          onSetActiveDrag={setActiveDrag}
          activeDrag={state.activeDrag}
        >
          <div className="flex-1 flex overflow-hidden relative">
            {/* Left drawer */}
            <div
              className={`flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
                bagsOpen ? "w-[200px]" : "w-0"
              }`}
            >
              <BagTemplatePanel className="w-[200px] h-full" />
            </div>

            {/* Center canvas */}
            <div className={`flex-1 relative flex items-center justify-center overflow-hidden transition-all duration-700 ${scene.bgClass}`}>
              {/* Ambient glow */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse 60% 50% at 50% 58%, ${scene.ambientColor}, transparent)`,
                }}
              />

              {/* Subtle grid */}
              <div className="absolute inset-0 pointer-events-none loadout-grid" />

              {/* Floor reflection */}
              <div className="absolute bottom-[18%] left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent pointer-events-none" />

              {/* Bike + hotspots */}
              <div
                className="relative w-full max-w-[820px] aspect-[2/1] transition-[filter] duration-500"
                style={{ filter: scene.bikeFilter || "none" }}
              >
                <BikeIllustration className="w-full h-full" />

                {(Object.entries(HOTSPOT_POSITIONS) as [BagPosition, (typeof HOTSPOT_POSITIONS)[BagPosition]][]).map(
                  ([posKey, hotspot]) => {
                    const placedBag = state.placedBags.find((b) => b.position === posKey) ?? null;
                    return (
                      <BikeHotspot
                        key={posKey}
                        positionKey={posKey}
                        hotspot={hotspot}
                        placedBag={placedBag}
                        bagWeight={placedBag ? getBagWeight(placedBag.id) : 0}
                        isDraggingBag={isDraggingBag}
                        isDraggingGear={isDraggingGear}
                        onClick={() => {
                          if (placedBag) setInspectedBag(placedBag.id);
                        }}
                      />
                    );
                  }
                )}
              </div>

              {/* Stats HUD */}
              <StatsHUD
                placedBags={state.placedBags}
                packedItems={state.packedItems}
                totalWeight={totalWeight}
              />

              {/* Onboarding hint */}
              {state.placedBags.length === 0 && !state.activeDrag && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center loadout-hint">
                  <div className="flex items-center gap-2 bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-full px-4 py-2">
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-copper/50">
                      <path d="M8 4H6a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-2M14 2l4 4M10 10l7-7" strokeLinecap="round" />
                    </svg>
                    <span className="text-[11px] text-white/30 font-medium">
                      Drag bags onto the bike to start packing
                    </span>
                  </div>
                </div>
              )}

              {/* Bag Inspector */}
              {inspectedBag && (
                <BagInspector
                  bag={inspectedBag}
                  items={getBagItems(inspectedBag.id)}
                  bagWeight={getBagWeight(inspectedBag.id)}
                  onClose={() => setInspectedBag(null)}
                  onRemoveBag={removeBag}
                  onUnpackItem={unpackItem}
                />
              )}
            </div>

            {/* Right drawer */}
            <div
              className={`flex-shrink-0 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] overflow-hidden ${
                gearOpen ? "w-[280px]" : "w-0"
              }`}
            >
              <GearPanel packedGearIds={packedGearIds} className="w-[280px] h-full" />
            </div>
          </div>
        </LoadoutDndContext>
      )}
    </div>
  );
}
