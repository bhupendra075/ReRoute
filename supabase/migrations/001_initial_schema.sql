create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";
create extension if not exists "btree_gist";

create table public.users (
  id uuid primary key default gen_random_uuid(),
  auth_id uuid unique not null references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  role text not null default 'patient' check (role in ('patient','paramedic','dispatcher','er_staff','admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.health_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique not null references public.users(id) on delete cascade,
  encrypted_phi text not null,
  encrypted_emergency_contacts text not null,
  encrypted_insurance text,
  version integer default 1,
  updated_at timestamptz default now()
);

create table public.hospitals (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  latitude double precision not null,
  longitude double precision not null,
  address text,
  phone text,
  specializations text[] not null default '{}' check (specializations <@ array['ICU','CARDIAC','STROKE','BURN','TRAUMA','PEDIATRIC','OBSTETRIC','GENERAL']),
  capacity jsonb not null default '{"ICU":0,"CARDIAC":0,"STROKE":0,"BURN":0,"TRAUMA":0,"PEDIATRIC":0,"OBSTETRIC":0,"GENERAL":0}',
  is_active boolean default true,
  accepts_insurance jsonb default '[]',
  created_at timestamptz default now()
);

create table public.insurance_tpas (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text unique not null,
  network_hospitals uuid[] default '{}',
  cashless_tiers jsonb default '{}',
  is_active boolean default true
);

create table public.emergency_sessions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.users(id),
  session_token text unique not null default gen_random_uuid(),
  status text not null default 'active' check (status in ('active','en_route','arrived','completed','cancelled')),
  origin_lat double precision not null,
  origin_lng double precision not null,
  destination_hospital_id uuid references public.hospitals(id),
  route_geometry jsonb,
  estimated_arrival timestamptz,
  priority text not null default 'standard' check (priority in ('standard','urgent','critical')),
  created_at timestamptz default now(),
  expires_at timestamptz not null default (now() + interval '24 hours')
);

create table public.qr_logs (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.users(id),
  nonce text not null,
  payload_hash text not null,
  signature text not null,
  scanned_at timestamptz,
  scanner_role text check (scanner_role in ('paramedic','dispatcher','er_staff','bystander')),
  created_at timestamptz default now(),
  unique(nonce)
);

create table public.public_keys (
  id uuid primary key default gen_random_uuid(),
  kid text unique not null,
  public_key_pem text not null,
  algorithm text not null default 'ECDSA_P256',
  is_active boolean default true,
  created_at timestamptz default now(),
  expires_at timestamptz
);
