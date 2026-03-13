"use client";

import { Card } from "@/components/ui/Card";
import { Badge, type BadgeColor } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import { TRIP_TERRAINS, TRIP_CLIMATES } from "@/lib/constants";
import type { Trip, TripStatus } from "@/types";

interface TripCardProps {
  trip: Trip & { member_count: number; item_count: number };
  onClick?: () => void;
}

const STATUS_CONFIG: Record<TripStatus, { color: BadgeColor; label: string }> = {
  planning: { color: "sky", label: "Planning" },
  packed: { color: "forest", label: "Packed" },
  active: { color: "sunset", label: "Active" },
  completed: { color: "stone", label: "Completed" },
};

function TripCard({ trip, onClick }: TripCardProps) {
  const statusCfg = STATUS_CONFIG[trip.status];
  const terrainLabel = TRIP_TERRAINS.find((t) => t.value === trip.terrain)?.label;
  const climateLabel = TRIP_CLIMATES.find((c) => c.value === trip.climate)?.label;

  const dateRange =
    trip.start_date && trip.end_date
      ? `${formatDate(trip.start_date)} - ${formatDate(trip.end_date)}`
      : trip.start_date
        ? formatDate(trip.start_date)
        : null;

  return (
    <Card hover onClick={onClick} className="gear-card">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-slate-text">
            {trip.name}
          </h3>
          {trip.destination && (
            <p className="mt-0.5 truncate text-sm text-muted">
              {trip.destination}
            </p>
          )}
        </div>
        <Badge color={statusCfg.color}>{statusCfg.label}</Badge>
      </div>

      {/* Date range */}
      {dateRange && (
        <p className="mt-3 text-xs text-muted">{dateRange}</p>
      )}

      {/* Terrain + Climate badges */}
      {(terrainLabel || climateLabel) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {terrainLabel && <Badge color="trail">{terrainLabel}</Badge>}
          {climateLabel && <Badge color="purple">{climateLabel}</Badge>}
        </div>
      )}

      {/* Footer stats */}
      <div className="mt-4 flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-muted">
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4-4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 00-3-3.87" />
            <path d="M16 3.13a4 4 0 010 7.75" />
          </svg>
          {trip.member_count} {trip.member_count === 1 ? "rider" : "riders"}
        </span>
        <span className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          </svg>
          {trip.item_count} {trip.item_count === 1 ? "item" : "items"}
        </span>
        {trip.distance_km && (
          <span className="ml-auto font-medium text-copper">
            {trip.distance_km} km
          </span>
        )}
      </div>
    </Card>
  );
}

export { TripCard };
