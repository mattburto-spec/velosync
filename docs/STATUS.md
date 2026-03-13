# VeloSync — Project Status

**Last updated:** March 14, 2026
**Repo:** `/Users/matt/CWORK/GearDrop`
**URL:** velosync.app (not yet deployed)

---

## Stack

| Layer | Tech | Status |
|-------|------|--------|
| Framework | Next.js 16.1.6 (App Router, Turbopack) | Installed |
| Language | TypeScript 5, React 19.2.3 | Installed |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`) | Configured |
| Database | Supabase (PostgreSQL + Auth + Storage) | **Connected** |
| AI | Anthropic Claude (`@anthropic-ai/sdk ^0.78.0`) | **NOT SET UP** |
| Drag & Drop | `@dnd-kit/core` + `@dnd-kit/sortable` | Installed |
| Fonts | Outfit (display) + DM Sans (body) via next/font | Configured |
| Dev Server | `npm run dev -- -p 3001` | Working |

---

## What's Done (UI/Frontend Only)

### Branding & Design System
- [x] Full "Midnight Trail" color palette (copper, steel, sand, summit, midnight)
- [x] Custom Tailwind v4 `@theme` with all color tokens
- [x] Grain texture overlay, dark scrollbar variant, animations
- [x] All UI primitives styled: Button, Card, Modal, Input, Badge, EmptyState, PhotoUpload

### Landing Page (`/`)
- [x] Full-bleed hero with Unsplash mountain cycling photo + dark gradient overlay
- [x] "Pack lighter. Ride further." headline with copper gradient text
- [x] AI-powered badge, CTA buttons, scroll indicator
- [x] 2-photo cinematic strip (mountain riding shots)
- [x] 4 feature cards with photos (Gear Inventory, Bike Garage, Smart Packing, Collaborate)
- [x] "How it works" 3-step section
- [x] CTA section with background image
- [x] Midnight footer with VeloSync branding

### Auth Pages
- [x] Split-panel login (`/login`) — midnight left panel, warm form right
- [x] Split-panel signup (`/signup`) — same layout, success state
- [x] Auth middleware (`middleware.ts`) — redirects unauthenticated users

### App Layout
- [x] Dark midnight sidebar with copper accents, bike icon logo
- [x] Header with mobile hamburger + VeloSync branding
- [x] Mobile bottom nav (Home, Gear, Garage, Trips)

### Dashboard (`/dashboard`)
- [x] Stats overview, recent activity, maintenance reminders (styled, needs data)

### Gear Section (`/gear`)
- [x] Gear inventory grid with filters, search, category badges
- [x] Gear detail page (`/gear/[itemId]`) with photo gallery, specs, maintenance log
- [x] GearForm modal (add/edit) with photo upload
- [x] GearCard, GearGrid, MaintenanceLog components

### Garage Section (`/garage`)
- [x] **Bike template picker** (empty state) — 6 templates: Touring, Gravel, Mountain, Fat, E-Bike, Custom
- [x] Each template has photo, type/weight badges, bag slot previews
- [x] Clicking template pre-fills the BikeForm
- [x] **Brand/model autocomplete** — 55+ brands, 450+ models in `src/lib/bike-data.ts`
- [x] Selecting a model auto-fills weight and type from database
- [x] Users can still enter custom brands/models
- [x] Bike detail page (`/garage/[bikeId]`) with BagSlotEditor
- [x] BikeCard component

### Trips Section (`/trips`)
- [x] Trip list, TripCard, TripForm (create/edit)
- [x] Trip detail page (`/trips/[tripId]`)
- [x] Packing workspace page (`/trips/[tripId]/pack`) with drag-and-drop components
- [x] Collaboration page (`/trips/[tripId]/collaborate`)
- [x] PackingWorkspace, GearSidebar, BagDropZone, PackingItem, WeightSummary, AISuggestions

### Settings (`/settings`)
- [x] Settings page shell (profile, units, preferences)

### API Routes (code exists but **requires Supabase**)
- [x] `/api/bikes` — CRUD
- [x] `/api/gear` — CRUD
- [x] `/api/trips` — CRUD
- [x] `/api/packing` — Packing list management
- [x] `/api/upload` — Photo upload
- [x] `/api/invite` — Trip collaboration invites
- [x] `/api/auth/callback` — OAuth callback
- [x] `/api/ai/suggest-packing` — AI packing suggestions
- [x] `/api/ai/estimate-weight` — AI weight estimation

### Database Schema
- [x] Full migration at `supabase/migrations/001_initial.sql`
- Tables: users, gear_items, gear_photos, maintenance_records, bikes, bike_photos, bag_slots, trips, trip_members, packing_items, ai_suggestions
- RLS policies defined

---

## What's NOT Done Yet

### Infrastructure
- [x] **Create Supabase project** and get URL + anon key + service role key
- [x] **Create `.env.local`** with Supabase credentials
- [x] **Run migration** `001_initial.sql` against Supabase
- [x] **Auth flow working** — signup, login, session persistence
- [ ] **Set up Supabase Storage** bucket for photo uploads
- [ ] **Get Anthropic API key** and add to `.env.local`
- [ ] **Fix RLS policy** — `trip_members` infinite recursion (SQL fix ready, needs applying)
- [ ] **Test all CRUD operations** — gear, bikes, trips, packing

### Features Not Built
- [ ] Drag-and-drop actually wired to backend (UI components exist, no data flow)
- [ ] AI packing suggestions (API route exists, needs Anthropic key + testing)
- [ ] AI weight estimation (same)
- [ ] Real-time collaboration via Supabase Realtime
- [ ] Photo upload to Supabase Storage (upload component exists, backend needs bucket)
- [ ] Maintenance scheduling & reminders (UI shell exists)
- [ ] Trip weather integration
- [ ] Velo Assistant (AI chat)
- [ ] Export/share packing lists

---

## Environment Variables Needed

Create `/Users/matt/CWORK/GearDrop/.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=sk-ant-your-key
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| `src/app/globals.css` | Full Tailwind v4 theme with all VeloSync tokens |
| `src/lib/bike-data.ts` | 55 brands, 450+ models with weights/types |
| `src/lib/constants.ts` | Categories, bag positions, conditions, terrain/climate options |
| `src/types/index.ts` | All TypeScript interfaces |
| `supabase/migrations/001_initial.sql` | Complete DB schema |
| `src/middleware.ts` | Auth route protection |
| `src/lib/supabase/server.ts` | Supabase SSR client |
| `src/lib/ai/anthropic.ts` | Claude API client |
| `.claude/plans/valiant-waddling-marble.md` | Full roadmap with phases 1-11 |

---

## Dev Server

```bash
cd /Users/matt/CWORK/GearDrop
npm run dev -- -p 3001
```

Or via Claude Preview: server name `velosync-dev` in `.claude/launch.json`

**Note:** Turbopack sometimes caches old CSS. If theme changes don't appear, clear `.next`:
```bash
rm -rf .next && npm run dev -- -p 3001
```
