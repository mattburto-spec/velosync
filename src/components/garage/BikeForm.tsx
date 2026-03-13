"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { PhotoUpload } from "@/components/ui/PhotoUpload";
import { BIKE_TYPES } from "@/lib/constants";
import {
  getAllBrands,
  getModelsForBrand,
  BIKE_BRANDS_AND_MODELS,
} from "@/lib/bike-data";
import type { Bike, BikeType } from "@/types";

interface BikeTemplate {
  name: string;
  type: BikeType | "";
  brand: string;
  model: string;
  weight_grams: string;
  notes: string;
}

interface BikeFormProps {
  bike?: Bike;
  template?: BikeTemplate;
  onClose: () => void;
  onSaved: () => void;
}

interface FormState {
  name: string;
  type: BikeType | "";
  brand: string;
  model: string;
  year: string;
  weight_grams: string;
  notes: string;
}

function toBikeFormState(bike?: Bike): FormState {
  return {
    name: bike?.name ?? "",
    type: bike?.type ?? "",
    brand: bike?.brand ?? "",
    model: bike?.model ?? "",
    year: bike?.year?.toString() ?? "",
    weight_grams: bike?.weight_grams?.toString() ?? "",
    notes: bike?.notes ?? "",
  };
}

/** Autocomplete dropdown for brand/model fields */
function AutocompleteInput({
  label,
  value,
  onChange,
  suggestions,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  suggestions: string[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!value.trim()) return suggestions.slice(0, 12);
    const q = value.toLowerCase();
    return suggestions.filter((s) => s.toLowerCase().includes(q)).slice(0, 12);
  }, [value, suggestions]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showDropdown = open && focused && filtered.length > 0;

  return (
    <div ref={wrapperRef} className="relative">
      <label className="text-sm font-medium text-slate-text mb-1.5 block">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          setFocused(true);
          setOpen(true);
        }}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-lg border border-surface-warm bg-white px-3 py-2 text-sm text-slate-text placeholder:text-muted/50 transition-colors focus:border-copper focus:ring-2 focus:ring-copper/15 focus:outline-none"
      />
      {showDropdown && (
        <div className="absolute z-50 mt-1 w-full max-h-48 overflow-y-auto rounded-lg border border-surface-warm bg-white shadow-lg shadow-midnight/10">
          {filtered.map((item) => (
            <button
              key={item}
              type="button"
              onMouseDown={(e) => {
                e.preventDefault(); // Prevent input blur
                onChange(item);
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-slate-text hover:bg-surface transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function BikeForm({ bike, template, onClose, onSaved }: BikeFormProps) {
  const isEditing = !!bike;
  const [form, setForm] = useState<FormState>(() => {
    if (template) {
      return {
        name: template.name,
        type: template.type,
        brand: template.brand,
        model: template.model,
        year: "",
        weight_grams: template.weight_grams,
        notes: template.notes,
      };
    }
    return toBikeFormState(bike);
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  const set = useCallback(
    <K extends keyof FormState>(key: K, value: FormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Brand list for autocomplete
  const brandSuggestions = useMemo(() => getAllBrands(), []);

  // Model suggestions based on selected brand (+ auto-fill weight/type)
  const modelSuggestions = useMemo(() => {
    if (!form.brand.trim()) return [];
    return getModelsForBrand(form.brand).map((m) => m.model);
  }, [form.brand]);

  // When user picks a brand, clear model if it doesn't match
  const handleBrandChange = useCallback(
    (brand: string) => {
      set("brand", brand);
      // If the current model doesn't exist for the new brand, clear it
      const models = getModelsForBrand(brand);
      if (form.model && !models.some((m) => m.model === form.model)) {
        set("model", "");
      }
    },
    [form.model, set]
  );

  // When user picks a model, auto-fill weight and type from the database
  const handleModelChange = useCallback(
    (model: string) => {
      set("model", model);
      const brandEntry = BIKE_BRANDS_AND_MODELS.find(
        (b) => b.brand.toLowerCase() === form.brand.toLowerCase()
      );
      if (brandEntry) {
        const modelEntry = brandEntry.models.find((m) => m.model === model);
        if (modelEntry) {
          // Auto-fill weight if not already set
          if (!form.weight_grams && modelEntry.weight_grams) {
            set("weight_grams", modelEntry.weight_grams.toString());
          }
          // Auto-fill type if not already set
          if (!form.type && modelEntry.type) {
            set("type", modelEntry.type as BikeType);
          }
        }
      }
    },
    [form.brand, form.weight_grams, form.type, set]
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
      const payload = {
        ...(isEditing ? { id: bike.id } : {}),
        name: form.name.trim(),
        type: (form.type as BikeType) || null,
        brand: form.brand.trim() || null,
        model: form.model.trim() || null,
        year: form.year ? parseInt(form.year) : null,
        weight_grams: form.weight_grams
          ? parseFloat(form.weight_grams)
          : null,
        notes: form.notes.trim() || null,
      };

      const res = await fetch("/api/bikes", {
        method: isEditing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to save");
      }

      const savedBike = await res.json();

      // Upload photo if provided
      if (photoFile) {
        const fd = new FormData();
        fd.append("file", photoFile);
        fd.append("type", "bike");
        fd.append("parentId", savedBike.id);
        await fetch("/api/upload", { method: "POST", body: fd });
      }

      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  const typeOptions = [{ value: "", label: "Select type..." }, ...BIKE_TYPES];

  return (
    <Modal
      open
      onClose={onClose}
      title={isEditing ? "Edit Bike" : "Add Bike"}
      maxWidth="max-w-xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
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
          placeholder="e.g. My Surly Bridge Club"
        />

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Type"
            options={typeOptions}
            value={form.type}
            onChange={(e) => set("type", e.target.value as BikeType | "")}
          />
          <Input
            label="Year"
            type="number"
            min="1990"
            max="2030"
            value={form.year}
            onChange={(e) => set("year", e.target.value)}
            placeholder="2024"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <AutocompleteInput
            label="Brand"
            value={form.brand}
            onChange={handleBrandChange}
            suggestions={brandSuggestions}
            placeholder="e.g. Surly"
          />
          <AutocompleteInput
            label="Model"
            value={form.model}
            onChange={handleModelChange}
            suggestions={modelSuggestions}
            placeholder="e.g. Bridge Club"
          />
        </div>

        {/* Hint text when brand is selected and has models in DB */}
        {form.brand && modelSuggestions.length > 0 && !form.model && (
          <p className="text-xs text-muted -mt-2">
            {modelSuggestions.length} model{modelSuggestions.length !== 1 ? "s" : ""} found for {form.brand} — start typing or select from the dropdown.
          </p>
        )}

        <Input
          label="Weight (grams)"
          type="number"
          min="0"
          value={form.weight_grams}
          onChange={(e) => set("weight_grams", e.target.value)}
          placeholder="e.g. 14000"
        />

        <Textarea
          label="Notes"
          value={form.notes}
          onChange={(e) => set("notes", e.target.value)}
          placeholder="Build details, modifications, etc..."
        />

        <div>
          <label className="text-sm font-medium text-slate-text mb-1.5 block">
            Photo
          </label>
          <PhotoUpload
            value={bike?.photos?.find((p) => p.is_primary)?.photo_url}
            onChange={(file) => setPhotoFile(file)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-surface-warm">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={saving}>
            {isEditing ? "Save Changes" : "Add Bike"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export { BikeForm };
export type { BikeTemplate };
