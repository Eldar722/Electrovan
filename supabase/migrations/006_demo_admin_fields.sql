-- ============================================================
-- Migration 006: Demo-ready admin fields
-- Adds manager notes for leads and publish control for cars.
-- ============================================================

ALTER TABLE leads
    ADD COLUMN IF NOT EXISTS admin_note TEXT NOT NULL DEFAULT '';

ALTER TABLE cars
    ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT true;
