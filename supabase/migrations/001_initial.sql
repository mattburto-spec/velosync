-- ============================================================
-- GearDrop — Initial Schema
-- ============================================================

-- Enable UUID generation
create extension if not exists "uuid-ossp";

-- ============================================================
-- Users (extends auth.users)
-- ============================================================
create table users (
  id uuid primary key references auth.users on delete cascade,
  display_name text,
  avatar_url text,
  unit_preference text not null default 'metric' check (unit_preference in ('metric', 'imperial')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table users enable row level security;

create policy "Users can view own profile" on users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on users
  for update using (auth.uid() = id);

-- Auto-create user row on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Gear Items
-- ============================================================
create table gear_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  category text not null check (category in ('shelter', 'sleep', 'cook', 'clothing', 'tools', 'electronics', 'hydration', 'food', 'misc')),
  brand text,
  model text,
  weight_grams int,
  dimensions_mm jsonb,
  purchase_price decimal(10, 2),
  purchase_date date,
  purchase_url text,
  condition text not null default 'good' check (condition in ('new', 'good', 'worn', 'needs-repair')),
  notes text,
  is_consumable boolean not null default false,
  is_shared boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_gear_items_user on gear_items(user_id);
create index idx_gear_items_category on gear_items(user_id, category);

alter table gear_items enable row level security;

create policy "Users can manage own gear" on gear_items
  for all using (auth.uid() = user_id);

-- ============================================================
-- Gear Photos
-- ============================================================
create table gear_photos (
  id uuid primary key default uuid_generate_v4(),
  gear_item_id uuid not null references gear_items(id) on delete cascade,
  photo_url text not null,
  storage_path text not null,
  is_primary boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_gear_photos_item on gear_photos(gear_item_id);

alter table gear_photos enable row level security;

create policy "Users can manage own gear photos" on gear_photos
  for all using (
    exists (select 1 from gear_items where gear_items.id = gear_photos.gear_item_id and gear_items.user_id = auth.uid())
  );

-- ============================================================
-- Maintenance Records
-- ============================================================
create table maintenance_records (
  id uuid primary key default uuid_generate_v4(),
  gear_item_id uuid not null references gear_items(id) on delete cascade,
  type text not null check (type in ('cleaning', 'repair', 'replacement', 'inspection')),
  description text,
  performed_at date not null default current_date,
  cost decimal(10, 2),
  next_due_at date,
  interval_days int,
  created_at timestamptz not null default now()
);

create index idx_maintenance_item on maintenance_records(gear_item_id);
create index idx_maintenance_due on maintenance_records(next_due_at) where next_due_at is not null;

alter table maintenance_records enable row level security;

create policy "Users can manage own maintenance records" on maintenance_records
  for all using (
    exists (select 1 from gear_items where gear_items.id = maintenance_records.gear_item_id and gear_items.user_id = auth.uid())
  );

-- ============================================================
-- Bikes
-- ============================================================
create table bikes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references users(id) on delete cascade,
  name text not null,
  type text check (type in ('touring', 'gravel', 'mountain', 'fat', 'road', 'ebike')),
  brand text,
  model text,
  year int,
  weight_grams int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_bikes_user on bikes(user_id);

alter table bikes enable row level security;

create policy "Users can manage own bikes" on bikes
  for all using (auth.uid() = user_id);

-- ============================================================
-- Bike Photos
-- ============================================================
create table bike_photos (
  id uuid primary key default uuid_generate_v4(),
  bike_id uuid not null references bikes(id) on delete cascade,
  photo_url text not null,
  storage_path text not null,
  is_primary boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_bike_photos_bike on bike_photos(bike_id);

alter table bike_photos enable row level security;

create policy "Users can manage own bike photos" on bike_photos
  for all using (
    exists (select 1 from bikes where bikes.id = bike_photos.bike_id and bikes.user_id = auth.uid())
  );

-- ============================================================
-- Bag Slots
-- ============================================================
create table bag_slots (
  id uuid primary key default uuid_generate_v4(),
  bike_id uuid not null references bikes(id) on delete cascade,
  name text not null,
  position text not null check (position in ('handlebar', 'frame', 'seat', 'rear-rack', 'front-rack', 'fork-L', 'fork-R', 'top-tube', 'stem', 'downtube')),
  max_volume_ml int,
  max_weight_grams int,
  brand text,
  model text,
  color text,
  created_at timestamptz not null default now()
);

create index idx_bag_slots_bike on bag_slots(bike_id);

alter table bag_slots enable row level security;

create policy "Users can manage own bag slots" on bag_slots
  for all using (
    exists (select 1 from bikes where bikes.id = bag_slots.bike_id and bikes.user_id = auth.uid())
  );

-- ============================================================
-- Trips
-- ============================================================
create table trips (
  id uuid primary key default uuid_generate_v4(),
  created_by uuid not null references users(id) on delete cascade,
  name text not null,
  description text,
  destination text,
  start_date date,
  end_date date,
  distance_km int,
  terrain text check (terrain in ('road', 'gravel', 'mixed', 'singletrack')),
  climate text check (climate in ('tropical', 'temperate', 'alpine', 'desert', 'arctic')),
  expected_conditions text,
  status text not null default 'planning' check (status in ('planning', 'packed', 'active', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index idx_trips_creator on trips(created_by);

alter table trips enable row level security;

create policy "Owners can manage trips" on trips
  for all using (created_by = auth.uid());

-- ============================================================
-- Trip Members
-- ============================================================
create table trip_members (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid not null references trips(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'member')),
  joined_at timestamptz not null default now(),
  unique(trip_id, user_id)
);

create index idx_trip_members_trip on trip_members(trip_id);
create index idx_trip_members_user on trip_members(user_id);

alter table trip_members enable row level security;

create policy "Trip members can view members" on trip_members
  for select using (
    user_id = auth.uid()
    or exists (select 1 from trips where trips.id = trip_members.trip_id and trips.created_by = auth.uid())
  );

create policy "Owners can manage members" on trip_members
  for all using (
    exists (select 1 from trips where trips.id = trip_members.trip_id and trips.created_by = auth.uid())
  );

-- Now that trip_members exists, add the SELECT policy for trips
create policy "Trip members can view trips" on trips
  for select using (
    created_by = auth.uid() or
    exists (select 1 from trip_members where trip_members.trip_id = trips.id and trip_members.user_id = auth.uid())
  );

-- ============================================================
-- Packing Items
-- ============================================================
create table packing_items (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid not null references trips(id) on delete cascade,
  gear_item_id uuid not null references gear_items(id) on delete cascade,
  bag_slot_id uuid references bag_slots(id) on delete set null,
  packed_by uuid not null references users(id) on delete cascade,
  is_shared boolean not null default false,
  quantity int not null default 1,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index idx_packing_trip on packing_items(trip_id);
create index idx_packing_bag on packing_items(bag_slot_id);

alter table packing_items enable row level security;

create policy "Trip members can view packing" on packing_items
  for select using (
    exists (select 1 from trip_members where trip_members.trip_id = packing_items.trip_id and trip_members.user_id = auth.uid())
    or exists (select 1 from trips where trips.id = packing_items.trip_id and trips.created_by = auth.uid())
  );

create policy "Users can manage own packing" on packing_items
  for all using (packed_by = auth.uid());

-- ============================================================
-- AI Suggestions
-- ============================================================
create table ai_suggestions (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid not null references trips(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  suggestion_type text not null check (suggestion_type in ('packing_list', 'weight_estimate', 'missing_gear')),
  input_context jsonb not null default '{}',
  suggestion jsonb not null default '{}',
  accepted boolean,
  created_at timestamptz not null default now()
);

create index idx_ai_suggestions_trip on ai_suggestions(trip_id);

alter table ai_suggestions enable row level security;

create policy "Users can manage own AI suggestions" on ai_suggestions
  for all using (user_id = auth.uid());

-- ============================================================
-- Updated_at trigger
-- ============================================================
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_users_updated_at before update on users for each row execute function update_updated_at();
create trigger update_gear_items_updated_at before update on gear_items for each row execute function update_updated_at();
create trigger update_bikes_updated_at before update on bikes for each row execute function update_updated_at();
create trigger update_trips_updated_at before update on trips for each row execute function update_updated_at();
