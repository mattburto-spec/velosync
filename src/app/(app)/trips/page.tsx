"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { TripCard } from "@/components/trips/TripCard";
import { TripForm } from "@/components/trips/TripForm";
import type { Trip } from "@/types";

type TripWithCounts = Trip & { member_count: number; item_count: number };

export default function TripsPage() {
  const router = useRouter();
  const [trips, setTrips] = useState<TripWithCounts[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const fetchTrips = useCallback(async () => {
    try {
      const res = await fetch("/api/trips");
      if (res.ok) {
        const data = await res.json();
        setTrips(data);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  function handleTripSaved(saved: Trip) {
    setTrips((prev) => {
      const idx = prev.findIndex((t) => t.id === saved.id);
      if (idx >= 0) {
        const updated = [...prev];
        updated[idx] = { ...updated[idx], ...saved };
        return updated;
      }
      return [{ ...saved, member_count: 1, item_count: 0 } as TripWithCounts, ...prev];
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-text">Trips</h1>
          <p className="mt-1 text-sm text-muted">
            Plan your bikepacking adventures and pack your gear.
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Plan a Trip
        </Button>
      </div>

      {trips.length === 0 ? (
        <EmptyState
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          }
          title="No trips yet"
          description="Create your first bikepacking trip to start planning and packing gear."
          action={
            <Button onClick={() => setFormOpen(true)}>Plan a Trip</Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onClick={() => router.push(`/trips/${trip.id}`)}
            />
          ))}
        </div>
      )}

      <TripForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSaved={handleTripSaved}
      />
    </div>
  );
}
