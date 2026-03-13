"use client";

import { useState, useCallback } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(() => setSidebarOpen((v) => !v), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={closeSidebar}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 left-0 z-50 w-64 lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main area */}
      <div className="lg:pl-64">
        <Header onToggleSidebar={toggleSidebar} />

        <main className="mx-auto max-w-7xl px-4 py-6 pb-24 lg:px-6 lg:py-8 lg:pb-8">
          {children}
        </main>

        <MobileNav />
      </div>
    </div>
  );
}
