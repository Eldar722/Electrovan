import { useRef, useEffect } from 'react';
import CatalogCard from '../components/catalog/CatalogCard.jsx';
import Paginator from '../components/Paginator';
import Brands from '../components/BrandsCarousel';
import { useCatalogStore } from '../store/useCatalogStore.js';

const CATEGORIES = ['Все', 'Грузовой', 'Пассажирский', 'Грузо-Пассажирский'];

function SkeletonCard() {
    return (
        <div className='card skeleton-card'>
            <div className='card-img-wrap skeleton-pulse' />
            <div className='card-titles' style={{ gap: 10 }}>
                <div className='skeleton-pulse' style={{ height: 18, width: '65%', borderRadius: 6 }} />
                <div className='skeleton-pulse' style={{ height: 14, width: '40%', borderRadius: 6 }} />
                <div className='catalog-line' />
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {[0, 1, 2].map((i) => (
                        <div key={i} className='skeleton-pulse' style={{ height: 35, width: 35, borderRadius: 6 }} />
                    ))}
                </div>
                <div className='catalog-line' />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 4 }}>
                    <div className='skeleton-pulse' style={{ height: 14, width: '30%', borderRadius: 4 }} />
                    <div className='skeleton-pulse' style={{ height: 30, width: '44%', borderRadius: 8 }} />
                </div>
            </div>
        </div>
    );
}

function Catalog({ onOpenModal }) {
    const activeCategory = useCatalogStore((s) => s.activeCategory);
    const activeBrand    = useCatalogStore((s) => s.activeBrand);
    const currentPage    = useCatalogStore((s) => s.currentPage);
    const setCategory    = useCatalogStore((s) => s.setCategory);
    const setBrand       = useCatalogStore((s) => s.setBrand);
    const setPage        = useCatalogStore((s) => s.setPage);
    const getCurrentCars = useCatalogStore((s) => s.getCurrentCars);
    const getTotalPages  = useCatalogStore((s) => s.getTotalPages);
    const loading        = useCatalogStore((s) => s.loading);
    const error          = useCatalogStore((s) => s.error);
    const loadCars       = useCatalogStore((s) => s.loadCars);

    const catalogRef = useRef(null);
    const wrapperRef = useRef(null);
    const lineRef    = useRef(null);

    // Guard: when filters/realtime shrink results below currentPage, slice
    // returns []. Pull currentPage back to a valid range so cards render.
    const totalPages = getTotalPages();
    useEffect(() => {
        if (totalPages > 0 && currentPage > totalPages) setPage(totalPages);
    }, [totalPages, currentPage, setPage]);

    const moveLine = (buttonElement) => {
        if (!buttonElement || !wrapperRef.current || !lineRef.current) return;
        const buttonRect  = buttonElement.getBoundingClientRect();
        const wrapperRect = wrapperRef.current.getBoundingClientRect();
        lineRef.current.style.left  = buttonRect.left - wrapperRect.left + 'px';
        lineRef.current.style.width = buttonRect.width + 'px';
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (wrapperRef.current) {
                const activeButton = wrapperRef.current.querySelector(`button[data-category="${activeCategory}"]`);
                if (activeButton) moveLine(activeButton);
            }
        }, 50);
        return () => clearTimeout(timer);
    }, [activeCategory]);

    const handlePageChange = (page) => {
        setPage(page);
        requestAnimationFrame(() => {
            catalogRef.current?.scrollIntoView({ block: 'start' });
        });
    };

    const handleCategoryChange = (cat, e) => {
        moveLine(e.currentTarget);
        setCategory(cat);
    };

    const renderCards = () => {
        if (loading) {
            return (
                <div className='catalog-cards'>
                    {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
            );
        }
        if (error) {
            return (
                <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <p style={{ color: 'red' }}>Ошибка загрузки: {error}</p>
                    <button className='help-button' onClick={loadCars}>Попробовать снова</button>
                </div>
            );
        }
        const cars = getCurrentCars();
        if (cars.length === 0) {
            return (
                <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <p className='text-heading-lg' style={{ color: 'inherit' }}>
                        {activeBrand
                            ? `Моделей ${activeBrand} пока нет в каталоге.`
                            : 'Ничего не найдено. Попробуйте изменить фильтры.'}
                    </p>
                    {activeBrand && (
                        <button className='help-button' onClick={() => setBrand(activeBrand)}>
                            Сбросить фильтр
                        </button>
                    )}
                </div>
            );
        }
        return <CatalogCard cars={cars} onOpenModal={onOpenModal} />;
    };

    return (
        <section className="catalog-section" id="catalog">
            <div className="container">
                <div className="cat-title">
                    <div className="text-display-xl">
                        Интересен какой то определенный <span className="cat-brand">бренд?</span>
                    </div>
                </div>
            </div>
            <Brands />
            <div className="container">
                <div className='full-catalog' ref={catalogRef}>
                    <div className='text-display-xl'>Наш полный каталог</div>
                    <div className='catalog-help text-heading-lg'>
                        Не знаете как выбрать правильно?
                        <button
                            className='help-button'
                            onClick={() => {
                                const el = document.getElementById('help');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Помощь в выборе
                        </button>
                    </div>
                    <div className='cat-wrapp' ref={wrapperRef}>
                        <div className='catalog-categories text-body-sm'>
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    data-category={cat}
                                    onClick={(e) => handleCategoryChange(cat, e)}
                                    className={activeCategory === cat ? 'active' : ''}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                        <div className='under-line'>
                            <div className='top-line' ref={lineRef}></div>
                        </div>
                    </div>
                    {renderCards()}
                </div>
                <Paginator
                    totalPages={totalPages}
                    currentPage={currentPage}
                    setCurrentPage={handlePageChange}
                />
            </div>
        </section>
    );
}

export default Catalog;
