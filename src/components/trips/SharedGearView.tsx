"use client";

import { useMemo } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { CATEGORY_ICONS, GEAR_CATEGORIES } from "@/lib/constants";
import { formatWeight, initials } from "@/lib/utils";
import type { TripMember, PackingItem, GearItem, User } from "@/types";

interface SharedGearViewProps {
  members: (TripMember & { user?: User })[];
  packingItems: (PackingItem & { gear_item?: GearItem })[];
  unitPreference?: "metric" | "imperial";
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// Categories where having duplicates across members is a potential overlap concern
const SHARED_CONCERN_CATEGORIES = new Set([
  "shelter",
  "cook",
  "tools",
]);

interface MemberPacking {
  member: TripMember & { user?: User };
  items: (PackingItem & { gear_item?: GearItem })[];
  totalWeight: number;
}

interface OverlapWarning {
  category: string;
  categoryLabel: string;
  memberNames: string[];
  itemNames: string[];
}

export function SharedGearView({
  members,
  packingItems,
  unitPreference = "metric",
}: SharedGearViewProps) {
  // Build per-member packing data
  const memberPackings: MemberPacking[] = useMemo(() => {
    return members.map((member) => {
      const items = packingItems.filter(
        (p) => p.packed_by === member.user_id
      );
      const totalWeight = items.reduce((sum, p) => {
        const w = p.gear_item?.weight_grams ?? 0;
        return sum + w * (p.quantity ?? 1);
      }, 0);
      return { member, items, totalWeight };
    });
  }, [members, packingItems]);

  // Detect overlap warnings
  const overlaps: OverlapWarning[] = useMemo(() => {
    const warnings: OverlapWarning[] = [];

    for (const cat of SHARED_CONCERN_CATEGORIES) {
      const membersWithCategory: {
        name: string;
        items: string[];
      }[] = [];

      for (const mp of memberPackings) {
        const catItems = mp.items.filter(
          (p) =>
            p.gear_item?.category === cat && !p.is_shared
        );
        if (catItems.length > 0) {
          membersWithCategory.push({
            name: mp.member.user?.display_name ?? "Unknown",
            items: catItems.map(
              (p) => p.gear_item?.name ?? "Unknown"
            ),
          });
        }
      }

      if (membersWithCategory.length > 1) {
        const catLabel =
          GEAR_CATEGORIES.find((c) => c.value === cat)?.label ?? cat;
        warnings.push({
          category: cat,
          categoryLabel: catLabel,
          memberNames: membersWithCategory.map((m) => m.name),
          itemNames: membersWithCategory.flatMap((m) => m.items),
        });
      }
    }

    return warnings;
  }, [memberPackings]);

  // Group items by category for a given member
  const groupByCategory = (
    items: (PackingItem & { gear_item?: GearItem })[]
  ) => {
    const groups: Record<
      string,
      (PackingItem & { gear_item?: GearItem })[]
    > = {};
    for (const item of items) {
      const cat = item.gear_item?.category ?? "misc";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    }
    return groups;
  };

  if (members.length === 0) {
    return (
      <Card>
        <p className="text-sm text-muted text-center py-4">
          No members to display.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Overlap warnings */}
      {overlaps.length > 0 && (
        <div className="space-y-2">
          {overlaps.map((warning) => (
            <div
              key={warning.category}
              className="flex items-start gap-2 rounded-lg border border-sunset/30 bg-sunset/5 px-4 py-3"
            >
              <WarningIcon className="mt-0.5 shrink-0 text-sunset" />
              <div>
                <p className="text-sm font-medium text-slate-text">
                  Possible overlap: {warning.categoryLabel}
                </p>
                <p className="text-xs text-muted mt-0.5">
                  {warning.memberNames.join(" and ")} are both packing{" "}
                  {warning.categoryLabel.toLowerCase()} items (
                  {warning.itemNames.join(", ")}). Consider sharing to
                  save weight.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Member columns — horizontal scroll on mobile */}
      <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
        {memberPackings.map(({ member, items, totalWeight }) => {
          const displayName =
            member.user?.display_name ?? "Unknown rider";
          const grouped = groupByCategory(items);
          const categoryKeys = Object.keys(grouped).sort();

          return (
            <Card
              key={member.id}
              padding={false}
              className="min-w-[280px] flex-1 shrink-0"
            >
              {/* Member header */}
              <div className="flex items-center gap-3 border-b border-surface-warm px-4 py-3">
                {member.user?.avatar_url ? (
                  <img
                    src={member.user.avatar_url}
                    alt={displayName}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/10 text-xs font-semibold text-copper">
                    {initials(displayName)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-text truncate">
                    {displayName}
                  </p>
                  <p className="text-xs text-muted">
                    {items.length} item{items.length !== 1 && "s"}
                  </p>
                </div>
                <Badge color={member.role === "owner" ? "forest" : "stone"}>
                  {member.role}
                </Badge>
              </div>

              {/* Items by category */}
              <div className="divide-y divide-gray-100">
                {categoryKeys.length === 0 && (
                  <p className="px-4 py-6 text-center text-xs text-muted">
                    Nothing packed yet
                  </p>
                )}
                {categoryKeys.map((cat) => (
                  <div key={cat} className="px-4 py-3">
                    <div className="mb-1.5 flex items-center gap-1.5">
                      <span className="text-sm">
                        {CATEGORY_ICONS[cat] ?? "📦"}
                      </span>
                      <span className="text-xs font-medium text-muted uppercase tracking-wide">
                        {GEAR_CATEGORIES.find((c) => c.value === cat)
                          ?.label ?? cat}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {grouped[cat].map((p) => (
                        <li
                          key={p.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-slate-text truncate">
                            {p.gear_item?.name ?? "Unknown"}
                            {p.is_shared && (
                              <Badge
                                color="sky"
                                className="ml-1.5 text-[10px]"
                              >
                                Shared
                              </Badge>
                            )}
                          </span>
                          <span className="shrink-0 text-xs text-muted ml-2">
                            {formatWeight(
                              p.gear_item?.weight_grams,
                              unitPreference
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Total weight footer */}
              <div className="border-t border-surface-warm bg-gray-50 px-4 py-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted">
                    Total Weight
                  </span>
                  <span className="text-sm font-semibold text-slate-text">
                    {formatWeight(totalWeight, unitPreference)}
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
