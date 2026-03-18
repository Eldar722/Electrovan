import PopularCard from '../components/PopularCard';
import { popularcar } from '../data/popularcar';

function PopularCar() {
    return (
        <section className='catalog-section'>
            <div className='container'>
                <div className='catalog-title'>
                    <div className='text-display-xl'>
                        Наши популярные модели
                    </div>
                </div>
            </div>
            <PopularCard popularcar={popularcar} />
        </section>
    );
}

export default PopularCar;