"use client";

import { cn } from "@/lib/utils";
import { useState, useRef, useCallback, useEffect, type DragEvent } from "react";
import imageCompression from "browser-image-compression";

interface PhotoUploadProps {
  value?: string | null;
  onChange: (file: File | null, previewUrl: string | null) => void;
  className?: string;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  accept?: string;
  /** Auto-populated placeholder image (e.g. category SVG) */
  placeholderUrl?: string | null;
  /** URL to open Google Images search for this product */
  searchUrl?: string | null;
  /** Label shown on the search link */
  searchLabel?: string;
}

function PhotoUpload({
  value,
  onChange,
  className,
  maxSizeMB = 1,
  maxWidthOrHeight = 1920,
  accept = "image/*",
  placeholderUrl,
  searchUrl,
  searchLabel,
}: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUserPhoto, setIsUserPhoto] = useState(!!value);
  const [dragging, setDragging] = useState(false);
  const [compressing, setCompressing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // When placeholderUrl changes and user hasn't uploaded their own, show it
  useEffect(() => {
    if (placeholderUrl && !isUserPhoto) {
      setPreview(placeholderUrl);
    }
  }, [placeholderUrl, isUserPhoto]);

  const processFile = useCallback(
    async (file: File) => {
      setCompressing(true);
      try {
        const compressed = await imageCompression(file, {
          maxSizeMB,
          maxWidthOrHeight,
          useWebWorker: true,
        });
        const url = URL.createObjectURL(compressed);
        setPreview(url);
        setIsUserPhoto(true);
        onChange(compressed, url);
      } catch {
        const url = URL.createObjectURL(file);
        setPreview(url);
        setIsUserPhoto(true);
        onChange(file, url);
      } finally {
        setCompressing(false);
      }
    },
    [maxSizeMB, maxWidthOrHeight, onChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const handleRemove = () => {
    setPreview(placeholderUrl || null);
    setIsUserPhoto(false);
    onChange(null, null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const showPlaceholder = preview && !isUserPhoto;
  const showUserPhoto = preview && isUserPhoto;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {showUserPhoto ? (
        /* User-uploaded photo */
        <div className="relative group">
          <img
            src={preview}
            alt="Upload preview"
            className="w-full h-48 object-cover rounded-lg border border-surface-warm"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 rounded-full bg-black/60 p-1.5 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/80"
            aria-label="Remove photo"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      ) : showPlaceholder ? (
        /* Category placeholder with overlay actions */
        <div className="relative group cursor-pointer" onClick={() => fileRef.current?.click()}>
          <img
            src={preview}
            alt="Category placeholder"
            className="w-full h-48 object-cover rounded-lg border border-surface-warm"
          />
          {/* Overlay with upload + search actions */}
          <div className="absolute inset-0 rounded-lg bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
            <button
              type="button"
              className="rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-white transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                fileRef.current?.click();
              }}
            >
              <span className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                </svg>
                Upload
              </span>
            </button>
            {searchUrl && (
              <a
                href={searchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-white transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="flex items-center gap-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                  Find photo
                </span>
              </a>
            )}
          </div>
        </div>
      ) : (
        /* Empty state — drag & drop */
        <div
          onClick={() => fileRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "flex h-48 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-colors",
            dragging
              ? "border-copper bg-copper/5"
              : "border-gray-300 hover:border-copper/50 hover:bg-surface"
          )}
        >
          {compressing ? (
            <div className="flex flex-col items-center gap-2 text-muted">
              <svg className="animate-spin" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
              <span className="text-sm">Compressing...</span>
            </div>
          ) : (
            <>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <p className="text-sm text-muted">
                <span className="font-medium text-copper">Click to upload</span>{" "}
                or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, WebP up to {maxSizeMB}MB</p>
            </>
          )}
        </div>
      )}

      {/* Search link below photo when placeholder is showing */}
      {showPlaceholder && searchUrl && (
        <a
          href={searchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs text-copper hover:text-copper/80 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          {searchLabel || "Search for product photo"}
        </a>
      )}

      <input
        ref={fileRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload photo"
      />
    </div>
  );
}

export { PhotoUpload, type PhotoUploadProps };
