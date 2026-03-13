import { getAnthropicClient } from "./anthropic";
import type { Trip, GearItem, PackingItem } from "@/types";

// ----- Input / Output types -----

interface SuggestPackingInput {
  trip: Trip;
  gearInventory: GearItem[];
  existingPacking: PackingItem[];
}

export interface SuggestedItem {
  gearItemId: string;
  reason: string;
  priority: "essential" | "recommended" | "optional";
}

export interface MissingGear {
  name: string;
  category: string;
  reason: string;
}

export interface PackingSuggestion {
  suggestedItems: SuggestedItem[];
  missingGear: MissingGear[];
  tips: string[];
}

// ----- Tool schema for structured output -----

const packingSuggestionTool = {
  name: "provide_packing_suggestions" as const,
  description:
    "Provide structured bikepacking packing suggestions based on trip details and the rider's gear inventory.",
  input_schema: {
    type: "object" as const,
    properties: {
      suggestedItems: {
        type: "array" as const,
        description:
          "Items from the rider's existing gear inventory that should be packed for this trip.",
        items: {
          type: "object" as const,
          properties: {
            gearItemId: {
              type: "string" as const,
              description: "The ID of the gear item from the inventory.",
            },
            reason: {
              type: "string" as const,
              description:
                "Why this item is recommended for this specific trip.",
            },
            priority: {
              type: "string" as const,
              enum: ["essential", "recommended", "optional"],
              description: "How important this item is for the trip.",
            },
          },
          required: ["gearItemId", "reason", "priority"],
        },
      },
      missingGear: {
        type: "array" as const,
        description:
          "Gear the rider does NOT own but should consider acquiring for this trip.",
        items: {
          type: "object" as const,
          properties: {
            name: {
              type: "string" as const,
              description: "Name of the missing gear item.",
            },
            category: {
              type: "string" as const,
              description: "Category (shelter, sleep, cook, clothing, tools, electronics, hydration, food, misc).",
            },
            reason: {
              type: "string" as const,
              description: "Why this item is needed for the trip.",
            },
          },
          required: ["name", "category", "reason"],
        },
      },
      tips: {
        type: "array" as const,
        description:
          "General bikepacking tips specific to this trip's conditions.",
        items: { type: "string" as const },
      },
    },
    required: ["suggestedItems", "missingGear", "tips"],
  },
};

// ----- Main function -----

export async function generatePackingSuggestion(
  params: SuggestPackingInput
): Promise<PackingSuggestion> {
  const client = getAnthropicClient();
  if (!client) {
    throw new Error("AI features are not configured. Missing ANTHROPIC_API_KEY.");
  }

  const { trip, gearInventory, existingPacking } = params;

  // Build a compact representation of the rider's gear
  const inventoryList = gearInventory
    .map(
      (g) =>
        `- [${g.id}] ${g.name} (${g.category}${g.brand ? `, ${g.brand}` : ""}${g.weight_grams ? `, ${g.weight_grams}g` : ""})`
    )
    .join("\n");

  // What's already packed
  const packedIds = new Set(existingPacking.map((p) => p.gear_item_id));
  const packedList = existingPacking
    .map((p) => {
      const gear = gearInventory.find((g) => g.id === p.gear_item_id);
      return gear
        ? `- ${gear.name} (${gear.category})`
        : `- Unknown item (${p.gear_item_id})`;
    })
    .join("\n");

  // Trip duration
  let durationDays: string = "unknown";
  if (trip.start_date && trip.end_date) {
    const diff = Math.ceil(
      (new Date(trip.end_date).getTime() - new Date(trip.start_date).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    durationDays = `${diff} days`;
  }

  const systemPrompt = `You are an expert bikepacking gear advisor with deep knowledge of:
- Climate-appropriate gear selection (layering systems, rain gear, cold weather essentials)
- Terrain-specific needs (extra tools and tubes for singletrack, comprehensive repair kits for remote touring)
- Duration-based food and fuel calculations (calories per day, stove fuel estimates)
- Ultralight principles (multi-use items, weight savings without sacrificing safety)
- Redundancy avoidance (don't pack two items that serve the same purpose)
- Safety essentials (first aid, emergency shelter, visibility, navigation)
- Bikepacking bag constraints (volume limitations, weight distribution for handling)

When suggesting items, prioritize safety essentials first, then comfort, then nice-to-haves.
Only suggest items from the rider's existing inventory (using their gear IDs) for suggestedItems.
For missingGear, recommend items they don't own but would significantly improve the trip.
Keep tips actionable and specific to the trip conditions.`;

  const userPrompt = `Analyse this bikepacking trip and suggest what to pack.

TRIP DETAILS:
- Name: ${trip.name}
- Destination: ${trip.destination ?? "Not specified"}
- Duration: ${durationDays}
- Distance: ${trip.distance_km ? `${trip.distance_km} km` : "Not specified"}
- Terrain: ${trip.terrain ?? "Not specified"}
- Climate: ${trip.climate ?? "Not specified"}
- Conditions: ${trip.expected_conditions ?? "Not specified"}
- Description: ${trip.description ?? "None"}

RIDER'S GEAR INVENTORY (available items):
${inventoryList || "No gear in inventory."}

ALREADY PACKED:
${packedList || "Nothing packed yet."}

Please suggest additional items from the inventory that should be packed (excluding already-packed items), identify critical missing gear the rider should acquire, and provide trip-specific tips.`;

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: systemPrompt,
    tools: [packingSuggestionTool],
    tool_choice: { type: "tool", name: "provide_packing_suggestions" },
    messages: [{ role: "user", content: userPrompt }],
  });

  // Extract the tool use result
  const toolBlock = response.content.find((b) => b.type === "tool_use");
  if (!toolBlock || toolBlock.type !== "tool_use") {
    throw new Error("AI did not return structured suggestions.");
  }

  const result = toolBlock.input as PackingSuggestion;

  // Filter out any suggested items that are already packed
  result.suggestedItems = result.suggestedItems.filter(
    (item) => !packedIds.has(item.gearItemId)
  );

  return result;
}
