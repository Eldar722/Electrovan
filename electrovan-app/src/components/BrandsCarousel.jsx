import { useRef, useState, useEffect, useMemo } from 'react';
import RenaultIcon from '../assets/images/brands/renault-icon.svg?react';
import MercedesIcon from '../assets/images/brands/mercedes-icon.svg?react';
import GeelyIcon from '../assets/images/brands/geely-icon.svg?react';
import VolkswagenIcon from '../assets/images/brands/volkswagen-icon.svg?react';
import LixiangIcon from '../assets/images/brands/lixiang-icon.svg?react';
import leftIcon from '../assets/images/icons/left-icon.svg';
import rightIcon from '../assets/images/icons/right-icon.svg';
import { isCatalogBrandExcluded, useCatalogStore } from '../store/useCatalogStore.js';

// Add new brand SVG icons here as the catalog grows.
// Unknown brands render as text-only buttons automatically.
const BRAND_ICONS = {
    Geely:      GeelyIcon,
    Lixiang:    LixiangIcon,
    Volkswagen: VolkswagenIcon,
    Renault:    RenaultIcon,
    Mercedes:   MercedesIcon,
};

function BrandCarousel() {
    const activeBrand = useCatalogStore(s => s.activeBrand);
    const setBrand    = useCatalogStore(s => s.setBrand);
    const cars        = useCatalogStore(s => s.cars);

    // Derived from live store — updates automatically when cars change via realtime.
    const brands = useMemo(
        () => [...new Set(cars.map(c => c.brand).filter(brand => brand && !isCatalogBrandExcluded(brand)))].sort(),
        [cars]
    );

    const scrollRef        = useRef(null);
    const [pages, setPages]               = useState(1);
    const [activePage, setActivePage]     = useState(0);
    const touchStartX      = useRef(null);
    const touchScrollStart = useRef(0);
    const lastTouchX       = useRef(0);
    const lastTouchTime    = useRef(0);
    const touchVelocity    = useRef(0);
    const momentumFrame    = useRef(null);

    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;
        const check = () => {
            setPages(Math.max(1, Math.ceil(container.scrollWidth / container.clientWidth)));
        };
        check();
        const ro = new ResizeObserver(check);
        ro.observe(container);
        return () => ro.disconnect();
    }, [brands]);

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const progress  = maxScroll > 0 ? container.scrollLeft / maxScroll : 0;
        setActivePage(Math.round(progress * (pages - 1)));
    };

    const goToPage = (pageIndex) => {
        const container = scrollRef.current;
        if (!container) return;
        const maxScroll = container.scrollWidth - container.clientWidth;
        container.scrollTo({ left: pages > 1 ? (pageIndex / (pages - 1)) * maxScroll : 0, behavior: 'smooth' });
        setActivePage(pageIndex);
    };

    const scroll = (direction) => {
        const container = scrollRef.current;
        if (!container) return;
        container.scrollBy({ left: direction === 'right' ? container.clientWidth * 0.8 : -container.clientWidth * 0.8, behavior: 'smooth' });
    };

    const handleTouchStart = (e) => {
        if (momentumFrame.current) cancelAnimationFrame(momentumFrame.current);
        const x = e.touches[0].clientX;
        touchStartX.current      = x;
        lastTouchX.current       = x;
        lastTouchTime.current    = Date.now();
        touchScrollStart.current = scrollRef.current?.scrollLeft ?? 0;
        touchVelocity.current    = 0;
    };

    const handleTouchMove = (e) => {
        if (touchStartX.current === null) return;
        const x   = e.touches[0].clientX;
        const now = Date.now();
        const dt  = now - lastTouchTime.current;
        if (dt > 0) touchVelocity.current = (lastTouchX.current - x) / dt;
        lastTouchX.current    = x;
        lastTouchTime.current = now;
        const delta = touchStartX.current - x;
        if (Math.abs(delta) > 4 && scrollRef.current) {
            scrollRef.current.scrollLeft = touchScrollStart.current + delta;
        }
    };

    const handleTouchEnd = () => {
        touchStartX.current = null;
        let velocity        = touchVelocity.current;
        const container     = scrollRef.current;
        if (!container || Math.abs(velocity) < 0.1) return;
        const step = () => {
            velocity *= 0.9;
            container.scrollLeft += velocity * 16;
            if (Math.abs(velocity) > 0.1) momentumFrame.current = requestAnimationFrame(step);
        };
        momentumFrame.current = requestAnimationFrame(step);
    };

    const handleBrandClick = (brandName) => {
        setBrand(brandName);
        requestAnimationFrame(() => {
            document.querySelector('.full-catalog')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    };

    return (
        <section className="brand-nuv">
            <div className='brand-carousel'>
                <div className='carousel-wrapper'>
                    <button className='scroll-btn' onClick={() => scroll('left')} disabled={activePage === 0} aria-label="Прокрутить влево">
                        <img src={leftIcon} alt='' aria-hidden="true" />
                    </button>
                    <div
                        className='scroll-carousel text-heading-lg'
                        ref={scrollRef}
                        onScroll={handleScroll}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        <button
                            className={`brand-button brand-button--all ${!activeBrand ? 'active' : ''}`}
                            onClick={() => handleBrandClick(null)}
                            aria-label="Показать все бренды"
                        >
                            Все
                        </button>
                        {brands.map((name) => {
                            const Icon = BRAND_ICONS[name];
                            return (
                                <button
                                    key={name}
                                    className={`brand-button ${activeBrand === name ? 'active' : ''}`}
                                    onClick={() => handleBrandClick(name)}
                                    aria-label={`Фильтр по бренду ${name}`}
                                >
                                    {Icon && <Icon className="brand-icon" aria-hidden="true" />}
                                    {name}
                                </button>
                            );
                        })}
                    </div>
                    <button className='scroll-btn' onClick={() => scroll('right')} disabled={activePage === pages - 1} aria-label="Прокрутить вправо">
                        <img src={rightIcon} alt='' aria-hidden="true" />
                    </button>
                </div>
                <div
                    className="indicator"
                    role="tablist"
                    aria-label="Страницы карусели"
                    aria-hidden={pages <= 1}
                    style={{ visibility: pages > 1 ? 'visible' : 'hidden' }}
                >
                    {Array.from({ length: Math.max(pages, 2) }).map((_, i) => (
                        <button
                            key={i}
                            role="tab"
                            aria-selected={activePage === i}
                            aria-label={`Страница ${i + 1}`}
                            onClick={() => goToPage(i)}
                            tabIndex={pages > 1 ? 0 : -1}
                            className={`brand-indicator ${activePage === i ? 'active' : ''}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

export default BrandCarousel;
