-- Sarerah Travel: initial schema
create extension if not exists pgcrypto;

-- ============ Tables ============

create table destinations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  region text not null check (region in ('North Pakistan', 'International')),
  short_description text not null,
  description text not null default '',
  image_url text not null default '',
  image_alt text,
  highlights text[] not null default '{}',
  best_season text,
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  short_description text not null,
  description text,
  destination_id uuid not null references destinations(id) on delete restrict,
  type text[] not null default '{}',
  duration_days int not null,
  difficulty text not null check (difficulty in ('Easy', 'Moderate', 'Challenging', 'Strenuous')),
  group_size text,
  pickup_city text,
  price_from_pkr numeric not null,
  price_from_usd numeric,
  currency text default 'PKR',
  highlights text[] not null default '{}',
  inclusions text[] not null default '{}',
  exclusions text[] not null default '{}',
  next_departures text[] not null default '{}',
  rating numeric,
  review_count int not null default 0,
  tags text[] not null default '{}',
  map_embed_url text,
  what_to_pack text[] not null default '{}',
  best_season text,
  weather text,
  is_featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index packages_destination_id_idx on packages(destination_id);

create table package_itineraries (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  day int not null,
  title text not null,
  description text,
  sort_order int not null default 0
);
create index package_itineraries_package_id_idx on package_itineraries(package_id);

create table package_images (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages(id) on delete cascade,
  url text not null,
  alt text,
  sort_order int not null default 0
);
create index package_images_package_id_idx on package_images(package_id);

-- Flexible key/value store for small site-wide content (trust badges,
-- WhatsApp number, contact email, etc.) that doesn't warrant its own table.
-- Reviews are sourced live from the Google Places API, not stored here.
create table site_settings (
  key text primary key,
  value jsonb not null
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  destination text,
  package text,
  budget text,
  dates text,
  travelers text,
  message text,
  source_page text not null default 'unknown',
  created_at timestamptz not null default now()
);

-- ============ updated_at triggers ============

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger destinations_set_updated_at before update on destinations
  for each row execute function set_updated_at();
create trigger packages_set_updated_at before update on packages
  for each row execute function set_updated_at();

-- ============ Row Level Security ============
-- Public (anon key) can read all content tables and insert leads only.
-- All writes to content tables go through the service-role key from admin
-- Server Actions, which bypasses RLS entirely and is gated by our own
-- signed-cookie admin session check in application code.

alter table destinations enable row level security;
alter table packages enable row level security;
alter table package_itineraries enable row level security;
alter table package_images enable row level security;
alter table site_settings enable row level security;
alter table leads enable row level security;

create policy "public read destinations" on destinations for select using (true);
create policy "public read packages" on packages for select using (true);
create policy "public read package_itineraries" on package_itineraries for select using (true);
create policy "public read package_images" on package_images for select using (true);
create policy "public read site_settings" on site_settings for select using (true);

create policy "public insert leads" on leads for insert with check (true);

-- ============ Storage ============
-- Public bucket for admin-uploaded images. Anyone can read (site is public
-- marketing content); only the service role (admin uploads) can write.

insert into storage.buckets (id, name, public)
values ('trip-images', 'trip-images', true)
on conflict (id) do nothing;

create policy "public read trip-images"
  on storage.objects for select
  using (bucket_id = 'trip-images');
