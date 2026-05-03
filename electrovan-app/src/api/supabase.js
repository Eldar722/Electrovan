import { createClient } from '@supabase/supabase-js';
import { carImageMap } from '../assets/images/carImageMap';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Columns actually used by the landing — only request fields that exist in DB.
// Image URLs are NOT stored in DB yet; images resolve locally via image_key → carImageMap.
const CAR_COLUMNS = [
    'id', 'brand', 'model', 'category', 'description',
    'price', 'full_price', 'seats', 'battery', 'range',
    'volume', 'capacity', 'weight', 'dimensions', 'warranty',
    'is_popular', 'is_active', 'used_in',
    'image_key', 'modal_image_key', 'popular_bg_key',
].join(',');

function isMissingColumnError(error, columnName) {
    return error?.code === '42703' || String(error?.message || '').includes(`column cars.${columnName} does not exist`);
}

// All "numeric" columns in DB are TEXT and may contain dot/comma/space
// digit-grouping (e.g. "12.000.000", "12 000 000") or decimal commas ("9,39").
// Detect grouping pattern, strip separators, return finite Number or null.
function toNum(v) {
    if (v == null) return null;
    if (typeof v === 'number') return Number.isFinite(v) ? v : null;
    let s = String(v).trim().replace(/\s/g, '');
    if (!s) return null;
    if (/^\d{1,3}(\.\d{3})+$/.test(s))      s = s.replace(/\./g, '');   // 12.000.000
    else if (/^\d{1,3}(,\d{3})+$/.test(s))  s = s.replace(/,/g, '');    // 12,000,000
    else                                    s = s.replace(',', '.');    // 9,39
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : null;
}

// Single normalization layer — used by fetchCars AND realtime patch handlers.
// All field aliases, type coercions and safe defaults live here so the rest
// of the app never has to guess whether a field is null, snake_case, or text.
export function normalizeCar(raw) {
    if (!raw || typeof raw !== 'object') return null;
    return {
        ...raw,
        // DB → UI aliases
        description: raw.description  ?? null,
        isPopular:   raw.is_popular   ?? false,
        isActive:    raw.is_active    ?? true,
        usedIn:      Array.isArray(raw.used_in) ? raw.used_in : [],
        // Numeric coercions (DB stores these as text)
        fullPrice:   toNum(raw.full_price ?? raw.price),
        price:       toNum(raw.price),
        battery:     toNum(raw.battery),
        range:       toNum(raw.range),
        volume:      toNum(raw.volume),
        capacity:    toNum(raw.capacity),
        weight:      toNum(raw.weight),
        // Images: resolve from local assets via image_key → carImageMap.
        // DB does not have image URL columns yet; when Supabase Storage is ready,
        // add `raw.image_url ??` before the carImageMap fallback.
        image:      carImageMap[raw.image_key]       ?? null,
        modalImage: carImageMap[raw.modal_image_key] ?? carImageMap[raw.image_key] ?? null,
        popularBg:  carImageMap[raw.popular_bg_key]  ?? carImageMap[raw.image_key] ?? null,
    };
}

// Fetch a single car by id — used by realtime handlers to avoid relying on
// payload.new being complete (Supabase only sends full row when REPLICA
// IDENTITY FULL is set on the table).
export async function fetchCarById(id) {
    const { data, error } = await supabase.from('cars').select(CAR_COLUMNS).eq('id', id).single();
    if (error) throw error;
    return normalizeCar(data);
}

export async function fetchCars() {
    const activeQuery = await supabase
        .from('cars')
        .select(CAR_COLUMNS)
        .eq('is_active', true)
        .order('id');

    if (!activeQuery.error) {
        return activeQuery.data.map(normalizeCar).filter(Boolean);
    }

    if (!isMissingColumnError(activeQuery.error, 'is_active')) {
        throw activeQuery.error;
    }

    // Fallback for DBs without is_active column
    const fallbackQuery = await supabase
        .from('cars')
        .select(CAR_COLUMNS)
        .order('id');
    if (fallbackQuery.error) throw fallbackQuery.error;
    return fallbackQuery.data.map(normalizeCar).filter(Boolean);
}

export async function submitLead(name, phone) {
    const { error } = await supabase
        .from('leads')
        .insert({ name, phone });
    if (error) throw error;
}

export async function fetchSettings() {
    const { data, error } = await supabase
        .from('site_settings')
        .select('phone, whatsapp, email, telegram')
        .eq('id', 1)
        .single();
    if (error) return null;
    return data;
}
