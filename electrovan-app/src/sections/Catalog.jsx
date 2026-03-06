import { useRef, useState } from 'react';
import CatalogCard from '../components/CatalogCard';
import Paginator from '../components/Paginator';
import Brands from '../components/BrandsCarousel';


function Catalog() {
    const cars = [
    { id: 1, name: "Geely Farizon" },
    { id: 2, name: "BYD T3" },
    { id: 3, name: "Volkswagen ID.Buzz" },
    { id: 4, name: "Ford E-Transit" },
    { id: 5, name: "Mercedes eSprinter" },
    ];
    
    const itemPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const catalogRef = useRef(null);

    const totalPages = Math.ceil(cars.length / itemPerPage);
    const start = (currentPage - 1) * itemPerPage;
    const currentCars = cars.slice(start, start + itemPerPage);

    const wrapperRef = useRef(null);
    const lineRef = useRef(null);
    
    const handlePageChange = (page) => {
        setCurrentPage(page);

        requestAnimationFrame(() => {
            catalogRef.current?.scrollIntoView({
                block: "start",
            });
        });
    };

    const moveLine = (e) => {
        const button = e.currentTarget;

        const buttonRect = button.getBoundingClientRect();
        const wrapperRect = wrapperRef.current.getBoundingClientRect();

        lineRef.current.style.left = buttonRect.left - wrapperRect.left + "px";
        lineRef.current.style.width = buttonRect.width + "px";
    };

    return (
        <section className="catalog-section">
            <div className="container">
                <div className="cat-title">
                    <div className="text-display-xl">
                        Интересен какой то определенный <span className="cat-brand">бренд?</span>
                    </div>
                </div>
                <Brands />
                <div className='full-catalog' ref={catalogRef}>
                    <div className='text-display-xl'>Наш полный каталог</div>
                        <div className='catalog-help text-heading-lg'>
                            Не знаете как выбрать правильно?
                            <button className='help-button'>
                                Помощь в выборе
                            </button>
                        </div>
                    <div className='cat-wrapp' ref={wrapperRef}>
                        <div className='catalog-categories text-heading-lg'>
                            <button onClick={moveLine} >Грузовые</button>
                            <button onClick={moveLine} >Пассажирские</button>
                            <button onClick={moveLine} >Грузо-пассажирские</button>
                        </div>
                        <div className='under-line'>
                            <div className='top-line' ref={lineRef} ></div>
                        </div>
                    </div>
                    <section className='catalog-cards'>
                        {currentCars.map((car) => (
                            <CatalogCard key={car.id} car={car} />
                        ))}
                    </section>
                </div>
                    <Paginator 
                    totalPages={totalPages} 
                    currentPage={currentPage} 
                    setCurrentPage={handlePageChange} />
            </div>
        </section>
    )
}


export default Catalog;