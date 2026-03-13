import type { BagPosition } from "@/types";

export interface BagTemplate {
  id: string;
  name: string;
  positions: BagPosition[];
  volumeMin: number; // ml
  volumeMax: number; // ml
  maxWeight: number; // grams
  shape: "cylinder" | "triangle" | "wedge" | "box" | "cage" | "slim";
}

export const BAG_TEMPLATES: BagTemplate[] = [
  {
    id: "handlebar-roll",
    name: "Handlebar Roll",
    positions: ["handlebar"],
    volumeMin: 11000,
    volumeMax: 16000,
    maxWeight: 3000,
    shape: "cylinder",
  },
  {
    id: "frame-bag-full",
    name: "Frame Bag (Full)",
    positions: ["frame"],
    volumeMin: 6000,
    volumeMax: 10000,
    maxWeight: 3000,
    shape: "triangle",
  },
  {
    id: "frame-bag-half",
    name: "Frame Bag (Half)",
    positions: ["frame"],
    volumeMin: 3000,
    volumeMax: 5000,
    maxWeight: 2000,
    shape: "triangle",
  },
  {
    id: "seat-pack-large",
    name: "Seat Pack (Large)",
    positions: ["seat"],
    volumeMin: 10000,
    volumeMax: 16000,
    maxWeight: 4000,
    shape: "wedge",
  },
  {
    id: "seat-pack-small",
    name: "Seat Pack (Small)",
    positions: ["seat"],
    volumeMin: 5000,
    volumeMax: 8000,
    maxWeight: 2500,
    shape: "wedge",
  },
  {
    id: "fork-cargo-cage",
    name: "Fork Cargo Cage",
    positions: ["fork-L", "fork-R"],
    volumeMin: 3000,
    volumeMax: 5000,
    maxWeight: 1500,
    shape: "cage",
  },
  {
    id: "top-tube-bag",
    name: "Top Tube Bag",
    positions: ["top-tube"],
    volumeMin: 500,
    volumeMax: 1000,
    maxWeight: 500,
    shape: "slim",
  },
  {
    id: "stem-bag",
    name: "Stem Bag",
    positions: ["stem"],
    volumeMin: 1000,
    volumeMax: 2000,
    maxWeight: 800,
    shape: "box",
  },
  {
    id: "rear-rack-panniers",
    name: "Rear Rack + Panniers",
    positions: ["rear-rack"],
    volumeMin: 30000,
    volumeMax: 50000,
    maxWeight: 12000,
    shape: "box",
  },
  {
    id: "front-rack",
    name: "Front Rack",
    positions: ["front-rack"],
    volumeMin: 15000,
    volumeMax: 30000,
    maxWeight: 8000,
    shape: "box",
  },
  {
    id: "downtube-bag",
    name: "Downtube Bag",
    positions: ["downtube"],
    volumeMin: 500,
    volumeMax: 1000,
    maxWeight: 500,
    shape: "slim",
  },
];

export function formatVolume(ml: number): string {
  return `${(ml / 1000).toFixed(0)}L`;
}
