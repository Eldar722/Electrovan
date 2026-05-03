-- ============================================================
-- Migration 001: Row Level Security Policies
-- Apply in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- Enable RLS on both tables (safe even if already enabled)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- ─── CARS TABLE ──────────────────────────────────────────────
-- Anyone (anon + authenticated) can read cars (public catalog)
CREATE POLICY "cars_select_public"
  ON cars FOR SELECT
  USING (true);

-- Only authenticated users (admin) can insert new cars
CREATE POLICY "cars_insert_authenticated"
  ON cars FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only authenticated users (admin) can update cars
CREATE POLICY "cars_update_authenticated"
  ON cars FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Only authenticated users (admin) can delete cars
CREATE POLICY "cars_delete_authenticated"
  ON cars FOR DELETE
  TO authenticated
  USING (true);

-- ─── LEADS TABLE ─────────────────────────────────────────────
-- Anyone (anon) can submit a lead (CTA form on landing)
CREATE POLICY "leads_insert_public"
  ON leads FOR INSERT
  WITH CHECK (true);

-- Only authenticated users (admin) can read leads
CREATE POLICY "leads_select_authenticated"
  ON leads FOR SELECT
  TO authenticated
  USING (true);

-- Prevent anon from reading leads
-- (covered by not having a public SELECT policy)

-- ─── NOTES ───────────────────────────────────────────────────
-- "authenticated" role = any user logged in via supabase.auth.signInWithPassword
-- This means: any Supabase Auth user can mutate cars/read leads.
-- Since only you create users in Supabase Dashboard → Authentication → Users,
-- this is effectively admin-only.
--
-- If you later need multiple roles (e.g. editor vs superadmin), add a
-- profiles table with a role column and update policies accordingly.
