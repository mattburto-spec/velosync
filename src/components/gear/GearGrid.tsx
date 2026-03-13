"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { GearCard } from "@/components/gear/GearCard";
import { GearForm } from "@/components/gear/GearForm";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { EmptyState } from "@/components/ui/EmptyState";
import { GEAR_CATEGORIES } from "@/lib/constants";
import type { GearItem } from "@/types";

const SORT_OPTIONS = [
  { value: "date", label: "Newest First" },
  { value: "name", label: "Name (A-Z)" },
  { value: "weight-asc", label: "Lightest First" },
  { value: "weight-desc", label: "Heaviest First" },
];

const ALL_CATEGORIES = [{ value: "", label: "All Categories" }, ...GEAR_CATEGORIES];

function GearGrid() {
  const [items, setItems] = useState<GearItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("date");
  const [showForm, setShowForm] = useState(false);

  const fetchGear = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set("category", category);
      const res = await fetch(`/api/gear?${params}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchGear();
  }, [fetchGear]);

  const filtered = useMemo(() => {
    let result = items;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.brand?.toLowerCase().includes(q) ||
          item.model?.toLowerCase().includes(q)
      );
    }

    // Sort
    result = [...result].sort((a, b) => {
      switch (sort) {
        case "name":
          return a.name.localeCompare(b.name);
        case "weight-asc":
          return (a.weight_grams ?? 0) - (b.weight_grams ?? 0);
        case "weight-desc":
          return (b.weight_grams ?? 0) - (a.weight_grams ?? 0);
        case "date":
        default:
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    return result;
  }, [items, search, sort]);

  const handleSaved = () => {
    setShowForm(false);
    fetchGear();
  };

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="sm:w-64">
            <Input
              placeholder="Search gear..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={
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
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              }
            />
          </div>
          <div className="sm:w-44">
            <Select
              options={ALL_CATEGORIES}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div className="sm:w-44">
            <Select
              options={SORT_OPTIONS}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            />
          </div>
        </div>

        <Button
          onClick={() => setShowForm(true)}
          icon={
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
          }
        >
          Add Gear
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-warm border-t-copper" />
        </div>
      ) : filtered.length === 0 ? (
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
              <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0022 16z" />
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
              <line x1="12" y1="22.08" x2="12" y2="12" />
            </svg>
          }
          title="No gear yet"
          description="Start building your inventory by adding your first piece of gear."
          action={
            <Button onClick={() => setShowForm(true)}>Add Your First Gear</Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <GearCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <GearForm
          onClose={() => setShowForm(false)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}

export { GearGrid };
