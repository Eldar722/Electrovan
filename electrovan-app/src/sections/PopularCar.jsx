import PopularCard from '../components/PopularCard';
import { useCatalogStore } from '../store/useCatalogStore';

function PopularCar({ onOpenModal }) {
    const cars    = useCatalogStore((s) => s.cars);
    const loading = useCatalogStore((s) => s.loading);
    const popularCars = cars.filter((car) => car.isPopular);

    if (loading || popularCars.length === 0) return null;

    return (
        <section className='catalog-section'>
            <div className='container'>
                <div className='catalog-title'>
                    <div className='text-display-xl'>
                        Наши популярные модели
                    </div>
                </div>
            </div>
            <PopularCard popularcar={popularCars} onOpenModal={onOpenModal}/>
        </section>
    );
}

export default PopularCar;