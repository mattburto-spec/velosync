"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { CollaboratorList } from "@/components/trips/CollaboratorList";
import { SharedGearView } from "@/components/trips/SharedGearView";
import { Button } from "@/components/ui/Button";
import type { Trip, TripMember, PackingItem, GearItem, User } from "@/types";

export default function CollaboratePage() {
  const params = useParams();
  const router = useRouter();
  const { authUser, profile } = useAuth();
  const tripId = params.tripId as string;

  const [trip, setTrip] = useState<Trip | null>(null);
  const [members, setMembers] = useState<(TripMember & { user?: User })[]>([]);
  const [packingItems, setPackingItems] = useState<
    (PackingItem & { gear_item?: GearItem })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const [tripsRes, membersRes, packingRes] = await Promise.all([
        fetch("/api/trips"),
        fetch(`/api/trips?membersOf=${tripId}`),
        fetch(`/api/packing?tripId=${tripId}`),
      ]);

      if (!tripsRes.ok) throw new Error("Failed to load trips");

      const trips = await tripsRes.json();
      const foundTrip = trips.find((t: Trip) => t.id === tripId);
      if (!foundTrip) {
        setError("Trip not found");
        return;
      }
      setTrip(foundTrip);

      // Members — try dedicated endpoint, fall back to trip.members
      if (membersRes.ok) {
        const membersData = await membersRes.json();
        setMembers(membersData);
      } else {
        // Fall back to fetching trip with members
        setMembers(foundTrip.members ?? []);
      }

      if (packingRes.ok) {
        const packing = await packingRes.json();
        setPackingItems(packing);
      }
    } catch {
      setError("Failed to load collaboration data");
    } finally {
      setLoading(false);
    }
  }, [tripId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const isOwner = members.some(
    (m) => m.user_id === authUser?.id && m.role === "owner"
  );

  const handleMemberAdded = (member: TripMember & { user?: User }) => {
    setMembers((prev) => [...prev, member]);
  };

  const handleMemberRemoved = (userId: string) => {
    setMembers((prev) => prev.filter((m) => m.user_id !== userId));
  };

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-copper border-t-transparent" />
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center gap-4">
        <p className="text-muted">{error ?? "Trip not found"}</p>
        <Button variant="secondary" onClick={() => router.push("/trips")}>
          Back to Trips
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.push(`/trips/${tripId}`)}
          className="rounded-lg p-1.5 text-muted hover:bg-surface-warm transition-colors"
          aria-label="Back to trip"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-slate-text">
            {trip.name}
          </h1>
          <p className="text-sm text-muted">Collaboration</p>
        </div>
      </div>

      {/* Main content — side by side on desktop, stacked on mobile */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Collaborator list */}
        <div>
          <CollaboratorList
            tripId={tripId}
            members={members}
            currentUserId={authUser?.id ?? ""}
            isOwner={isOwner}
            onMemberAdded={handleMemberAdded}
            onMemberRemoved={handleMemberRemoved}
          />
        </div>

        {/* Shared gear view */}
        <div>
          <h2 className="mb-3 text-sm font-semibold text-slate-text">
            Packing Comparison
          </h2>
          <SharedGearView
            members={members}
            packingItems={packingItems}
            unitPreference={profile?.unit_preference ?? "metric"}
          />
        </div>
      </div>
    </div>
  );
}
