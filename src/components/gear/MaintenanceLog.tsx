"use client";

import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { formatDate, formatCurrency, daysUntil, cn } from "@/lib/utils";
import { MAINTENANCE_TYPES } from "@/lib/constants";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import type { MaintenanceRecord, MaintenanceType } from "@/types";

interface MaintenanceLogProps {
  gearItemId: string;
}

interface FormState {
  type: MaintenanceType;
  description: string;
  performed_at: string;
  cost: string;
  next_due_at: string;
  interval_days: string;
}

const emptyForm: FormState = {
  type: "cleaning",
  description: "",
  performed_at: new Date().toISOString().split("T")[0],
  cost: "",
  next_due_at: "",
  interval_days: "",
};

function MaintenanceLog({ gearItemId }: MaintenanceLogProps) {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);

  const supabase = createSupabaseBrowser();

  const fetchRecords = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase
      .from("maintenance_records")
      .select("*")
      .eq("gear_item_id", gearItemId)
      .order("performed_at", { ascending: false });

    setRecords(data ?? []);
    setLoading(false);
  }, [gearItemId, supabase]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      gear_item_id: gearItemId,
      type: form.type,
      description: form.description.trim() || null,
      performed_at: form.performed_at,
      cost: form.cost ? parseFloat(form.cost) : null,
      next_due_at: form.next_due_at || null,
      interval_days: form.interval_days ? parseInt(form.interval_days) : null,
    };

    const { error } = await supabase
      .from("maintenance_records")
      .insert(payload);

    if (!error) {
      setForm(emptyForm);
      setShowForm(false);
      fetchRecords();
    }

    setSaving(false);
  };

  const getTypeLabel = (type: string) =>
    MAINTENANCE_TYPES.find((t) => t.value === type)?.label ?? type;

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-surface-warm border-t-copper" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-text">
          Maintenance History
        </h3>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? "Cancel" : "Add Record"}
        </Button>
      </div>

      {/* Add form */}
      {showForm && (
        <Card className="mb-4">
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Select
                label="Type"
                options={MAINTENANCE_TYPES}
                value={form.type}
                onChange={(e) => set("type", e.target.value as MaintenanceType)}
              />
              <Input
                label="Date Performed"
                type="date"
                value={form.performed_at}
                onChange={(e) => set("performed_at", e.target.value)}
                required
              />
            </div>

            <Textarea
              label="Description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="What was done..."
            />

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Cost ($)"
                type="number"
                step="0.01"
                min="0"
                value={form.cost}
                onChange={(e) => set("cost", e.target.value)}
                placeholder="0.00"
              />
              <Input
                label="Next Due"
                type="date"
                value={form.next_due_at}
                onChange={(e) => set("next_due_at", e.target.value)}
              />
              <Input
                label="Interval (days)"
                type="number"
                min="1"
                value={form.interval_days}
                onChange={(e) => set("interval_days", e.target.value)}
                placeholder="e.g. 90"
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" size="sm" loading={saving}>
                Save Record
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Records list */}
      {records.length === 0 ? (
        <p className="py-8 text-center text-sm text-muted">
          No maintenance records yet
        </p>
      ) : (
        <div className="space-y-3">
          {records.map((record) => {
            const days = record.next_due_at
              ? daysUntil(record.next_due_at)
              : null;
            const isOverdue = days != null && days < 0;
            const isDueSoon = days != null && days >= 0 && days <= 7;

            return (
              <Card
                key={record.id}
                className={cn(
                  isOverdue && "border-red-300 bg-red-50/50",
                  isDueSoon && "border-amber-300 bg-amber-50/50"
                )}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm text-slate-text">
                        {getTypeLabel(record.type)}
                      </span>
                      {isOverdue && <Badge color="red">Overdue</Badge>}
                      {isDueSoon && <Badge color="sunset">Due Soon</Badge>}
                    </div>
                    {record.description && (
                      <p className="mt-1 text-sm text-muted">
                        {record.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right text-xs text-muted">
                    <p>{formatDate(record.performed_at)}</p>
                    {record.cost != null && (
                      <p className="mt-0.5">{formatCurrency(record.cost)}</p>
                    )}
                  </div>
                </div>

                {record.next_due_at && (
                  <p className="mt-2 text-xs text-muted">
                    Next due: {formatDate(record.next_due_at)}
                    {record.interval_days && (
                      <span> (every {record.interval_days} days)</span>
                    )}
                  </p>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export { MaintenanceLog };
