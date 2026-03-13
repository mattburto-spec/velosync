"use client";

import { useState, type FormEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { TRIP_TERRAINS, TRIP_CLIMATES } from "@/lib/constants";
import type { Trip } from "@/types";

interface TripFormProps {
  open: boolean;
  onClose: () => void;
  onSaved: (trip: Trip) => void;
  trip?: Trip | null;
}

function TripForm({ open, onClose, onSaved, trip }: TripFormProps) {
  const isEditing = !!trip;

  const [name, setName] = useState(trip?.name ?? "");
  const [description, setDescription] = useState(trip?.description ?? "");
  const [destination, setDestination] = useState(trip?.destination ?? "");
  const [startDate, setStartDate] = useState(trip?.start_date ?? "");
  const [endDate, setEndDate] = useState(trip?.end_date ?? "");
  const [distanceKm, setDistanceKm] = useState(
    trip?.distance_km?.toString() ?? ""
  );
  const [terrain, setTerrain] = useState(trip?.terrain ?? "");
  const [climate, setClimate] = useState(trip?.climate ?? "");
  const [conditions, setConditions] = useState(trip?.expected_conditions ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setSaving(true);
    setError(null);

    const payload: Record<string, unknown> = {
      name: name.trim(),
      description: description.trim() || null,
      destination: destination.trim() || null,
      start_date: startDate || null,
      end_date: endDate || null,
      distance_km: distanceKm ? Number(distanceKm) : null,
      terrain: terrain || null,
      climate: climate || null,
      expected_conditions: conditions.trim() || null,
    };

    if (isEditing) {
      payload.id = trip.id;
    }

    try {
      const res = await fetch("/api/trips", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save trip");
      }

      const saved = await res.json();
      onSaved(saved);
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEditing ? "Edit Trip" : "Plan a Trip"}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Trip Name"
          placeholder="e.g. Oregon Outback 2026"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          label="Destination"
          placeholder="e.g. Central Oregon, USA"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

        <Textarea
          label="Description"
          placeholder="Route overview, goals, notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Start Date"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <Input
          label="Distance (km)"
          type="number"
          placeholder="e.g. 350"
          value={distanceKm}
          onChange={(e) => setDistanceKm(e.target.value)}
          min={0}
        />

        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Terrain"
            options={TRIP_TERRAINS}
            placeholder="Select terrain"
            value={terrain}
            onChange={(e) => setTerrain(e.target.value)}
          />
          <Select
            label="Climate"
            options={TRIP_CLIMATES}
            placeholder="Select climate"
            value={climate}
            onChange={(e) => setClimate(e.target.value)}
          />
        </div>

        <Textarea
          label="Expected Conditions"
          placeholder="Weather, road conditions, hazards..."
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          rows={2}
        />

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {isEditing ? "Save Changes" : "Create Trip"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export { TripForm };
