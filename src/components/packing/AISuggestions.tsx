"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_ICONS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { GearItem } from "@/types";
import type {
  SuggestedItem,
  MissingGear,
} from "@/lib/ai/suggest-packing";

interface AISuggestionsProps {
  tripId: string;
  gearInventory: GearItem[];
  onAddItem?: (gearItemId: string) => void;
}

interface SuggestionResult {
  suggestedItems: SuggestedItem[];
  missingGear: MissingGear[];
  tips: string[];
}

const priorityConfig = {
  essential: { color: "red" as const, label: "Essential" },
  recommended: { color: "forest" as const, label: "Recommended" },
  optional: { color: "stone" as const, label: "Optional" },
};

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function PulsingDots() {
  return (
    <div className="flex items-center gap-1.5 py-8 justify-center">
      <div className="h-2 w-2 rounded-full bg-copper animate-pulse" />
      <div
        className="h-2 w-2 rounded-full bg-copper animate-pulse"
        style={{ animationDelay: "0.15s" }}
      />
      <div
        className="h-2 w-2 rounded-full bg-copper animate-pulse"
        style={{ animationDelay: "0.3s" }}
      />
    </div>
  );
}

export function AISuggestions({
  tripId,
  gearInventory,
  onAddItem,
}: AISuggestionsProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SuggestionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/ai/suggest-packing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tripId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to get suggestions");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (gearItemId: string) => {
    try {
      const res = await fetch("/api/packing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip_id: tripId,
          gear_item_id: gearItemId,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to add item");
      }

      setAddedItems((prev) => new Set(prev).add(gearItemId));
      onAddItem?.(gearItemId);
    } catch {
      // Silently fail — the button stays clickable
    }
  };

  const getGearName = (gearItemId: string) => {
    const gear = gearInventory.find((g) => g.id === gearItemId);
    return gear?.name ?? "Unknown item";
  };

  const getGearCategory = (gearItemId: string) => {
    const gear = gearInventory.find((g) => g.id === gearItemId);
    return gear?.category ?? "misc";
  };

  // Group suggested items by priority
  const groupedItems = result
    ? {
        essential: result.suggestedItems.filter(
          (i) => i.priority === "essential"
        ),
        recommended: result.suggestedItems.filter(
          (i) => i.priority === "recommended"
        ),
        optional: result.suggestedItems.filter(
          (i) => i.priority === "optional"
        ),
      }
    : null;

  return (
    <Card className="overflow-hidden" padding={false}>
      {/* Header */}
      <div className="border-b border-surface-warm bg-gradient-to-r from-forest/5 to-transparent px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SparkleIcon className="text-copper" />
            <h3 className="text-sm font-semibold text-slate-text">
              AI Packing Assistant
            </h3>
          </div>
          <Button
            size="sm"
            onClick={handleGenerate}
            loading={loading}
            icon={!loading ? <SparkleIcon /> : undefined}
          >
            {result ? "Refresh" : "Get AI Suggestions"}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 py-4">
        {/* Loading */}
        {loading && (
          <div className="text-center">
            <PulsingDots />
            <p className="text-sm text-muted">
              Analysing your trip and gear...
            </p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-sm text-red-700">{error}</p>
            {error.includes("ANTHROPIC_API_KEY") && (
              <p className="mt-1 text-xs text-red-500">
                AI features require an API key. Contact your administrator.
              </p>
            )}
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="space-y-6">
            {/* Suggested items by priority */}
            {groupedItems &&
              (
                ["essential", "recommended", "optional"] as const
              ).map((priority) => {
                const items = groupedItems[priority];
                if (items.length === 0) return null;
                const config = priorityConfig[priority];

                return (
                  <div key={priority}>
                    <div className="mb-2 flex items-center gap-2">
                      <Badge color={config.color}>{config.label}</Badge>
                      <span className="text-xs text-muted">
                        {items.length} item{items.length !== 1 && "s"}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {items.map((item) => {
                        const isAdded = addedItems.has(item.gearItemId);
                        const category = getGearCategory(item.gearItemId);

                        return (
                          <div
                            key={item.gearItemId}
                            className={cn(
                              "flex items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors",
                              isAdded
                                ? "border-copper/30 bg-copper/5"
                                : "border-surface-warm hover:border-gray-300"
                            )}
                          >
                            <span className="mt-0.5 text-base">
                              {CATEGORY_ICONS[category] ?? "📦"}
                            </span>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-slate-text">
                                {getGearName(item.gearItemId)}
                              </p>
                              <p className="text-xs text-muted mt-0.5">
                                {item.reason}
                              </p>
                            </div>
                            <button
                              onClick={() => handleAddItem(item.gearItemId)}
                              disabled={isAdded}
                              className={cn(
                                "shrink-0 rounded-lg p-1.5 transition-colors",
                                isAdded
                                  ? "text-copper cursor-default"
                                  : "text-muted hover:bg-copper/10 hover:text-copper"
                              )}
                              title={isAdded ? "Added" : "Add to packing list"}
                            >
                              <CheckIcon />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

            {/* Missing gear */}
            {result.missingGear.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-slate-text">
                  Gear You Might Need
                </h4>
                <p className="mb-2 text-xs text-muted">
                  Items not in your inventory that would improve this trip.
                </p>
                <div className="space-y-2">
                  {result.missingGear.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-dashed border-sunset/40 bg-sunset/5 px-3 py-2.5"
                    >
                      <span className="mt-0.5 text-base">
                        {CATEGORY_ICONS[item.category] ?? "📦"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-text">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          {item.reason}
                        </p>
                      </div>
                      <Badge color="sunset" className="shrink-0">
                        {item.category}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tips */}
            {result.tips.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-semibold text-slate-text">
                  Trip Tips
                </h4>
                <ul className="space-y-1.5">
                  {result.tips.map((tip, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-muted"
                    >
                      <span className="mt-0.5 shrink-0 text-copper">
                        &#8226;
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!result && !loading && !error && (
          <p className="py-4 text-center text-sm text-muted">
            Get AI-powered suggestions for what to pack based on your trip
            details and gear inventory.
          </p>
        )}
      </div>
    </Card>
  );
}
