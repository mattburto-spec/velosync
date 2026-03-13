"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { BikeForm } from "@/components/garage/BikeForm";
import { BagSlotEditor } from "@/components/garage/BagSlotEditor";
import { formatWeight, cn } from "@/lib/utils";
import { BIKE_TYPES, BAG_POSITIONS } from "@/lib/constants";
import type { Bike, BagSlot } from "@/types";

interface BikeDetailProps {
  bike: Bike;
}

function BikeDetail({ bike: initialBike }: BikeDetailProps) {
  const router = useRouter();
  const [bike, setBike] = useState(initialBike);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showSlotEditor, setShowSlotEditor] = useState(false);
  const [editingSlot, setEditingSlot] = useState<BagSlot | undefined>();
  const [deleting, setDeleting] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const photos = bike.photos ?? [];
  const slots = bike.bag_slots ?? [];
  const typeLabel =
    BIKE_TYPES.find((t) => t.value === bike.type)?.label ?? bike.type;

  const refreshBike = useCallback(async () => {
    const res = await fetch("/api/bikes");
    if (res.ok) {
      const data: Bike[] = await res.json();
      const updated = data.find((b) => b.id === bike.id);
      if (updated) setBike(updated);
    }
  }, [bike.id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/bikes?id=${bike.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        router.push("/garage");
      }
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteSlot = async (slotId: string) => {
    await fetch(`/api/bikes?action=delete-slot&id=${slotId}`, {
      method: "DELETE",
    });
    refreshBike();
  };

  const handleSaved = () => {
    setShowEdit(false);
    refreshBike();
  };

  const handleSlotSaved = () => {
    setShowSlotEditor(false);
    setEditingSlot(undefined);
    refreshBike();
  };

  const openEditSlot = (slot: BagSlot) => {
    setEditingSlot(slot);
    setShowSlotEditor(true);
  };

  const openAddSlot = () => {
    setEditingSlot(undefined);
    setShowSlotEditor(true);
  };

  const nextPhoto = () => setPhotoIndex((i) => (i + 1) % photos.length);
  const prevPhoto = () =>
    setPhotoIndex((i) => (i - 1 + photos.length) % photos.length);

  const getPositionLabel = (pos: string) =>
    BAG_POSITIONS.find((p) => p.value === pos)?.label ?? pos;

  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => router.push("/garage")}
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
        Back to Garage
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left: Photo gallery */}
        <div className="lg:col-span-2">
          <Card padding={false} className="overflow-hidden">
            {photos.length > 0 ? (
              <div className="relative">
                <img
                  src={photos[photoIndex].photo_url}
                  alt={bike.name}
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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="72"
                  height="72"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-300"
                >
                  <circle cx="5.5" cy="17.5" r="3.5" />
                  <circle cx="18.5" cy="17.5" r="3.5" />
                  <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
                </svg>
              </div>
            )}
          </Card>
        </div>

        {/* Right: Info */}
        <div>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-xl font-bold text-slate-text">
                  {bike.name}
                </h1>
                {bike.brand && (
                  <p className="mt-0.5 text-muted">
                    {bike.brand}
                    {bike.model ? ` ${bike.model}` : ""}
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
              {typeLabel && <Badge color="sky">{typeLabel}</Badge>}
              {bike.year && <Badge color="stone">{bike.year}</Badge>}
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              {bike.weight_grams != null && (
                <div className="flex justify-between">
                  <dt className="text-muted">Weight</dt>
                  <dd className="font-medium text-slate-text">
                    {formatWeight(bike.weight_grams)}
                  </dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted">Bag Slots</dt>
                <dd className="font-medium text-slate-text">{slots.length}</dd>
              </div>
            </dl>

            {bike.notes && (
              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="text-sm text-muted">{bike.notes}</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Bag Slots */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-text">Bag Slots</h2>
          <Button size="sm" onClick={openAddSlot}>
            Add Bag Slot
          </Button>
        </div>

        {slots.length === 0 ? (
          <Card>
            <p className="py-4 text-center text-sm text-muted">
              No bag slots configured yet. Add your bags and racks to start
              planning your packing.
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {slots.map((slot) => (
              <Card key={slot.id}>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-sm text-slate-text">
                      {slot.name}
                    </h3>
                    <Badge color="trail" className="mt-1">
                      {getPositionLabel(slot.position)}
                    </Badge>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEditSlot(slot)}
                      className="rounded p-1 text-muted hover:bg-surface-warm transition-colors"
                      aria-label="Edit slot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="rounded p-1 text-red-400 hover:bg-red-50 transition-colors"
                      aria-label="Delete slot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>
                </div>

                <dl className="mt-3 space-y-1.5 text-xs">
                  {slot.max_volume_ml != null && (
                    <div className="flex justify-between">
                      <dt className="text-muted">Volume</dt>
                      <dd className="text-slate-text">
                        {(slot.max_volume_ml / 1000).toFixed(1)} L
                      </dd>
                    </div>
                  )}
                  {slot.max_weight_grams != null && (
                    <div className="flex justify-between">
                      <dt className="text-muted">Max Weight</dt>
                      <dd className="text-slate-text">
                        {formatWeight(slot.max_weight_grams)}
                      </dd>
                    </div>
                  )}
                  {slot.brand && (
                    <div className="flex justify-between">
                      <dt className="text-muted">Brand</dt>
                      <dd className="text-slate-text">
                        {slot.brand}
                        {slot.model ? ` ${slot.model}` : ""}
                      </dd>
                    </div>
                  )}
                  {slot.color && (
                    <div className="flex justify-between">
                      <dt className="text-muted">Color</dt>
                      <dd className="text-slate-text">{slot.color}</dd>
                    </div>
                  )}
                </dl>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Edit bike modal */}
      {showEdit && (
        <BikeForm
          bike={bike}
          onClose={() => setShowEdit(false)}
          onSaved={handleSaved}
        />
      )}

      {/* Bag slot editor */}
      {showSlotEditor && (
        <BagSlotEditor
          bikeId={bike.id}
          slot={editingSlot}
          onClose={() => {
            setShowSlotEditor(false);
            setEditingSlot(undefined);
          }}
          onSaved={handleSlotSaved}
        />
      )}

      {/* Delete confirmation */}
      <Modal
        open={showDelete}
        onClose={() => setShowDelete(false)}
        title="Delete Bike"
      >
        <p className="text-sm text-muted">
          Are you sure you want to delete <strong>{bike.name}</strong>? All bag
          slots will also be deleted. This action cannot be undone.
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

export { BikeDetail };
