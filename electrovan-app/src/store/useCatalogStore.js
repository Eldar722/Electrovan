import { create } from 'zustand';
import { fetchCars, fetchCarById, supabase } from '../api/supabase';

const ITEMS_PER_PAGE = 12;
export const CATALOG_EXCLUDED_BRANDS = new Set(['Kia']);

export function isCatalogBrandExcluded(brand) {
    return CATALOG_EXCLUDED_BRANDS.has(String(brand || '').trim());
}

export const useCatalogStore = create((set, get) => ({
    cars: [],
    loading: true,
    error: null,

    loadCars: async () => {
        set({ loading: true, error: null });
        const attempt = async (retriesLeft) => {
            try {
                const cars = await fetchCars();
                set({ cars, loading: false });
            } catch (err) {
                if (retriesLeft > 0) {
                    await new Promise(r => setTimeout(r, 2500));
                    return attempt(retriesLeft - 1);
                }
                console.error('[loadCars]', err.message);
                set({ error: err.message, loading: false });
            }
        };
        await attempt(2);
    },

    // ─── Фильтрация ──────────────────────────────────────────
    activeCategory: 'Все',
    setCategory: (category) => set({ activeCategory: category, currentPage: 1 }),

    activeBrand: null,
    setBrand: (brand) => {
        set({ activeBrand: get().activeBrand === brand ? null : brand, currentPage: 1 });
    },

    // ─── Пагинация ────────────────────────────────────────────
    currentPage: 1,
    itemsPerPage: ITEMS_PER_PAGE,
    setPage: (page) => set({ currentPage: page }),

    // ─── Вычисляемые ──────────────────────────────────────────
    getFilteredCars: () => {
        const { cars, activeCategory, activeBrand } = get();
        let filtered = cars.filter(c => !isCatalogBrandExcluded(c.brand));
        if (activeBrand) filtered = filtered.filter(c => c.brand === activeBrand);
        if (activeCategory !== 'Все') filtered = filtered.filter(c => c.category === activeCategory);
        return filtered;
    },

    getCurrentCars: () => {
        const { currentPage, itemsPerPage } = get();
        const filtered = get().getFilteredCars();
        return filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    },

    getTotalPages: () => Math.ceil(get().getFilteredCars().length / get().itemsPerPage),

    getPopularCars: () => get().cars.filter(c => c.isPopular),

    // ─── Realtime: targeted refetch per event ──────────────────
    // payload.new is partial unless REPLICA IDENTITY FULL is set on the
    // table. To stay correct without DB-level changes, we refetch the
    // single row by id and patch state with the full normalized record.
    subscribeToCarChanges: () => {
        const upsertById = async (id) => {
            try {
                const car = await fetchCarById(id);
                if (!car) return;
                if (!car.isActive) {
                    set(s => ({ cars: s.cars.filter(c => c.id !== car.id) }));
                    return;
                }
                set(s => {
                    const exists = s.cars.some(c => c.id === car.id);
                    const next = exists
                        ? s.cars.map(c => c.id === car.id ? car : c)
                        : [...s.cars, car].sort((a, b) => a.id - b.id);
                    return { cars: next };
                });
            } catch (err) {
                console.error('[realtime upsertById]', err.message);
            }
        };

        const channel = supabase
            .channel(`cars-landing-${Date.now()}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cars' }, ({ new: raw }) => {
                if (raw?.id != null) upsertById(raw.id);
            })
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'cars' }, ({ new: raw }) => {
                if (raw?.id != null) upsertById(raw.id);
            })
            .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'cars' }, ({ old: raw }) => {
                if (raw?.id != null) set(s => ({ cars: s.cars.filter(c => c.id !== raw.id) }));
            })
            .subscribe((status) => {
                if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT') {
                    console.warn('[realtime cars]', status);
                }
            });
        return () => supabase.removeChannel(channel);
    },
}));
