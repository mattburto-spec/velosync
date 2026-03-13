"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge, type BadgeColor } from "@/components/ui/Badge";
import { TripForm } from "@/components/trips/TripForm";
import { formatDate, formatWeight } from "@/lib/utils";
import { TRIP_TERRAINS, TRIP_CLIMATES } from "@/lib/constants";
import type { Trip, TripStatus, PackingItem } from "@/types";

const STATUS_CONFIG: Record<TripStatus, { color: BadgeColor; label: string }> = {
  planning: { color: "sky", label: "Planning" },
  packed: { color: "forest", label: "Packed" },
  active: { color: "sunset", label: "Active" },
  completed: { color: "stone", label: "Completed" },
};

type Tab = "pack" | "team";

export default function TripDetailPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [packingItems, setPackingItems] = useState<PackingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("pack");
  const [editOpen, setEditOpen] = useState(false);

  const fetchTrip = useCallback(async () => {
    try {
      const [tripRes, packingRes] = await Promise.all([
        fetch("/api/trips"),
        fetch(`/api/packing?tripId=${tripId}`),
      ]);

      if (tripRes.ok) {
        const trips = await tripRes.json();
        const found = trips.find((t: Trip) => t.id === tripId);
        if (found) setTrip(found);
      }

      if (packingRes.ok) {
        const items = await packingRes.json();
        setPackingItems(items);
      }
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchTrip();
  }, [fetchTrip]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted">Trip not found.</p>
        <Button variant="secondary" className="mt-4" onClick={() => router.push("/trips")}>
          Back to Trips
        </Button>
      </div>
    );
  }

  const statusCfg = STATUS_CONFIG[trip.status];
  const terrainLabel = TRIP_TERRAINS.find((t) => t.value === trip.terrain)?.label;
  const climateLabel = TRIP_CLIMATES.find((c) => c.value === trip.climate)?.label;

  const totalGrams = packingItems.reduce((sum, item) => {
    return sum + (item.gear_item?.weight_grams ?? 0) * (item.quantity ?? 1);
  }, 0);

  const dateRange =
    trip.start_date && trip.end_date
      ? `${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}`
      : trip.start_date
        ? formatDate(trip.start_date)
        : null;

  return (
    <div>
      {/* Back link */}
      <button
        onClick={() => router.push("/trips")}
        className="mb-4 flex items-center gap-1 text-sm text-muted hover:text-slate-text transition-colors"
      >
        <svg
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
          <polyline points="15 18 9 12 15 6" />
        </svg>
        All Trips
      </button>

      {/* Trip header */}
      <Card className="mb-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-text">{trip.name}</h1>
              <Badge color={statusCfg.color}>{statusCfg.label}</Badge>
            </div>
            {trip.destination && (
              <p className="mt-1 text-sm text-muted">{trip.destination}</p>
            )}
            {trip.description && (
              <p className="mt-2 text-sm text-slate-text/80">{trip.description}</p>
            )}
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="secondary" size="sm" onClick={() => setEditOpen(true)}>
              Edit Trip
            </Button>
            <Button
              size="sm"
              onClick={() => router.push(`/trips/${tripId}/pack`)}
            >
              Open Packing
            </Button>
          </div>
        </div>

        {/* Trip meta */}
        <div className="mt-4 flex flex-wrap gap-4 border-t border-gray-100 pt-4 text-sm text-muted">
          {dateRange && (
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {dateRange}
            </span>
          )}
          {trip.distance_km && (
            <span className="flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {trip.distance_km} km
            </span>
          )}
          {terrainLabel && <Badge color="trail">{terrainLabel}</Badge>}
          {climateLabel && <Badge color="purple">{climateLabel}</Badge>}
          <span className="ml-auto font-medium text-copper">
            {formatWeight(totalGrams)} packed ({packingItems.length} items)
          </span>
        </div>
      </Card>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 border-b border-surface-warm">
        {(["pack", "team"] as Tab[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab
                ? "border-copper text-copper"
                : "border-transparent text-muted hover:text-slate-text"
            }`}
          >
            {tab === "pack" ? "Pack" : "Team"}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "pack" && (
        <div>
          {packingItems.length === 0 ? (
            <Card>
              <div className="py-8 text-center">
                <p className="text-muted">No items packed yet.</p>
                <Button
                  className="mt-4"
                  onClick={() => router.push(`/trips/${tripId}/pack`)}
                >
                  Start Packing
                </Button>
              </div>
            </Card>
          ) : (
            <Card>
              <div className="divide-y divide-gray-100">
                {packingItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-slate-text">
                        {item.gear_item?.name ?? "Unknown item"}
                      </p>
                      {item.gear_item?.brand && (
                        <p className="text-xs text-muted">{item.gear_item.brand}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-text">
                        {formatWeight(item.gear_item?.weight_grams)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-xs text-muted">x{item.quantity}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      )}

      {activeTab === "team" && (
        <Card>
          <div className="py-8 text-center">
            <p className="text-muted">
              Team management coming soon. Share your trip link to invite riders.
            </p>
          </div>
        </Card>
      )}

      <TripForm
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSaved={(saved) => setTrip((prev) => (prev ? { ...prev, ...saved } : prev))}
        trip={trip}
      />
    </div>
  );
}
