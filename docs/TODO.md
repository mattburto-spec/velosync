# VeloSync — Todo List

**Priority order. Work top to bottom.**

---

## Phase 1: Infrastructure Setup ✅ DONE

- [x] Create Supabase project at supabase.com
- [x] Copy project URL, anon key, and service role key
- [x] Create `.env.local` with all 4 env vars (Supabase x3, Anthropic x1)
- [ ] Run `001_initial.sql` migration via Supabase SQL editor or CLI
- [ ] Create a `photos` storage bucket in Supabase (public read, auth write)
- [ ] Set up Supabase Auth — enable email/password provider
- [ ] Optional: enable Google OAuth provider
- [ ] Test signup → should create user in DB and redirect to dashboard
- [ ] Test login → should authenticate and show app layout

## Phase 2: Wire Up CRUD + Integrations

- [ ] Test gear CRUD — add item, edit, delete, list with filters
- [ ] Test bike CRUD — add via template or custom, edit, delete
- [ ] Test photo upload — upload gear/bike photos to Supabase Storage
- [ ] Test bag slot configuration — add/edit/delete bag slots on a bike
- [ ] Test trip CRUD — create trip with destination, dates, terrain, climate
- [ ] Verify all API routes return proper errors for unauthenticated requests
- [ ] Test settings page — update display name, unit preference

### Strava Integration
- [ ] Register VeloSync on Strava developer portal (strava.com/settings/api)
- [ ] Add `STRAVA_CLIENT_ID` and `STRAVA_CLIENT_SECRET` to `.env.local`
- [ ] Build OAuth flow — "Connect Strava" button in Settings, callback handler
- [ ] Store Strava tokens in `users` table (add `strava_access_token`, `strava_refresh_token`, `strava_athlete_id` columns)
- [ ] Auto-refresh expired tokens (6hr expiry, use refresh token)
- [ ] Import bikes from Strava athlete profile → pre-populate garage
- [ ] Sync activity data → auto-log rides as trips (distance, elevation, gear used)
- [ ] Gear distance tracking → show total km per bike from Strava data
- [ ] Periodic background sync (or manual "Sync Now" button)

## Phase 3: Packing Workspace (core feature)

- [ ] Wire drag-and-drop to packing_items table
- [ ] Gear sidebar: load user's gear inventory, make items draggable
- [ ] Bag drop zones: load bike's bag slots, accept dropped items
- [ ] Weight/volume indicators: calculate and display per-bag fill levels
- [ ] Total weight summary: aggregate all packed items
- [ ] Save packing state on drop (create/update packing_items)
- [ ] Remove items from bags (drag back to sidebar or delete)

## Phase 4: AI Packing Intelligence

- [ ] Test AI packing suggestions — given trip + gear inventory, get recommendations
- [ ] Test AI weight estimation — for items without weight data
- [ ] Tune prompts in `src/lib/ai/suggest-packing.ts` and `estimate-weight.ts`
- [ ] Wire AISuggestions component into packing workspace

## Phase 5: Trip Intelligence — Route, Weather & Velo Assistant

### Route Input
- [ ] Add route input to trip creation — destination search (city/region) or GPX file upload
- [ ] Map preview of route (Mapbox GL JS or Leaflet with free tiles)
- [ ] Elevation profile analysis — calculate total ascent, max altitude, terrain difficulty
- [ ] Store route data in trips table (add `route_data` JSONB column, `gpx_url` text)

### Weather Integration
- [ ] Integrate weather API (Open-Meteo — free, no key needed) for trip dates + location
- [ ] Auto-fetch 7-day forecast when trip dates are within range
- [ ] Historical weather averages for trips further out
- [ ] Display weather summary on trip detail page (temp range, precipitation, wind)
- [ ] Store weather snapshot in trips table (`weather_data` JSONB column)

### Velo Assistant (AI Chat)
- [ ] Build Velo Assistant chat UI — slide-out panel or modal on trip pages
- [ ] Claude-powered conversational packing advisor with full context:
  - User's gear inventory (what they own)
  - Current packing list (what's packed vs. unpacked)
  - Trip details (destination, dates, terrain, climate)
  - Weather forecast data
  - Bike setup and bag capacity
- [ ] Context-aware suggestions: "It'll be 2°C at altitude — swap your summer bag for the 0°C rated one"
- [ ] "Ask Velo" quick prompts: "Am I overpacking?", "What am I forgetting?", "Lighter alternatives?"
- [ ] Conversation history stored per trip (add `velo_conversations` table)

### Post-Trip Review
- [ ] Post-trip review flow — mark items as: used, packed-but-unused, wished-I-had
- [ ] Trip journal / notes — freeform notes attached to trips
- [ ] Feed review data back into AI suggestions for future trips

## Phase 6: Collaboration

- [ ] Trip invite system — email or share link
- [ ] Trip members list with roles (owner, member)
- [ ] Shared gear view — who's bringing what
- [ ] Overlap detection — highlight duplicate shared-category items
- [ ] Optional: Supabase Realtime for live collaborative packing

## Phase 7: Maintenance & Lifecycle

- [ ] Maintenance scheduling — set recurring intervals per gear item
- [ ] Dashboard alerts — show overdue and upcoming maintenance
- [ ] Usage tracking — increment trip count per gear item on trip completion

## Phase 8: Loadout Presets & Weight Budget

- [ ] Save packing configuration as reusable preset (name, description, tags)
- [ ] Load preset into any trip with one click
- [ ] Clone and modify existing presets
- [ ] Weight budget mode — set target weight per trip, track progress bar, warn on overage
- [ ] Gear comparison tool — side-by-side compare items in same category (weight, cost, condition)
- [ ] Category weight breakdown — pie/bar chart showing weight distribution

## Phase 9: Gear Wishlist & Upgrade Path

- [ ] Gear wishlist — mark items you want but don't own
- [ ] Track prices and set deal alerts (affiliate links optional)
- [ ] AI upgrade path suggestions — lighter alternatives with weight savings estimates
- [ ] "What if" mode — swap wishlist items into a loadout to see projected weight savings

## Phase 10: Wear Tracking & Lifecycle

- [ ] Usage counters — auto-increment per completed trip
- [ ] Condition degradation estimates based on usage and age
- [ ] Retirement alerts for end-of-life gear
- [ ] Cost-per-use calculations (purchase price / trip count)
- [ ] Replacement history — track what replaced what

## Phase 11: Export, Share & Community

- [ ] PDF/CSV packing list export (branded, shareable)
- [ ] Public shareable loadout links (read-only view)
- [ ] Community gear lists — browse popular setups by trip type
- [ ] Embed widget — share loadout on blog/forum

## Phase 12: Route Gallery & Trip Templates

- [ ] Popular route database — browse by region, difficulty, duration
- [ ] Community-submitted routes with packing recommendations
- [ ] Trip templates — "Weekend gravel overnighter", "2-week touring", etc.
- [ ] Clone a community trip as starting point for your own

## Phase 13: Multi-Bike Loadout Comparison

- [ ] Compare same gear packed across different bikes side-by-side
- [ ] "Which bike for this trip?" — AI suggests best bike from garage based on terrain/distance
- [ ] Per-bike weight history over time

---

## Non-Phase Tasks

- [ ] Mobile responsive pass (375px) — test all pages
- [ ] Deploy to Vercel (or similar)
- [ ] Set up custom domain: velosync.app
- [ ] Add favicon and OG meta images
- [ ] Rename repo folder from `GearDrop` to `VeloSync` (optional, cosmetic)
- [ ] SEO & Open Graph tags for social sharing
- [ ] Dark mode toggle (app already has midnight sidebar, extend to full app)
- [ ] Onboarding tour — first-time user walkthrough
