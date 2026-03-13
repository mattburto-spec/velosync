"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/gear": "Gear",
  "/garage": "Garage",
  "/trips": "Trips",
  "/settings": "Settings",
};

interface HeaderProps {
  onToggleSidebar?: () => void;
}

function Header({ onToggleSidebar }: HeaderProps) {
  const pathname = usePathname();

  const title =
    Object.entries(PAGE_TITLES).find(
      ([path]) => pathname === path || pathname.startsWith(path + "/")
    )?.[1] || "VeloSync";

  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-surface-warm bg-surface/95 backdrop-blur px-4 py-3 lg:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={onToggleSidebar}
        className="rounded-lg p-1.5 text-muted hover:bg-surface-warm lg:hidden"
        aria-label="Toggle menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Mobile logo */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-midnight">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8553D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="5.5" cy="17.5" r="3.5" />
            <circle cx="18.5" cy="17.5" r="3.5" />
            <path d="M15 6a1 1 0 100-2 1 1 0 000 2zm-3 11.5V14l-3-3 4-3 2 3h2" />
          </svg>
        </div>
        <span className="text-lg font-display font-bold text-slate-text tracking-tight">
          VeloSync
        </span>
      </div>

      {/* Desktop page title */}
      <h1 className="hidden lg:block text-xl font-display font-semibold text-slate-text">
        {title}
      </h1>
    </header>
  );
}

export { Header };
