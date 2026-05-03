-- ============================================================
-- Migration 005: Harden lead status persistence for admin demo
-- Safe to run after 003 and 004. Recreates the UPDATE policy so
-- status changes from the admin panel persist for admin users.
-- ============================================================

ALTER TABLE leads
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'in_progress', 'done', 'cancelled'));

UPDATE leads
SET status = 'new'
WHERE status IS NULL;

DROP POLICY IF EXISTS "leads_update_admin" ON leads;
CREATE POLICY "leads_update_admin"
    ON leads FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());
