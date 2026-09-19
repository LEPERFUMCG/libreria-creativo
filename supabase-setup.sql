-- ============================================
-- SUPABASE SETUP - Libreria Creativo
-- Ejecutar en: Supabase Dashboard -> SQL Editor
-- (Aplica a las 2 tablas de datos y activa real-time)
-- ============================================

create table if not exists public.store_data (
  key        text primary key,
  value      jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- Permitir lectura/escritura con la anon key (modo demo)
alter table public.store_data enable row level security;

drop policy if exists "store_data_public_select" on public.store_data;
create policy "store_data_public_select" on public.store_data
  for select using (true);

drop policy if exists "store_data_public_insert" on public.store_data;
create policy "store_data_public_insert" on public.store_data
  for insert with check (true);

drop policy if exists "store_data_public_update" on public.store_data;
create policy "store_data_public_update" on public.store_data
  for update using (true);

-- (Opcional: real-time nativo. El sitio ya usa polling de 6s,
--  asi que esto no es estrictamente necesario.)
alter publication supabase_realtime add table public.store_data;

-- ============================================
-- IMPORTANTE (seguridad):
-- Con estas politicas, CUALQUIERA que conozca la anon key
-- (publica en el codigo) puede leer/escribir los datos.
-- Ideal para demo/desarrollo.
-- Para produccion: usa Supabase Auth y restringe escritura
-- a usuarios autenticados (p.ej. roles admin).
-- ============================================