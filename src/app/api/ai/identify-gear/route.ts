import { getAnthropicClient } from "@/lib/ai/anthropic";
import { NextResponse } from "next/server";

export interface GearIdentification {
  name: string;
  brand: string;
  category: string;
  weight_grams: number;
  confidence: "high" | "medium" | "low";
  description: string;
  image_search_term: string;
}

const identifyGearTool = {
  name: "identify_gear" as const,
  description:
    "Identify a bikepacking gear item and provide its properties including weight, brand, category, and description.",
  input_schema: {
    type: "object" as const,
    properties: {
      name: {
        type: "string" as const,
        description:
          "The proper product name (e.g. 'Hubba Hubba NX 2' not 'MSR tent'). Include model number if known.",
      },
      brand: {
        type: "string" as const,
        description:
          "The manufacturer brand (e.g. 'MSR', 'Big Agnes', 'Revelate Designs'). Use 'Generic' if unknown.",
      },
      category: {
        type: "string" as const,
        enum: [
          "shelter",
          "sleep",
          "cook",
          "clothing",
          "tools",
          "electronics",
          "hydration",
          "food",
          "misc",
        ],
        description: "The gear category that best fits this item.",
      },
      weight_grams: {
        type: "number" as const,
        description:
          "Estimated weight in grams. Be as accurate as possible for known products.",
      },
      confidence: {
        type: "string" as const,
        enum: ["high", "medium", "low"],
        description:
          "Confidence in the identification. 'high' = recognized product, 'medium' = similar product category, 'low' = rough guess.",
      },
      description: {
        type: "string" as const,
        description:
          "A brief 1-sentence description of the item (e.g. '2-person ultralight freestanding tent').",
      },
      image_search_term: {
        type: "string" as const,
        description:
          "A precise search term for finding a product photo (e.g. 'MSR Hubba Hubba NX 2 tent' or 'Nemo Tensor Ultralight sleeping pad'). Include brand, model, and product type.",
      },
    },
    required: [
      "name",
      "brand",
      "category",
      "weight_grams",
      "confidence",
      "description",
      "image_search_term",
    ],
  },
};

export async function POST(request: Request) {
  try {
    const { query } = await request.json();

    if (!query || typeof query !== "string" || query.length < 2) {
      return NextResponse.json(
        { error: "Query must be at least 2 characters" },
        { status: 400 }
      );
    }

    const client = getAnthropicClient();
    if (!client) {
      return NextResponse.json(
        { error: "AI features are not configured. Missing ANTHROPIC_API_KEY." },
        { status: 503 }
      );
    }

    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: `You are an expert bikepacking and outdoor gear advisor with encyclopedic knowledge of camping, cycling, and adventure equipment. When given a gear query, identify the most likely item and provide accurate details.

Key guidelines:
- If the query matches a known product, provide the exact product details and weight from your knowledge.
- If the query is vague (e.g. "alcohol stove" or "rain jacket"), identify the most popular/recommended option in that category for bikepacking.
- Weight should be as accurate as possible for known products. For unknown items, estimate based on similar products.
- Category must be one of: shelter, sleep, cook, clothing, tools, electronics, hydration, food, misc.
- The "tools" category includes bike tools, repair kits, pumps, locks, bikepacking bags, and racks.
- Always provide a helpful 1-sentence description.`,
      tools: [identifyGearTool],
      tool_choice: { type: "tool", name: "identify_gear" },
      messages: [
        {
          role: "user",
          content: `Identify this bikepacking gear item: "${query}"`,
        },
      ],
    });

    const toolBlock = response.content.find((b) => b.type === "tool_use");
    if (!toolBlock || toolBlock.type !== "tool_use") {
      return NextResponse.json(
        { error: "AI could not identify the gear item." },
        { status: 500 }
      );
    }

    return NextResponse.json(toolBlock.input as GearIdentification);
  } catch (error) {
    console.error("[AI] Gear identification error:", error);
    return NextResponse.json(
      { error: "Failed to identify gear. Please try again." },
      { status: 500 }
    );
  }
}
