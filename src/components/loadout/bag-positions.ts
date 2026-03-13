import type { BagPosition } from "@/types";

export interface HotspotPosition {
  x: string; // CSS percentage
  y: string;
  w: string;
  h: string;
  label: string;
  group: "front" | "center" | "rear";
}

/**
 * Percentage-based positions for bag hotspots overlaid on the bike SVG.
 * Coordinates are relative to the SVG container.
 */
export const HOTSPOT_POSITIONS: Record<BagPosition, HotspotPosition> = {
  handlebar: { x: "8%", y: "14%", w: "15%", h: "24%", label: "Handlebar", group: "front" },
  stem: { x: "20%", y: "12%", w: "9%", h: "14%", label: "Stem", group: "front" },
  "top-tube": { x: "30%", y: "16%", w: "18%", h: "10%", label: "Top Tube", group: "center" },
  frame: { x: "28%", y: "26%", w: "22%", h: "30%", label: "Frame", group: "center" },
  downtube: { x: "24%", y: "50%", w: "18%", h: "10%", label: "Downtube", group: "center" },
  seat: { x: "52%", y: "4%", w: "16%", h: "32%", label: "Seat Pack", group: "rear" },
  "rear-rack": { x: "62%", y: "22%", w: "18%", h: "26%", label: "Rear Rack", group: "rear" },
  "front-rack": { x: "4%", y: "36%", w: "16%", h: "22%", label: "Front Rack", group: "front" },
  "fork-L": { x: "6%", y: "38%", w: "12%", h: "26%", label: "Fork (L)", group: "front" },
  "fork-R": { x: "6%", y: "38%", w: "12%", h: "26%", label: "Fork (R)", group: "front" },
};

export const GROUP_COLORS: Record<string, string> = {
  front: "#5B8FB9", // steel
  center: "#D4A574", // sand
  rear: "#C8553D", // copper
};
