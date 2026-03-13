"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatWeight } from "@/lib/utils";
import { BIKE_TYPES } from "@/lib/constants";
import type { Bike } from "@/types";
import { useRouter } from "next/navigation";

interface BikeCardProps {
  bike: Bike;
}

function BikeCard({ bike }: BikeCardProps) {
  const router = useRouter();
  const primaryPhoto =
    bike.photos?.find((p) => p.is_primary) ?? bike.photos?.[0];
  const typeLabel =
    BIKE_TYPES.find((t) => t.value === bike.type)?.label ?? bike.type;
  const bagCount = bike.bag_slots?.length ?? 0;

  return (
    <Card
      hover
      padding={false}
      className="gear-card overflow-hidden"
      onClick={() => router.push(`/garage/${bike.id}`)}
    >
      {/* Photo or placeholder */}
      <div className="relative h-44 bg-surface-warm">
        {primaryPhoto ? (
          <img
            src={primaryPhoto.photo_url}
            alt={bike.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
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

        {/* Weight badge */}
        {bike.weight_grams != null && (
          <div className="absolute bottom-2 right-2">
            <Badge color="forest">{formatWeight(bike.weight_grams)}</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-text truncate">{bike.name}</h3>
        {bike.brand && (
          <p className="mt-0.5 text-sm text-muted truncate">
            {bike.brand}
            {bike.model ? ` ${bike.model}` : ""}
          </p>
        )}
        <div className="mt-2 flex items-center gap-2">
          {typeLabel && <Badge color="sky">{typeLabel}</Badge>}
          {bagCount > 0 && (
            <Badge color="trail">
              {bagCount} bag{bagCount !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}

export { BikeCard };
