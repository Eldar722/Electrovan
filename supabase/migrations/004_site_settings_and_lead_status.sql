-- ============================================================
-- Migration 004: Site settings + lead status
-- Apply in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- ─── 1. SITE SETTINGS ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_settings (
    id       INTEGER PRIMARY KEY DEFAULT 1,
    phone    TEXT NOT NULL DEFAULT '',
    whatsapp TEXT NOT NULL DEFAULT '',
    email    TEXT NOT NULL DEFAULT '',
    telegram TEXT NOT NULL DEFAULT '',
    CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO site_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read (landing page fetches without auth)
CREATE POLICY "settings_read_public"
    ON site_settings FOR SELECT
    USING (true);

-- Only admin can update
CREATE POLICY "settings_update_admin"
    ON site_settings FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());

-- ─── 2. LEADS STATUS COLUMN ──────────────────────────────────

ALTER TABLE leads
    ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'
        CHECK (status IN ('new', 'in_progress', 'done', 'cancelled'));

-- Admin can update lead status (e.g. mark as done / cancelled)
CREATE POLICY "leads_update_admin"
    ON leads FOR UPDATE
    TO authenticated
    USING (is_admin())
    WITH CHECK (is_admin());
