"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import { searchGearDatabase, type GearEntry } from "@/lib/gear-data";
import { CATEGORY_ICONS } from "@/lib/constants";
import { formatWeight } from "@/lib/utils";

interface SmartGearSearchProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (entry: GearEntry) => void;
  onAiIdentify?: (query: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  aiLoading?: boolean;
}

export function SmartGearSearch({
  value,
  onChange,
  onSelect,
  onAiIdentify,
  label = "Gear Name",
  placeholder = "Start typing to search 275+ items...",
  error,
  aiLoading = false,
}: SmartGearSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<GearEntry[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const search = useCallback((query: string) => {
    const matches = searchGearDatabase(query, 8);
    setResults(matches);
    setIsOpen(query.length >= 2);
    setHighlightedIndex(-1);
  }, []);

  useEffect(() => {
    search(value);
  }, [value, search]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen) return;

    const totalItems = results.length + (onAiIdentify && value.length >= 3 ? 1 : 0);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % totalItems);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((i) => (i - 1 + totalItems) % totalItems);
    } else if (e.key === "Enter" && highlightedIndex >= 0) {
      e.preventDefault();
      if (highlightedIndex < results.length) {
        handleSelect(results[highlightedIndex]);
      } else if (onAiIdentify) {
        onAiIdentify(value);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  }

  function handleSelect(entry: GearEntry) {
    onChange(entry.name);
    onSelect(entry);
    setIsOpen(false);
  }

  const showAiOption = onAiIdentify && value.length >= 3 && results.length < 4;

  return (
    <div ref={containerRef} className="relative flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-slate-text">{label}</label>
      )}

      <div className="relative">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
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
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => value.length >= 2 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          className={cn(
            "w-full rounded-lg border bg-white pl-10 pr-3 py-2 text-sm text-slate-text placeholder:text-muted/50 transition-colors",
            "focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/15",
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/20"
              : "border-surface-warm"
          )}
        />
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}

      {/* Dropdown */}
      {isOpen && (results.length > 0 || showAiOption) && (
        <div className="absolute left-0 right-0 top-full z-50 mt-1 max-h-80 overflow-y-auto rounded-lg border border-surface-warm bg-white shadow-lg">
          {results.map((entry, idx) => {
            const icon = CATEGORY_ICONS[entry.category] ?? "📦";
            const isHighlighted = idx === highlightedIndex;

            return (
              <button
                key={`${entry.brand}-${entry.name}`}
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(entry);
                }}
                onMouseEnter={() => setHighlightedIndex(idx)}
                className={cn(
                  "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors",
                  isHighlighted ? "bg-copper/5" : "hover:bg-surface",
                  idx > 0 && "border-t border-surface-warm/50"
                )}
              >
                <span className="text-lg flex-shrink-0">{icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-text truncate">
                      {entry.brand} {entry.name}
                    </span>
                  </div>
                  {entry.description && (
                    <p className="text-xs text-muted truncate">
                      {entry.description}
                    </p>
                  )}
                </div>
                <span className="flex-shrink-0 text-xs font-medium text-copper tabular-nums">
                  {formatWeight(entry.weight_grams)}
                </span>
              </button>
            );
          })}

          {/* AI Identify option */}
          {showAiOption && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                onAiIdentify(value);
                setIsOpen(false);
              }}
              onMouseEnter={() => setHighlightedIndex(results.length)}
              className={cn(
                "flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors border-t border-surface-warm",
                highlightedIndex === results.length
                  ? "bg-copper/5"
                  : "hover:bg-surface"
              )}
            >
              <span className="text-lg flex-shrink-0">
                {aiLoading ? (
                  <svg
                    className="h-5 w-5 animate-spin text-copper"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                ) : (
                  "✨"
                )}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm font-medium text-copper">
                  {aiLoading
                    ? "Identifying gear..."
                    : `Ask AI about "${value}"`}
                </span>
                <p className="text-xs text-muted">
                  {aiLoading
                    ? "Estimating weight, category, and details"
                    : "AI will estimate weight, category, and details"}
                </p>
              </div>
            </button>
          )}

          {/* No results message */}
          {results.length === 0 && !showAiOption && value.length >= 2 && (
            <div className="px-3 py-4 text-center text-sm text-muted">
              No matches found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
