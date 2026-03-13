import Anthropic from "@anthropic-ai/sdk";

let client: Anthropic | null = null;

/**
 * Returns a lazily-initialized Anthropic client.
 * Returns null when ANTHROPIC_API_KEY is not set so callers can degrade gracefully.
 */
export function getAnthropicClient(): Anthropic | null {
  if (!process.env.ANTHROPIC_API_KEY) {
    return null;
  }

  if (!client) {
    client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  return client;
}
