"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createSupabaseBrowser } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { authUser, profile } = useAuth();
  const supabase = createSupabaseBrowser();

  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [unitPreference, setUnitPreference] = useState<"metric" | "imperial">(
    "metric"
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Populate from profile
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.display_name ?? "");
      setAvatarUrl(profile.avatar_url ?? "");
      setUnitPreference(profile.unit_preference ?? "metric");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!authUser) return;

    setSaving(true);
    setMessage(null);

    const { error } = await supabase
      .from("users")
      .update({
        display_name: displayName.trim() || null,
        avatar_url: avatarUrl.trim() || null,
        unit_preference: unitPreference,
      })
      .eq("id", authUser.id);

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Settings saved!" });
    }

    setSaving(false);
  };

  if (!authUser) {
    return (
      <div className="flex h-[calc(100vh-120px)] items-center justify-center">
        <p className="text-muted">Please sign in to view settings.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <h1 className="text-lg font-semibold text-slate-text">Settings</h1>

      <Card>
        <div className="space-y-5">
          {/* Display name */}
          <Input
            label="Display Name"
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />

          {/* Avatar URL */}
          <Input
            label="Avatar URL"
            placeholder="https://example.com/avatar.jpg"
            type="url"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />

          {/* Avatar preview */}
          {avatarUrl && (
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl}
                alt="Avatar preview"
                className="h-12 w-12 rounded-full object-cover border border-surface-warm"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
              <span className="text-xs text-muted">Preview</span>
            </div>
          )}

          {/* Unit preference toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-text">
              Weight Units
            </label>
            <div className="inline-flex rounded-lg border border-gray-300 bg-gray-50 p-0.5">
              <button
                type="button"
                onClick={() => setUnitPreference("metric")}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                  unitPreference === "metric"
                    ? "bg-white text-copper shadow-sm"
                    : "text-muted hover:text-slate-text"
                )}
              >
                Metric (g / kg)
              </button>
              <button
                type="button"
                onClick={() => setUnitPreference("imperial")}
                className={cn(
                  "rounded-md px-4 py-1.5 text-sm font-medium transition-colors",
                  unitPreference === "imperial"
                    ? "bg-white text-copper shadow-sm"
                    : "text-muted hover:text-slate-text"
                )}
              >
                Imperial (oz / lb)
              </button>
            </div>
          </div>

          {/* Email (read-only) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-text">
              Email
            </label>
            <p className="rounded-lg border border-surface-warm bg-gray-50 px-3 py-2 text-sm text-muted">
              {authUser.email}
            </p>
          </div>
        </div>

        {/* Save button + message */}
        <div className="mt-6 flex items-center gap-3">
          <Button onClick={handleSave} loading={saving}>
            Save Settings
          </Button>

          {message && (
            <span
              className={cn(
                "text-sm",
                message.type === "success" ? "text-copper" : "text-red-600"
              )}
            >
              {message.text}
            </span>
          )}
        </div>
      </Card>
    </div>
  );
}
