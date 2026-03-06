import RenaultIcon from '../assets/images/brands/renault-icon.svg?react';
import MercedesIcon from '../assets/images/brands/mercedes-icon.svg?react';
import GeelyIcon from '../assets/images/brands/geely-icon.svg?react';
import VolkswagenIcon from '../assets/images/brands/volkswagen-icon.svg?react';
import LixiangIcon from '../assets/images/brands/lixiang-icon.svg?react';
import backIcon from '../assets/images/icons/back-icon.svg';
import nextIcon from '../assets/images/icons/next-icon.svg';
import { useState, useRef, useEffect } from 'react';

const brands = [
    { id: 1, name: "Renault", Icon: RenaultIcon },
    { id: 2, name: "Mercedes", Icon: MercedesIcon },
    { id: 3, name: "Geely", Icon: GeelyIcon },
    { id: 4, name: "Volkswagen", Icon: VolkswagenIcon },
    { id: 5, name: "Lixiang", Icon: LixiangIcon },
    { id: 6, name: "Renault", Icon: RenaultIcon },
    { id: 7, name: "Mercedes", Icon: MercedesIcon },
    { id: 8, name: "Geely", Icon: GeelyIcon },
    { id: 9, name: "Volkswagen", Icon: VolkswagenIcon },
    { id: 10, name: "Lixiang", Icon: LixiangIcon },
];
function BrandCarousel() {
    const [activeBrand, setActiveBrand] = useState(0);
    const scrollRef = useRef(null);
    const [activePage, setActivePage] = useState(0);
    const itemsPerPage = 5;
    const pages = Math.ceil(brands.length / itemsPerPage);
    const goToPage = (pageIndex) => {
        const container = scrollRef.current;
        const itemWidth = container.children[0].offsetWidth + 50;
        const scrollLeft = pageIndex * itemsPerPage * itemWidth;
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
        setActivePage(pageIndex);
    };
    const scroll = (directions) => {
        if (directions === "left") goToPage(Math.max(activePage - 1, 0));
        else goToPage(Math.min(activePage + 1, pages - 1));
    };
    return (
        <section className="brand-nuv">
            <div className='brand-carousel'>
                <div className='carousel-wrapper'>
                    <button className='scroll-btn' onClick={() => scroll("left")} disabled={activePage === 0}>
                        <img src={backIcon} alt='back-icon' />
                    </button>
                    <div className='scroll-carousel text-heading-lg' ref={scrollRef}>
                        {brands.map((brand) => {
                            const Icon = brand.Icon;
                            return (
                                <button key={brand.id} className={`brand-button ${activeBrand === brand.id ? "active" : ""}`}
                                    onClick={() => setActiveBrand(brand.id)}>
                                    <Icon className="brand-icon" />
                                    {brand.name}
                                </button>
                            );
                        })}
                    </div>
                    <button className='scroll-btn' onClick={() => scroll("right")} disabled={activePage === pages - 1}>
                        <img src={nextIcon} alt='back-icon' />
                    </button>
                </div>
                <div className="indicator">
                    {Array.from({ length: pages }).map((_, index) => (
                        <button key={index} onClick={() => goToPage(index)}
                            className={`brand-indicator ${activePage === index ? 'active' : ''}`}>
                        </button>))}
                </div>
            </div>
        </section>);
}

export default BrandCarousel;