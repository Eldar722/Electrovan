-- ============================================================
-- Migration 002: Add image_url columns to cars table
-- Apply in: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- Add nullable image URL columns.
-- These store public Supabase Storage URLs (or any CDN URL).
-- Existing rows keep NULL → apps fall back to local carImageMap.
ALTER TABLE cars
  ADD COLUMN IF NOT EXISTS image_url         TEXT,
  ADD COLUMN IF NOT EXISTS modal_image_url   TEXT,
  ADD COLUMN IF NOT EXISTS popular_bg_url    TEXT;

-- ─── USAGE ───────────────────────────────────────────────────
-- After adding images to Supabase Storage (Storage → New bucket → "cars"):
--   1. Upload image files (e.g. geely-card.png)
--   2. Get public URL: Storage → cars → file → "Get public URL"
--   3. UPDATE cars SET image_url = '<public-url>' WHERE brand = 'Geely';
--
-- Storage bucket setup (run once in Dashboard):
--   INSERT INTO storage.buckets (id, name, public)
--   VALUES ('cars', 'cars', true);
--
-- Storage RLS (allow public read, auth write):
--   CREATE POLICY "cars_images_read" ON storage.objects
--     FOR SELECT USING (bucket_id = 'cars');
--   CREATE POLICY "cars_images_write" ON storage.objects
--     FOR INSERT TO authenticated WITH CHECK (bucket_id = 'cars');
--   CREATE POLICY "cars_images_delete" ON storage.objects
--     FOR DELETE TO authenticated USING (bucket_id = 'cars');
