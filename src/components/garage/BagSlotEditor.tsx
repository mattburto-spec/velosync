"use client";

import { useState, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { BAG_POSITIONS } from "@/lib/constants";
import type { BagSlot, BagPosition } from "@/types";

interface BagSlotEditorProps {
  bikeId: string;
  slot?: BagSlot;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  name: string;
  position: BagPosition | "";
  max_volume_ml: string;
  max_weight_grams: string;
  brand: string;
  model: string;
  color: string;
}

function toSlotFormState(slot?: BagSlot): FormState {
  return {
    name: slot?.name ?? "",
    position: slot?.position ?? "",
    max_volume_ml: slot?.max_volume_ml?.toString() ?? "",
    max_weight_grams: slot?.max_weight_grams?.toString() ?? "",
    brand: slot?.brand ?? "",
    model: slot?.model ?? "",
    color: slot?.color ?? "",
  };
}

function BagSlotEditor({ bikeId, slot, onClose, onSaved }: BagSlotEditorProps) {
  const isEditing = !!slot;
  const [form, setForm] = useState<FormState>(() => toSlotFormState(slot));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!form.position) {
      setError("Position is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const payload = {
        ...(isEditing ? { id: slot.id } : { bike_id: bikeId }),
        name: form.name.trim(),
        position: form.position as BagPosition,
        max_volume_ml: form.max_volume_ml
          ? parseInt(form.max_volume_ml)
          : null,
        max_weight_grams: form.max_weight_grams
          ? parseInt(form.max_weight_grams)
          : null,
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        color: form.color.trim() || null,
      };

      const action = isEditing ? "update-slot" : "add-slot";
      const res = await fetch(`/api/bikes?action=${action}`, {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const positionOptions = [
    { value: "", label: "Select position..." },
    ...BAG_POSITIONS,
  ];

  return (
    <Modal
      open
      onClose={onClose}
      title={isEditing ? "Edit Bag Slot" : "Add Bag Slot"}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Input
          label="Name"
          required
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Revelate Terrapin"
        />

        <Select
          label="Position"
          options={positionOptions}
          value={form.position}
          onChange={(e) => set("position", e.target.value as BagPosition | "")}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Max Volume (ml)"
            type="number"
            min="0"
            value={form.max_volume_ml}
            onChange={(e) => set("max_volume_ml", e.target.value)}
            placeholder="e.g. 14000"
          />
          <Input
            label="Max Weight (g)"
            type="number"
            min="0"
            value={form.max_weight_grams}
            onChange={(e) => set("max_weight_grams", e.target.value)}
            placeholder="e.g. 5000"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Brand"
            value={form.brand}
            onChange={(e) => set("brand", e.target.value)}
            placeholder="e.g. Revelate"
          />
          <Input
            label="Model"
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            placeholder="e.g. Terrapin 14L"
          />
        </div>

        <Input
          label="Color"
          value={form.color}
          onChange={(e) => set("color", e.target.value)}
          placeholder="e.g. Black"
        />

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {isEditing ? "Save Changes" : "Add Slot"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export { BagSlotEditor };
