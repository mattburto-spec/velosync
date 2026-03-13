"use client";

import { useState, useEffect, useCallback } from "react";
import { BikeCard } from "@/components/garage/BikeCard";
import { BikeForm, type BikeTemplate } from "@/components/garage/BikeForm";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Bike } from "@/types";

const BIKE_TEMPLATES: (BikeTemplate & {
  id: string;
  image: string;
  description: string;
  bags: string[];
})[] = [
  {
    id: "touring-classic",
    name: "Touring Setup",
    type: "touring",
    brand: "Surly",
    model: "Bridge Club",
    weight_grams: "13600",
    notes: "Classic steel touring frame. Fits wide tires, tons of braze-ons for racks and cages. Great for long-distance loaded touring.",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=500&h=340&fit=crop&q=80",
    description: "Steel touring bike with rack mounts. Built for heavy loads and long distances.",
    bags: ["Rear Panniers", "Front Rack", "Handlebar Bag", "Frame Bag"],
  },
  {
    id: "gravel-ultra",
    name: "Gravel Racer",
    type: "gravel",
    brand: "Salsa",
    model: "Cutthroat",
    weight_grams: "10200",
    notes: "Lightweight gravel bike optimized for mixed terrain bikepacking. Carbon frame, aggressive geometry for fast riding.",
    image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=500&h=340&fit=crop&q=80",
    description: "Lightweight gravel build for fast, mixed-terrain adventures.",
    bags: ["Seat Pack", "Frame Bag", "Top Tube Bag", "Fork Cages"],
  },
  {
    id: "mtb-adventure",
    name: "Mountain Explorer",
    type: "mountain",
    brand: "Trek",
    model: "1120",
    weight_grams: "14100",
    notes: "Full-suspension capable trail bike adapted for bikepacking. Wider tires, dropper post compatible, technical terrain friendly.",
    image: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=500&h=340&fit=crop&q=80",
    description: "Hardtail MTB with bikepacking mounts for singletrack adventures.",
    bags: ["Handlebar Roll", "Frame Bag", "Seat Pack", "Stem Bag"],
  },
  {
    id: "fat-winter",
    name: "Fat Bike Rig",
    type: "fat",
    brand: "Salsa",
    model: "Mukluk",
    weight_grams: "15800",
    notes: "Fat tire bike for snow, sand, and extreme conditions. 4\"+ tires float over soft surfaces. Built for winter bikepacking and remote expeditions.",
    image: "https://images.unsplash.com/photo-1559348349-86f1f65817fe?w=500&h=340&fit=crop&q=80",
    description: "Fat tire setup for snow, sand, and extreme terrain expeditions.",
    bags: ["Frame Bag", "Pogies", "Rear Rack", "Fork Cages"],
  },
  {
    id: "ebike-tourer",
    name: "E-Bike Tourer",
    type: "ebike",
    brand: "Specialized",
    model: "Turbo Vado",
    weight_grams: "22000",
    notes: "Electric-assist touring bike. Extended range battery, integrated motor. Great for hilly terrain or riders who want to cover more ground with gear.",
    image: "https://images.unsplash.com/photo-1571188654248-7a89013e0d00?w=500&h=340&fit=crop&q=80",
    description: "Electric-assist touring for extended range and hilly terrain.",
    bags: ["Rear Panniers", "Handlebar Bag", "Frame Bag", "Top Tube Bag"],
  },
  {
    id: "custom",
    name: "Custom Build",
    type: "",
    brand: "",
    model: "",
    weight_grams: "",
    notes: "",
    image: "",
    description: "Start from scratch and configure everything yourself.",
    bags: [],
  },
];

export default function GaragePage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<BikeTemplate | undefined>();

  const fetchBikes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/bikes");
      if (res.ok) {
        setBikes(await res.json());
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBikes();
  }, [fetchBikes]);

  const handleSaved = () => {
    setShowForm(false);
    setSelectedTemplate(undefined);
    fetchBikes();
  };

  const openWithTemplate = (template: typeof BIKE_TEMPLATES[number]) => {
    if (template.id === "custom") {
      setSelectedTemplate(undefined);
    } else {
      setSelectedTemplate({
        name: template.name,
        type: template.type,
        brand: template.brand,
        model: template.model,
        weight_grams: template.weight_grams,
        notes: template.notes,
      });
    }
    setShowForm(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-slate-text">Garage</h1>
          <p className="mt-1 text-sm text-muted">
            Manage your bikes and bag setups.
          </p>
        </div>
        <Button
          onClick={() => {
            setSelectedTemplate(undefined);
            setShowForm(true);
          }}
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
          Add Bike
        </Button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-warm border-t-copper" />
        </div>
      ) : bikes.length === 0 ? (
        <div>
          {/* Empty state intro */}
          <div className="text-center mb-8">
            <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-copper/10 text-copper mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="5.5" cy="17.5" r="3.5" />
                <circle cx="18.5" cy="17.5" r="3.5" />
                <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
              </svg>
            </div>
            <h2 className="text-xl font-display font-semibold text-slate-text">
              Start with a template or build your own
            </h2>
            <p className="mt-2 text-sm text-muted max-w-md mx-auto">
              Choose a popular bikepacking setup as a starting point, or create a completely custom build. You can always edit everything later.
            </p>
          </div>

          {/* Template grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {BIKE_TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => openWithTemplate(template)}
                className="group text-left rounded-2xl border border-surface-warm bg-white overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-midnight/5 hover:border-copper/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2"
              >
                {/* Image or custom icon */}
                <div className="relative h-40 bg-surface-warm overflow-hidden">
                  {template.image ? (
                    <>
                      <img
                        src={template.image}
                        alt={template.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    </>
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-copper/10 text-copper">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Type badge */}
                  {template.type && (
                    <div className="absolute top-3 left-3">
                      <Badge color="copper">
                        {template.type.charAt(0).toUpperCase() + template.type.slice(1)}
                      </Badge>
                    </div>
                  )}

                  {/* Weight badge */}
                  {template.weight_grams && (
                    <div className="absolute bottom-3 right-3">
                      <Badge color="summit">
                        {(parseInt(template.weight_grams) / 1000).toFixed(1)} kg
                      </Badge>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-display font-semibold text-slate-text">
                    {template.name}
                  </h3>
                  {template.brand && (
                    <p className="mt-0.5 text-sm text-muted">
                      {template.brand} {template.model}
                    </p>
                  )}
                  <p className="mt-2 text-xs text-muted leading-relaxed">
                    {template.description}
                  </p>

                  {/* Bag previews */}
                  {template.bags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {template.bags.map((bag) => (
                        <span
                          key={bag}
                          className="inline-flex items-center rounded-md bg-surface px-2 py-0.5 text-[10px] font-medium text-muted"
                        >
                          {bag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      )}

      {showForm && (
        <BikeForm
          template={selectedTemplate}
          onClose={() => {
            setShowForm(false);
            setSelectedTemplate(undefined);
          }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
