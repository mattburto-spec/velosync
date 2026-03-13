"use client";

import { useParams, useRouter } from "next/navigation";
import { LoadoutScreen } from "@/components/loadout/LoadoutScreen";

export default function PackPage() {
  const params = useParams();
  const router = useRouter();
  const tripId = params.tripId as string;

  return (
    <LoadoutScreen
      tripName="Bikepacking Trip"
      onExit={() => router.push(`/trips/${tripId}`)}
    />
  );
}
