"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { GearForm } from "@/components/gear/GearForm";
import { MaintenanceLog } from "@/components/gear/MaintenanceLog";
import { formatWeight, formatCurrency, formatDate, cn } from "@/lib/utils";
import { GEAR_CATEGORIES, GEAR_CONDITIONS, CATEGORY_ICONS } from "@/lib/constants";
import type { GearItem } from "@/types";

interface GearDetailProps {
  item: GearItem;
}

type Tab = "photos" | "maintenance";

function GearDetail({ item: initialItem }: GearDetailProps) {
  const router = useRouter();
  const [item, setItem] = useState(initialItem);
  const [activeTab, setActiveTab] = useState<Tab>("photos");
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos = item.photos ?? [];
  const categoryLabel =
    GEAR_CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category;
  const conditionLabel =
    GEAR_CONDITIONS.find((c) => c.value === item.condition)?.label ?? item.condition;
  const categoryIcon = CATEGORY_ICONS[item.category] ?? "📦";

  const refreshItem = useCallback(async () => {
    const res = await fetch(`/api/gear?category=`);
    if (res.ok) {
      const data: GearItem[] = await res.json();
      const updated = data.find((g) => g.id === item.id);
      if (updated) setItem(updated);
    }
  }, [item.id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/gear?id=${item.id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/gear");
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleSaved = () => {
    setShowEdit(false);
    refreshItem();
  };

  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % photos.length);
  const prevPhoto = () =>
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => router.push("/gear")}
        className="mb-4 flex items-center gap-1.5 text-sm text-muted hover:text-slate-text transition-colors"
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
        Back to Gear
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Photo gallery */}
        <div className="lg:col-span-2">
          <Card padding={false} className="overflow-hidden">
            {photos.length > 0 ? (
              <div className="relative">
                <img
                  src={photos[photoIndex].photo_url}
                  alt={item.name}
                  className="h-80 w-full object-cover sm:h-96"
                />
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                      aria-label="Previous photo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                      </svg>
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                      aria-label="Next photo"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {photos.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setPhotoIndex(i)}
                          className={cn(
                            "h-2 w-2 rounded-full transition-colors",
                            i === photoIndex
                              ? "bg-white"
                              : "bg-white/50 hover:bg-white/75"
                          )}
                          aria-label={`Photo ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center bg-surface-warm">
                <span className="text-7xl">{categoryIcon}</span>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Info */}
        <div>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-text">{item.name}</h1>
                {item.brand && (
                  <p className="mt-0.5 text-muted">
                    {item.brand}
                    {item.model ? ` ${item.model}` : ""}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowEdit(true)}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  }
                >
                  Edit
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowDelete(true)}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-2 14a2 2 0 01-2 2H9a2 2 0 01-2-2L5 6m5 0V4a1 1 0 011-1h2a1 1 0 011 1v2" />
                    </svg>
                  }
                >
                  <span className="text-red-500">Delete</span>
                </Button>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Badge color="trail">{categoryLabel}</Badge>
              <Badge
                color={
                  item.condition === "needs-repair"
                    ? "sunset"
                    : item.condition === "worn"
                    ? "stone"
                    : "forest"
                }
              >
                {conditionLabel}
              </Badge>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              {item.weight_grams != null && (
                <div className="flex justify-between">
                  <dt className="text-muted">Weight</dt>
                  <dd className="font-medium text-slate-text">
                    {formatWeight(item.weight_grams)}
                  </dd>
                </div>
              )}
              {item.dimensions_mm && (
                <div className="flex justify-between">
                  <dt className="text-muted">Dimensions</dt>
                  <dd className="font-medium text-slate-text">
                    {item.dimensions_mm.length} x {item.dimensions_mm.width} x{" "}
                    {item.dimensions_mm.height} mm
                  </dd>
                </div>
              )}
              {item.purchase_price != null && (
                <div className="flex justify-between">
                  <dt className="text-muted">Price</dt>
                  <dd className="font-medium text-slate-text">
                    {formatCurrency(item.purchase_price)}
                  </dd>
                </div>
              )}
              {item.purchase_date && (
                <div className="flex justify-between">
                  <dt className="text-muted">Purchased</dt>
                  <dd className="font-medium text-slate-text">
                    {formatDate(item.purchase_date)}
                  </dd>
                </div>
              )}
            </dl>

            {item.notes && (
              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-sm text-muted">{item.notes}</p>
              </div>
            )}

            {item.purchase_url && (
              <div className="mt-4">
                <a
                  href={item.purchase_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-copper hover:underline"
                >
                  View product page &rarr;
                </a>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8">
        <div className="flex gap-1 border-b border-surface-warm">
          {(["photos", "maintenance"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px",
                activeTab === tab
                  ? "border-copper text-copper"
                  : "border-transparent text-muted hover:text-slate-text"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === "photos" && (
            <div>
              {photos.length === 0 ? (
                <p className="py-8 text-center text-sm text-muted">
                  No photos yet
                </p>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {photos.map((photo, i) => (
                    <button
                      key={photo.id}
                      onClick={() => setPhotoIndex(i)}
                      className={cn(
                        "overflow-hidden rounded-lg border-2 transition-colors",
                        i === photoIndex
                          ? "border-copper"
                          : "border-transparent hover:border-gray-300"
                      )}
                    >
                      <img
                        src={photo.photo_url}
                        alt={`${item.name} photo ${i + 1}`}
                        className="h-32 w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "maintenance" && (
            <MaintenanceLog gearItemId={item.id} />
          )}
        </div>
      </div>

      {/* Edit modal */}
      {showEdit && (
        <GearForm
          item={item}
          onClose={() => setShowEdit(false)}
          onSaved={handleSaved}
        />
      )}

      {/* Delete confirmation */}
      <Modal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Gear"
      >
        <p className="text-sm text-muted">
          Are you sure you want to delete <strong>{item.name}</strong>? This
          action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" loading={deleting} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export { GearDetail };
