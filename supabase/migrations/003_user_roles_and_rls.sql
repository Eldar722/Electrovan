-- ============================================================
-- Migration 003: Proper role-based RLS
-- Supersedes the authentication checks in 001_rls_policies.sql.
-- Apply in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ─── 1. USER ROLES TABLE ─────────────────────────────────────

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role    TEXT NOT NULL DEFAULT 'viewer'
                 CHECK (role IN ('admin', 'viewer'))
);

ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Any authenticated user can read their own role (needed for client-side checks)
CREATE POLICY "user_roles_self_read"
    ON user_roles FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

-- Only admins can manage the roles table
CREATE POLICY "user_roles_admin_manage"
    ON user_roles FOR ALL
    TO authenticated
    USING  ((SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'admin')
    WITH CHECK ((SELECT role FROM user_roles WHERE user_id = auth.uid()) = 'admin');

-- ─── 2. HELPER FUNCTION ──────────────────────────────────────
-- SECURITY DEFINER so it runs with table owner privileges,
-- bypassing RLS on user_roles itself during the check.

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM   user_roles
        WHERE  user_id = auth.uid()
        AND    role    = 'admin'
    );
$$;

-- ─── 3. CARS TABLE — replace old policies ────────────────────

-- Remove overly-permissive authenticated policies from 001
DROP POLICY IF EXISTS "cars_insert_authenticated" ON cars;
DROP POLICY IF EXISTS "cars_update_authenticated" ON cars;
DROP POLICY IF EXISTS "cars_delete_authenticated" ON cars;

-- Ensure RLS is on (idempotent)
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;

-- Public catalog read stays — keep or re-create
DROP POLICY IF EXISTS "cars_select_public" ON cars;
CREATE POLICY "cars_select_public"
    ON cars FOR SELECT
    USING (true);

-- Only admin role can mutate cars
CREATE POLICY "cars_insert_admin"
    ON cars FOR INSERT
    TO authenticated
    WITH CHECK (is_admin());

CREATE POLICY "cars_update_admin"
    ON cars FOR UPDATE
    TO authenticated
    USING  (is_admin())
    WITH CHECK (is_admin());

CREATE POLICY "cars_delete_admin"
    ON cars FOR DELETE
    TO authenticated
    USING (is_admin());

-- ─── 4. LEADS TABLE — replace old policies ───────────────────

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "leads_insert_public"       ON leads;
DROP POLICY IF EXISTS "leads_select_authenticated" ON leads;

-- Anyone (landing form) can submit a lead
CREATE POLICY "leads_insert_public"
    ON leads FOR INSERT
    WITH CHECK (true);

-- Only admin can read leads
CREATE POLICY "leads_select_admin"
    ON leads FOR SELECT
    TO authenticated
    USING (is_admin());

-- Admin can delete spam/test leads; UPDATE intentionally excluded (audit trail)
CREATE POLICY "leads_delete_admin"
    ON leads FOR DELETE
    TO authenticated
    USING (is_admin());

-- ─── 5. STORAGE BUCKET + POLICIES ────────────────────────────
-- Creates the "cars" bucket for car images (public read).
-- Skip this block if you already created the bucket in the Dashboard.

INSERT INTO storage.buckets (id, name, public)
VALUES ('cars', 'cars', true)
ON CONFLICT (id) DO NOTHING;

-- Public can read any file in the bucket (serves images to landing)
DROP POLICY IF EXISTS "storage_cars_read_public" ON storage.objects;
CREATE POLICY "storage_cars_read_public"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'cars');

-- Only admin can upload files
DROP POLICY IF EXISTS "storage_cars_upload_admin" ON storage.objects;
CREATE POLICY "storage_cars_upload_admin"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (bucket_id = 'cars' AND is_admin());

-- Only admin can update/replace files
DROP POLICY IF EXISTS "storage_cars_update_admin" ON storage.objects;
CREATE POLICY "storage_cars_update_admin"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING  (bucket_id = 'cars' AND is_admin())
    WITH CHECK (bucket_id = 'cars' AND is_admin());

-- Only admin can delete files
DROP POLICY IF EXISTS "storage_cars_delete_admin" ON storage.objects;
CREATE POLICY "storage_cars_delete_admin"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (bucket_id = 'cars' AND is_admin());

-- ─── BOOTSTRAP INSTRUCTIONS ──────────────────────────────────
-- After running this migration, you MUST insert the first admin manually.
-- Get your user UUID from: Authentication → Users → copy UUID
-- Then run in SQL Editor:
--
--   INSERT INTO user_roles (user_id, role)
--   VALUES ('<your-admin-uuid>', 'admin');
--
-- All subsequent admin management can be done through the user_roles table.
-- ─────────────────────────────────────────────────────────────
