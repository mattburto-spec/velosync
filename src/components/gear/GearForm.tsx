"use client";

import { useState, useCallback } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { SmartGearSearch } from "@/components/ui/SmartGearSearch";
import { PhotoUpload } from "@/components/ui/PhotoUpload";
import { GEAR_CATEGORIES, GEAR_CONDITIONS } from "@/lib/constants";
import type { GearEntry } from "@/lib/gear-data";
import type { GearIdentification } from "@/app/api/ai/identify-gear/route";
import { getCategoryPlaceholder, getGearSearchUrl } from "@/lib/gear-placeholders";
import type { GearItem, GearCategory, GearCondition } from "@/types";

interface GearFormProps {
  item?: GearItem;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  name: string;
  category: GearCategory;
  brand: string;
  model: string;
  weight_grams: string;
  weight_unit: "g" | "oz";
  dimensions_length: string;
  dimensions_width: string;
  dimensions_height: string;
  purchase_price: string;
  purchase_date: string;
  purchase_url: string;
  condition: GearCondition;
  notes: string;
  is_consumable: boolean;
  is_shared: boolean;
}

function toFormState(item?: GearItem): FormState {
  return {
    name: item?.name ?? "",
    category: item?.category ?? "misc",
    brand: item?.brand ?? "",
    model: item?.model ?? "",
    weight_grams: item?.weight_grams?.toString() ?? "",
    weight_unit: "g",
    dimensions_length: item?.dimensions_mm?.length?.toString() ?? "",
    dimensions_width: item?.dimensions_mm?.width?.toString() ?? "",
    dimensions_height: item?.dimensions_mm?.height?.toString() ?? "",
    purchase_price: item?.purchase_price?.toString() ?? "",
    purchase_date: item?.purchase_date ?? "",
    purchase_url: item?.purchase_url ?? "",
    condition: item?.condition ?? "new",
    notes: item?.notes ?? "",
    is_consumable: item?.is_consumable ?? false,
    is_shared: item?.is_shared ?? false,
  };
}

function GearForm({ item, onClose, onSaved }: GearFormProps) {
  const isEditing = !!item;
  const [form, setForm] = useState<FormState>(() => toFormState(item));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSource, setAiSource] = useState<"database" | "ai" | null>(null);
  const [photoPlaceholder, setPhotoPlaceholder] = useState<string | null>(null);
  const [photoSearchUrl, setPhotoSearchUrl] = useState<string | null>(null);
  const [photoSearchLabel, setPhotoSearchLabel] = useState<string | undefined>(undefined);

  const handleGearSelect = useCallback(
    (entry: GearEntry) => {
      setForm((prev) => ({
        ...prev,
        name: `${entry.brand} ${entry.name}`,
        brand: entry.brand,
        model: entry.name,
        category: entry.category as GearCategory,
        weight_grams: entry.weight_grams.toString(),
        weight_unit: "g",
      }));
      setAiSource("database");
      setPhotoPlaceholder(getCategoryPlaceholder(entry.category));
      setPhotoSearchUrl(getGearSearchUrl(entry.brand, entry.name));
      setPhotoSearchLabel(`Search "${entry.brand} ${entry.name}" photos`);
    },
    []
  );

  const handleAiIdentify = useCallback(
    async (query: string) => {
      setAiLoading(true);
      try {
        const res = await fetch("/api/ai/identify-gear", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query }),
        });
        if (!res.ok) throw new Error("AI identification failed");
        const data: GearIdentification = await res.json();
        setForm((prev) => ({
          ...prev,
          name: `${data.brand} ${data.name}`,
          brand: data.brand,
          model: data.name,
          category: data.category as GearCategory,
          weight_grams: data.weight_grams.toString(),
          weight_unit: "g",
        }));
        setAiSource("ai");
        setPhotoPlaceholder(getCategoryPlaceholder(data.category));
        const searchTerm = data.image_search_term || `${data.brand} ${data.name}`;
        setPhotoSearchUrl(`https://www.google.com/search?tbm=isch&q=${encodeURIComponent(searchTerm)}`);
        setPhotoSearchLabel(`Search "${data.brand} ${data.name}" photos`);
      } catch {
        setError("AI could not identify that gear. Try being more specific.");
      } finally {
        setAiLoading(false);
      }
    },
    []
  );

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

    setSaving(true);
    setError(null);

    try {
      // Calculate weight in grams
      let weightGrams: number | null = null;
      if (form.weight_grams) {
        const raw = parseFloat(form.weight_grams);
        weightGrams =
          form.weight_unit === "oz" ? Math.round(raw * 28.3495) : raw;
      }

      // Build dimensions
      let dimensions = null;
      if (form.dimensions_length || form.dimensions_width || form.dimensions_height) {
        dimensions = {
          length: parseFloat(form.dimensions_length) || 0,
          width: parseFloat(form.dimensions_width) || 0,
          height: parseFloat(form.dimensions_height) || 0,
        };
      }

      const payload = {
        ...(isEditing ? { id: item.id } : {}),
        name: form.name.trim(),
        category: form.category,
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        weight_grams: weightGrams,
        dimensions_mm: dimensions,
        purchase_price: form.purchase_price
          ? parseFloat(form.purchase_price)
          : null,
        purchase_date: form.purchase_date || null,
        purchase_url: form.purchase_url.trim() || null,
        condition: form.condition,
        notes: form.notes.trim() || null,
        is_consumable: form.is_consumable,
        is_shared: form.is_shared,
      };

      const res = await fetch("/api/gear", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      const savedItem = await res.json();

      // Upload photo if provided
      if (photoFile) {
        const fd = new FormData();
        fd.append("file", photoFile);
        fd.append("type", "gear");
        fd.append("parentId", savedItem.id);
        await fetch("/api/upload", { method: "POST", body: fd });
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={isEditing ? "Edit Gear" : "Add Gear"}
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Smart Name Search */}
        <div>
          <SmartGearSearch
            value={form.name}
            onChange={(v) => {
              set("name", v);
              if (aiSource) setAiSource(null);
            }}
            onSelect={handleGearSelect}
            onAiIdentify={handleAiIdentify}
            aiLoading={aiLoading}
            label="Name"
            placeholder="Start typing — e.g. Nemo Tensor, MSR Hubba..."
          />
          {aiSource && (
            <p className="mt-1 text-xs text-muted flex items-center gap-1">
              {aiSource === "database" ? (
                <>
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-summit" />
                  Auto-filled from gear database
                </>
              ) : (
                <>
                  <span className="text-xs">✨</span>
                  AI-estimated — verify weight and details
                </>
              )}
            </p>
          )}
        </div>

        {/* Category + Condition */}
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Category"
            options={GEAR_CATEGORIES}
            value={form.category}
            onChange={(e) => set("category", e.target.value as GearCategory)}
          />
          <Select
            label="Condition"
            options={GEAR_CONDITIONS}
            value={form.condition}
            onChange={(e) => set("condition", e.target.value as GearCondition)}
          />
        </div>

        {/* Brand + Model */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Brand"
            value={form.brand}
            onChange={(e) => set("brand", e.target.value)}
            placeholder="e.g. Nemo"
          />
          <Input
            label="Model"
            value={form.model}
            onChange={(e) => set("model", e.target.value)}
            placeholder="e.g. Tensor Ultralight"
          />
        </div>

        {/* Weight */}
        <div>
          <label className="text-sm font-medium text-slate-text mb-1.5 block">
            Weight
          </label>
          <div className="flex gap-2">
            <Input
              type="number"
              step="any"
              min="0"
              value={form.weight_grams}
              onChange={(e) => set("weight_grams", e.target.value)}
              placeholder="0"
              className="flex-1"
            />
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                type="button"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  form.weight_unit === "g"
                    ? "bg-copper text-white"
                    : "bg-white text-muted hover:bg-surface"
                }`}
                onClick={() => set("weight_unit", "g")}
              >
                g
              </button>
              <button
                type="button"
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  form.weight_unit === "oz"
                    ? "bg-copper text-white"
                    : "bg-white text-muted hover:bg-surface"
                }`}
                onClick={() => set("weight_unit", "oz")}
              >
                oz
              </button>
            </div>
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <label className="text-sm font-medium text-slate-text mb-1.5 block">
            Dimensions (mm)
          </label>
          <div className="grid grid-cols-3 gap-2">
            <Input
              type="number"
              min="0"
              value={form.dimensions_length}
              onChange={(e) => set("dimensions_length", e.target.value)}
              placeholder="Length"
            />
            <Input
              type="number"
              min="0"
              value={form.dimensions_width}
              onChange={(e) => set("dimensions_width", e.target.value)}
              placeholder="Width"
            />
            <Input
              type="number"
              min="0"
              value={form.dimensions_height}
              onChange={(e) => set("dimensions_height", e.target.value)}
              placeholder="Height"
            />
          </div>
        </div>

        {/* Price + Date */}
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Purchase Price ($)"
            type="number"
            step="0.01"
            min="0"
            value={form.purchase_price}
            onChange={(e) => set("purchase_price", e.target.value)}
            placeholder="0.00"
          />
          <Input
            label="Purchase Date"
            type="date"
            value={form.purchase_date}
            onChange={(e) => set("purchase_date", e.target.value)}
          />
        </div>

        {/* Purchase URL */}
        <Input
          label="Purchase URL"
          type="url"
          value={form.purchase_url}
          onChange={(e) => set("purchase_url", e.target.value)}
          placeholder="https://..."
        />

        {/* Notes */}
        <Textarea
          label="Notes"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Any notes about this gear..."
        />

        {/* Checkboxes */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-slate-text">
            <input
              type="checkbox"
              checked={form.is_consumable}
              onChange={(e) => set("is_consumable", e.target.checked)}
              className="rounded border-gray-300 text-copper focus:ring-copper"
            />
            Consumable
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-text">
            <input
              type="checkbox"
              checked={form.is_shared}
              onChange={(e) => set("is_shared", e.target.checked)}
              className="rounded border-gray-300 text-copper focus:ring-copper"
            />
            Shared gear
          </label>
        </div>

        {/* Photo */}
        <div>
          <label className="text-sm font-medium text-slate-text mb-1.5 block">
            Photo
          </label>
          <PhotoUpload
            value={item?.photos?.find((p) => p.is_primary)?.photo_url}
            onChange={(file) => setPhotoFile(file ?? null)}
            placeholderUrl={photoPlaceholder}
            searchUrl={photoSearchUrl}
            searchLabel={photoSearchLabel}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {isEditing ? "Save Changes" : "Add Gear"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export { GearForm };
