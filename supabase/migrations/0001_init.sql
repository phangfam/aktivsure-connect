-- AktivSure Capture Funnel — v1 schema (demo-first, permissive RLS)

create table if not exists lead_sources (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  user_id uuid,
  created_at timestamptz not null default now()
);
alter table lead_sources enable row level security;
drop policy if exists "lead_sources_v1_read" on lead_sources;
create policy "lead_sources_v1_read" on lead_sources for select using (true);
drop policy if exists "lead_sources_v1_write" on lead_sources;
create policy "lead_sources_v1_write" on lead_sources for all using (true) with check (true);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  user_id uuid,
  created_at timestamptz not null default now()
);
alter table products enable row level security;
drop policy if exists "products_v1_read" on products;
create policy "products_v1_read" on products for select using (true);
drop policy if exists "products_v1_write" on products;
create policy "products_v1_write" on products for all using (true) with check (true);

create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  source_id uuid references lead_sources(id),
  product_id uuid references products(id),
  consent_given boolean not null default false,
  consent_timestamp timestamptz,
  privacy_policy_version text,
  notes text,
  user_id uuid,
  created_at timestamptz not null default now()
);
alter table contacts enable row level security;
drop policy if exists "contacts_v1_read" on contacts;
create policy "contacts_v1_read" on contacts for select using (true);
drop policy if exists "contacts_v1_write" on contacts;
create policy "contacts_v1_write" on contacts for all using (true) with check (true);

create table if not exists consent_logs (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references contacts(id),
  consent_type text not null,
  privacy_policy_version text not null,
  ip_address text,
  user_id uuid,
  created_at timestamptz not null default now()
);
alter table consent_logs enable row level security;
drop policy if exists "consent_logs_v1_read" on consent_logs;
create policy "consent_logs_v1_read" on consent_logs for select using (true);
drop policy if exists "consent_logs_v1_write" on consent_logs;
create policy "consent_logs_v1_write" on consent_logs for all using (true) with check (true);

-- Seed: lead sources
insert into lead_sources (name, slug) values
  ('Packing Insert QR', 'insert-qr'),
  ('Funnel Signup', 'funnel-signup'),
  ('Giveaway', 'giveaway')
on conflict (slug) do nothing;

-- Seed: products
insert into products (name, slug) values
  ('AktivSure DM', 'aktivsure-dm'),
  ('AktivSure Cardio', 'aktivsure-cardio'),
  ('AktivSure Joint', 'aktivsure-joint')
on conflict (slug) do nothing;

-- Seed: demo contacts (5 rows)
insert into contacts (name, phone, email, source_id, product_id, consent_given, consent_timestamp, privacy_policy_version)
select 'Siti Aminah', '0123456789', 'siti.aminah@email.com', ls.id, p.id, true, now() - interval '5 days', 'v1-2026-08'
from lead_sources ls, products p where ls.slug = 'insert-qr' and p.slug = 'aktivsure-dm'
on conflict do nothing;

insert into contacts (name, phone, email, source_id, product_id, consent_given, consent_timestamp, privacy_policy_version)
select 'Tan Wei Ming', '0198765432', null, ls.id, p.id, true, now() - interval '3 days', 'v1-2026-08'
from lead_sources ls, products p where ls.slug = 'insert-qr' and p.slug = 'aktivsure-cardio'
on conflict do nothing;

insert into contacts (name, phone, email, source_id, product_id, consent_given, consent_timestamp, privacy_policy_version)
select 'Lim Chee Keong', null, 'lim.ck@email.com', ls.id, p.id, true, now() - interval '2 days', 'v1-2026-08'
from lead_sources ls, products p where ls.slug = 'funnel-signup' and p.slug = 'aktivsure-dm'
on conflict do nothing;

insert into contacts (name, phone, email, source_id, product_id, consent_given, consent_timestamp, privacy_policy_version)
select 'Nurul Huda', '0112233445', 'nurul.h@email.com', ls.id, p.id, true, now() - interval '1 days', 'v1-2026-08'
from lead_sources ls, products p where ls.slug = 'giveaway' and p.slug = 'aktivsure-joint'
on conflict do nothing;

insert into contacts (name, phone, email, source_id, product_id, consent_given, consent_timestamp, privacy_policy_version)
select 'Arjun Kumar', '0178899112', 'arjun.k@email.com', ls.id, p.id, true, now() - interval '4 hours', 'v1-2026-08'
from lead_sources ls, products p where ls.slug = 'insert-qr' and p.slug = 'aktivsure-dm'
on conflict do nothing;

-- Seed: consent logs for demo contacts
insert into consent_logs (contact_id, consent_type, privacy_policy_version)
select c.id, 'marketing_opt_in', 'v1-2026-08'
from contacts c where c.consent_given = true and c.name in ('Siti Aminah','Tan Wei Ming','Lim Chee Keong','Nurul Huda','Arjun Kumar')
on conflict do nothing;