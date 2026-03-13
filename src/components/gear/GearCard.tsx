"use client";

import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { formatWeight } from "@/lib/utils";
import { CATEGORY_ICONS, GEAR_CATEGORIES } from "@/lib/constants";
import type { GearItem } from "@/types";
import { useRouter } from "next/navigation";

interface GearCardProps {
  item: GearItem;
}

function GearCard({ item }: GearCardProps) {
  const router = useRouter();
  const primaryPhoto = item.photos?.find((p) => p.is_primary) ?? item.photos?.[0];
  const categoryLabel =
    GEAR_CATEGORIES.find((c) => c.value === item.category)?.label ?? item.category;
  const categoryIcon = CATEGORY_ICONS[item.category] ?? "📦";

  return (
    <Card
      hover
      padding={false}
      className="gear-card overflow-hidden"
      onClick={() => router.push(`/gear/${item.id}`)}
    >
      {/* Photo or placeholder */}
      <div className="relative h-44 bg-surface-warm">
        {primaryPhoto ? (
          <img
            src={primaryPhoto.photo_url}
            alt={item.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-5xl">{categoryIcon}</span>
          </div>
        )}

        {/* Weight badge */}
        {item.weight_grams != null && (
          <div className="absolute bottom-2 right-2">
            <Badge color="forest">{formatWeight(item.weight_grams)}</Badge>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-slate-text truncate">{item.name}</h3>
        {item.brand && (
          <p className="mt-0.5 text-sm text-muted truncate">{item.brand}</p>
        )}
        <div className="mt-2">
          <Badge color="trail">{categoryLabel}</Badge>
        </div>
      </div>
    </Card>
  );
}

export { GearCard };
