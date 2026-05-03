-- ============================================================
-- Migration 007: Add car weight for catalog cards
-- The landing catalog's third card parameter displays vehicle weight in tons.
-- ============================================================

ALTER TABLE cars
    ADD COLUMN IF NOT EXISTS weight NUMERIC;
