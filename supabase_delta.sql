-- supabase_delta.sql
-- Run AFTER supabase_schema.sql and supabase_roles.sql

-- ==========================================
-- Structural additions for B2C + B2B product
-- ==========================================

-- 1) Team-based store memberships
create table if not exists store_memberships (
  store_id uuid not null references stores(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role text not null check (role in ('owner','staff')),
  created_at timestamptz not null default now(),
  primary key (store_id, user_id)
);
alter table store_memberships enable row level security;
create index if not exists idx_store_memberships_store on store_memberships(store_id);
create index if not exists idx_store_memberships_user on store_memberships(user_id);

-- RLS
create policy if not exists "store_memberships_self_read" on store_memberships
  for select using ( user_id = auth.uid() or has_role('admin') );
create policy if not exists "store_memberships_owner_write" on store_memberships
  for all using (
    exists (select 1 from store_memberships sm where sm.store_id = store_memberships.store_id and sm.user_id = auth.uid() and sm.role = 'owner')
    or has_role('admin')
  ) with check (
    exists (select 1 from store_memberships sm where sm.store_id = store_memberships.store_id and sm.user_id = auth.uid() and sm.role = 'owner')
    or has_role('admin')
  );

-- 2) Product ingestion sources and jobs
do $$ begin
  create type source_kind as enum ('shopify','csv','api');
exception when duplicate_object then null; end $$;

create table if not exists product_sources (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  kind source_kind not null,
  source_ref jsonb not null default '{}'::jsonb,
  last_sync_at timestamptz,
  created_at timestamptz not null default now()
);
alter table product_sources enable row level security;
create index if not exists idx_product_sources_store on product_sources(store_id);

create table if not exists catalog_jobs (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  type text not null check (type in ('full','delta','csv')),
  status text not null default 'queued',
  started_at timestamptz,
  finished_at timestamptz,
  log text,
  created_at timestamptz not null default now()
);
alter table catalog_jobs enable row level security;
create index if not exists idx_catalog_jobs_store on catalog_jobs(store_id);

create policy if not exists "product_sources_owner_staff" on product_sources
  for all using (
    exists (select 1 from store_memberships sm where sm.store_id = product_sources.store_id and sm.user_id = auth.uid())
    or has_role('admin')
  ) with check (
    exists (select 1 from store_memberships sm where sm.store_id = product_sources.store_id and sm.user_id = auth.uid())
    or has_role('admin')
  );

create policy if not exists "catalog_jobs_owner_staff" on catalog_jobs
  for all using (
    exists (select 1 from store_memberships sm where sm.store_id = catalog_jobs.store_id and sm.user_id = auth.uid())
    or has_role('admin')
  ) with check (
    exists (select 1 from store_memberships sm where sm.store_id = catalog_jobs.store_id and sm.user_id = auth.uid())
    or has_role('admin')
  );

-- 3) Widget sessions and cross-provider links
create table if not exists widget_sessions (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  session_token text not null unique,
  is_authenticated boolean not null default false,
  started_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);
alter table widget_sessions enable row level security;
create index if not exists idx_widget_sessions_store on widget_sessions(store_id);
create index if not exists idx_widget_sessions_user on widget_sessions(user_id);

create table if not exists oauth_connections (
  user_id uuid not null references auth.users(id) on delete cascade,
  provider text not null,
  provider_user_id text not null,
  created_at timestamptz not null default now(),
  primary key (user_id, provider)
);
alter table oauth_connections enable row level security;

create policy if not exists "widget_sessions_self_or_staff" on widget_sessions
  for select using (
    user_id = auth.uid()
    or exists (select 1 from store_memberships sm where sm.store_id = widget_sessions.store_id and sm.user_id = auth.uid())
    or has_role('admin')
  );

-- 4) Attribution and orders
create table if not exists affiliate_clicks (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  product_id uuid references products(id) on delete set null,
  source text,
  ref_token text not null unique,
  cookie_id text,
  session_id uuid references widget_sessions(id) on delete set null,
  created_at timestamptz not null default now()
);
alter table affiliate_clicks enable row level security;
create index if not exists idx_affiliate_clicks_store on affiliate_clicks(store_id);

create policy if not exists "affiliate_clicks_public_read" on affiliate_clicks
  for select using ( true );

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  store_id uuid not null references stores(id) on delete cascade,
  user_id uuid references auth.users(id) on delete set null,
  retailer_order_id text,
  total_cents int,
  currency text default 'USD',
  status text default 'created',
  placed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);
alter table orders enable row level security;

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  quantity int not null default 1,
  price_cents int not null default 0
);
alter table order_items enable row level security;

-- commissions already exists; add FKs
do $$ begin
  alter table commissions add column if not exists order_id uuid references orders(id) on delete set null;
  alter table commissions add column if not exists click_id uuid references affiliate_clicks(id) on delete set null;
exception when others then null; end $$;

-- Policies: store members read; owners/admin write
create policy if not exists "orders_store_member_read" on orders
  for select using (
    exists (select 1 from store_memberships sm where sm.store_id = orders.store_id and sm.user_id = auth.uid())
    or has_role('admin')
  );
create policy if not exists "order_items_store_member_read" on order_items
  for select using (
    exists (select 1 from orders o join store_memberships sm on sm.store_id = o.store_id where o.id = order_items.order_id and sm.user_id = auth.uid())
    or has_role('admin')
  );

-- 5) Analytics events
create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references stores(id) on delete set null,
  user_id uuid references auth.users(id) on delete set null,
  session_id uuid references widget_sessions(id) on delete set null,
  name text not null,
  props jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);
alter table events enable row level security;

create policy if not exists "events_store_member_read" on events
  for select using (
    exists (select 1 from store_memberships sm where sm.store_id = events.store_id and sm.user_id = auth.uid())
    or has_role('admin')
  );

-- 6) Product field extensions
do $$ begin
  alter table products add column if not exists handle text;
  alter table products add column if not exists vendor text;
  alter table products add column if not exists variant_count int;
  alter table products add column if not exists inventory_status text;
  alter table products add column if not exists collection_ids text[] default '{}'::text[];
exception when others then null; end $$;

-- =======================
-- Basic helper functions
-- =======================

-- Refresh last_seen on widget_sessions via RPC (optional)
create or replace function touch_widget_session(p_token text) returns void language plpgsql as $$
declare
  sid uuid;
begin
  update widget_sessions set last_seen_at = now() where session_token = p_token returning id into sid;
end;
$$;
