-- Enable RLS on all tables
alter table public.users enable row level security;
alter table public.health_profiles enable row level security;
alter table public.hospitals enable row level security;
alter table public.insurance_tpas enable row level security;
alter table public.emergency_sessions enable row level security;
alter table public.qr_logs enable row level security;
alter table public.public_keys enable row level security;

-- Users table policies
create policy "Users can view their own profile"
  on public.users for select
  using (auth.uid() = auth_id);

create policy "Users can update their own profile"
  on public.users for update
  using (auth.uid() = auth_id)
  with check (auth.uid() = auth_id);

create policy "Admins can view all users"
  on public.users for select
  using (
    exists (
      select 1 from public.users
      where auth_id = auth.uid() and role = 'admin'
    )
  );

-- Health profiles table policies
create policy "Users can view own health profile"
  on public.health_profiles for select
  using (
    exists (
      select 1 from public.users
      where id = user_id and auth_id = auth.uid()
    )
  );

create policy "Users can update own health profile"
  on public.health_profiles for update
  using (
    exists (
      select 1 from public.users
      where id = user_id and auth_id = auth.uid()
    )
  );

create policy "Emergency responders can view health profiles"
  on public.health_profiles for select
  using (
    exists (
      select 1 from public.users
      where auth_id = auth.uid()
      and role in ('paramedic', 'dispatcher', 'er_staff', 'admin')
    )
  );

-- Emergency sessions table policies
create policy "Users can view their own sessions"
  on public.emergency_sessions for select
  using (
    exists (
      select 1 from public.users
      where id = patient_id and auth_id = auth.uid()
    )
  );

create policy "Emergency responders can view all sessions"
  on public.emergency_sessions for select
  using (
    exists (
      select 1 from public.users
      where auth_id = auth.uid()
      and role in ('paramedic', 'dispatcher', 'er_staff', 'admin')
    )
  );

create policy "Patients can create sessions"
  on public.emergency_sessions for insert
  with check (
    exists (
      select 1 from public.users
      where id = patient_id and auth_id = auth.uid()
    )
  );

-- QR logs table policies
create policy "Users can view own QR logs"
  on public.qr_logs for select
  using (
    exists (
      select 1 from public.users
      where id = patient_id and auth_id = auth.uid()
    )
  );

create policy "Emergency responders can create QR logs"
  on public.qr_logs for insert
  with check (
    exists (
      select 1 from public.users
      where auth_id = auth.uid()
      and role in ('paramedic', 'dispatcher', 'er_staff', 'admin')
    )
  );

-- Hospitals table policies (public read)
create policy "Anyone can view hospitals"
  on public.hospitals for select
  using (true);

create policy "Only admins can modify hospitals"
  on public.hospitals for insert
  with check (
    exists (
      select 1 from public.users
      where auth_id = auth.uid() and role = 'admin'
    )
  );

-- Insurance TPAs table policies (public read)
create policy "Anyone can view insurance TPAs"
  on public.insurance_tpas for select
  using (true);

create policy "Only admins can modify insurance TPAs"
  on public.insurance_tpas for insert
  with check (
    exists (
      select 1 from public.users
      where auth_id = auth.uid() and role = 'admin'
    )
  );

-- Public keys table policies (public read)
create policy "Anyone can view public keys"
  on public.public_keys for select
  using (true);

create policy "Only admins can manage public keys"
  on public.public_keys for insert
  with check (
    exists (
      select 1 from public.users
      where auth_id = auth.uid() and role = 'admin'
    )
  );

-- Create indexes on foreign keys for performance
create index idx_health_profiles_user_id on public.health_profiles(user_id);
create index idx_emergency_sessions_patient_id on public.emergency_sessions(patient_id);
create index idx_emergency_sessions_hospital_id on public.emergency_sessions(destination_hospital_id);
create index idx_qr_logs_patient_id on public.qr_logs(patient_id);

-- Add indexes for common queries
create index idx_emergency_sessions_status on public.emergency_sessions(status);
create index idx_emergency_sessions_created_at on public.emergency_sessions(created_at);
create index idx_users_email on public.users(email);
create index idx_users_role on public.users(role);
