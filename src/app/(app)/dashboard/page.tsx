"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatWeight, formatDate, daysUntil } from "@/lib/utils";
import { CATEGORY_ICONS, GEAR_CATEGORIES, MAINTENANCE_TYPES } from "@/lib/constants";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import type { GearItem, MaintenanceRecord, Bike } from "@/types";

interface MaintenanceWithGear extends MaintenanceRecord {
  gear_items: Pick<GearItem, "id" | "name" | "category">;
}

export default function DashboardPage() {
  const { profile } = useAuth();
  const router = useRouter();
  const supabase = createSupabaseBrowser();

  const [gearCount, setGearCount] = useState(0);
  const [totalWeightGrams, setTotalWeightGrams] = useState(0);
  const [bikeCount, setBikeCount] = useState(0);
  const [recentGear, setRecentGear] = useState<GearItem[]>([]);
  const [maintenanceDue, setMaintenanceDue] = useState<MaintenanceWithGear[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      // Fetch gear items
      const { data: gear } = await supabase
        .from("gear_items")
        .select("*, photos:gear_photos(*)")
        .order("created_at", { ascending: false });

      const items = gear ?? [];
      setGearCount(items.length);
      setTotalWeightGrams(
        items.reduce((sum, item) => sum + (item.weight_grams ?? 0), 0)
      );
      setRecentGear(items.slice(0, 5));

      // Fetch bikes
      const { count } = await supabase
        .from("bikes")
        .select("*", { count: "exact", head: true });
      setBikeCount(count ?? 0);

      // Fetch maintenance records due in next 7 days or overdue
      const { data: maintenance } = await supabase
        .from("maintenance_records")
        .select("*, gear_items(id, name, category)")
        .not("next_due_at", "is", null)
        .lte(
          "next_due_at",
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        )
        .order("next_due_at", { ascending: true });

      setMaintenanceDue((maintenance as MaintenanceWithGear[]) ?? []);
      setLoading(false);
    }

    load();
  }, [supabase]);

  const firstName = profile?.display_name?.split(" ")[0] ?? "there";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-surface-warm border-t-copper" />
      </div>
    );
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-slate-text">
          Hey {firstName}!
        </h1>
        <p className="mt-1 text-sm text-muted">
          Here is your bikepacking gear overview.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card>
          <p className="text-sm text-muted">Total Gear</p>
          <p className="mt-1 text-2xl font-display font-bold text-slate-text">{gearCount}</p>
          <p className="mt-0.5 text-xs text-muted">items</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Total Weight</p>
          <p className="mt-1 text-2xl font-display font-bold text-slate-text">
            {formatWeight(totalWeightGrams)}
          </p>
          <p className="mt-0.5 text-xs text-muted">all gear combined</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Bikes</p>
          <p className="mt-1 text-2xl font-display font-bold text-slate-text">{bikeCount}</p>
          <p className="mt-0.5 text-xs text-muted">in your garage</p>
        </Card>
        <Card>
          <p className="text-sm text-muted">Maintenance Due</p>
          <p className="mt-1 text-2xl font-display font-bold text-slate-text">
            {maintenanceDue.length}
          </p>
          <p className="mt-0.5 text-xs text-muted">items need attention</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Maintenance Due */}
        <div>
          <h2 className="mb-4 text-lg font-display font-semibold text-slate-text">
            Maintenance Due
          </h2>
          {maintenanceDue.length === 0 ? (
            <Card>
              <p className="py-4 text-center text-sm text-muted">
                All gear is up to date. Nice!
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {maintenanceDue.map((record) => {
                const days = daysUntil(record.next_due_at!);
                const isOverdue = days < 0;
                const typeLabel =
                  MAINTENANCE_TYPES.find((t) => t.value === record.type)
                    ?.label ?? record.type;
                const gearIcon =
                  CATEGORY_ICONS[record.gear_items?.category] ?? "📦";

                return (
                  <Card
                    key={record.id}
                    hover
                    onClick={() =>
                      router.push(`/gear/${record.gear_items?.id}`)
                    }
                    className={
                      isOverdue
                        ? "border-red-300 bg-red-50/50"
                        : "border-copper/30 bg-copper/[0.03]"
                    }
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{gearIcon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-text truncate">
                          {record.gear_items?.name}
                        </p>
                        <p className="text-xs text-muted">{typeLabel}</p>
                      </div>
                      <Badge color={isOverdue ? "red" : "copper"}>
                        {isOverdue
                          ? `${Math.abs(days)}d overdue`
                          : days === 0
                          ? "Today"
                          : `${days}d`}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Recent Gear */}
        <div>
          <h2 className="mb-4 text-lg font-display font-semibold text-slate-text">
            Recent Gear
          </h2>
          {recentGear.length === 0 ? (
            <Card>
              <p className="py-4 text-center text-sm text-muted">
                No gear added yet. Start building your inventory!
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {recentGear.map((item) => {
                const icon = CATEGORY_ICONS[item.category] ?? "📦";
                const categoryLabel =
                  GEAR_CATEGORIES.find((c) => c.value === item.category)
                    ?.label ?? item.category;
                const photo =
                  item.photos?.find((p) => p.is_primary) ?? item.photos?.[0];

                return (
                  <Card
                    key={item.id}
                    hover
                    onClick={() => router.push(`/gear/${item.id}`)}
                  >
                    <div className="flex items-center gap-3">
                      {photo ? (
                        <img
                          src={photo.photo_url}
                          alt={item.name}
                          className="h-10 w-10 rounded-lg object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-warm">
                          <span className="text-lg">{icon}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-slate-text truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted">{categoryLabel}</p>
                      </div>
                      {item.weight_grams != null && (
                        <span className="text-xs font-medium text-muted">
                          {formatWeight(item.weight_grams)}
                        </span>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-display font-semibold text-slate-text">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => router.push("/gear")}>
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
            Add Gear
          </Button>
          <Button variant="secondary" onClick={() => router.push("/garage")}>
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
              <circle cx="5.5" cy="17.5" r="3.5" />
              <circle cx="18.5" cy="17.5" r="3.5" />
              <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
            </svg>
            Add Bike
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push("/trips")}
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
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Plan Trip
          </Button>
        </div>
      </div>
    </div>
  );
}
