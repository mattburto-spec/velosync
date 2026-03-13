import { getAnthropicClient } from "./anthropic";

// ----- Input / Output types -----

interface EstimateWeightInput {
  name: string;
  category: string;
  brand?: string;
  model?: string;
}

export interface WeightEstimate {
  estimatedWeightGrams: number;
  confidence: "high" | "medium" | "low";
  reasoning: string;
}

// ----- Tool schema for structured output -----

const weightEstimateTool = {
  name: "provide_weight_estimate" as const,
  description:
    "Provide a weight estimate for a bikepacking gear item based on its name, category, brand, and model.",
  input_schema: {
    type: "object" as const,
    properties: {
      estimatedWeightGrams: {
        type: "number" as const,
        description: "Estimated weight of the item in grams.",
      },
      confidence: {
        type: "string" as const,
        enum: ["high", "medium", "low"],
        description:
          "Confidence level. 'high' = known product with well-documented weight, 'medium' = category average or similar product, 'low' = rough guess based on category.",
      },
      reasoning: {
        type: "string" as const,
        description:
          "Brief explanation of how the estimate was determined.",
      },
    },
    required: ["estimatedWeightGrams", "confidence", "reasoning"],
  },
};

// ----- Main function -----

export async function estimateItemWeight(
  params: EstimateWeightInput
): Promise<WeightEstimate> {
  const client = getAnthropicClient();
  if (!client) {
    throw new Error("AI features are not configured. Missing ANTHROPIC_API_KEY.");
  }

  const { name, category, brand, model } = params;

  const systemPrompt = `You are a gear weight database with extensive knowledge of bikepacking, camping, and cycling equipment weights. You know typical weights for items from major brands (MSR, Big Agnes, Sea to Summit, Ortlieb, Revelate Designs, Apidura, etc.) and can estimate weights for generic items based on category averages.

When you know the exact product, give a high confidence estimate.
When you recognise the brand/category but not the exact model, give a medium confidence estimate based on similar products.
When you only have the category to go on, give a low confidence estimate based on category averages.

Always estimate in grams. Be precise when confident, round to the nearest 5g or 10g when less certain.`;

  const userPrompt = `Estimate the weight of this gear item:
- Name: ${name}
- Category: ${category}${brand ? `\n- Brand: ${brand}` : ""}${model ? `\n- Model: ${model}` : ""}`;

  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 1024,
    system: systemPrompt,
    tools: [weightEstimateTool],
    tool_choice: { type: "tool", name: "provide_weight_estimate" },
    messages: [{ role: "user", content: userPrompt }],
  });

  const toolBlock = response.content.find((b) => b.type === "tool_use");
  if (!toolBlock || toolBlock.type !== "tool_use") {
    throw new Error("AI did not return a weight estimate.");
  }

  return toolBlock.input as WeightEstimate;
}
