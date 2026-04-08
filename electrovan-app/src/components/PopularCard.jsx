import tengeIcon from '../assets/images/icons/tenge.svg';
import geelyImg from '../assets/images/cars/GEELY.png';
import renaultImg from '../assets/images/cars/Renault.png';
import kiaImg from '../assets/images/cars/Kia.png';

const carImages = {
    1: geelyImg,
    2: renaultImg,
    3: kiaImg,
};

function PopularCard({ popularcar = [], onOpenModal }) {
    return (
        <section className='popular-cards'>
            {popularcar.map((car) => (
                <div key={car.id} className={`popular-card${car.id}`}>
                    <div className='pop-card-img-mobile'>
                        <img src={carImages[car.id]} alt={car.name} />
                    </div>
                    <div className='container'>
                        <div className='text-display-xl'>
                            {car.name}
                        </div>
                        <div className='popular-cost'>
                            <div className='text-heading-lg'>
                                Цена стартует от {car.price.toLocaleString('ru-RU')}
                            </div>
                            <img src={tengeIcon} alt='tenge-icon' />
                        </div>
                        <div className='pop-why'>
                            <div className='text-heading-lg'>
                                Почему именно эта машина?
                            </div>
                        </div>
                        <div className='text-heading-lg'>
                            <div className='pop-nuv'>
                                {car.specs.map((spec, index) => (
                                    <span key={index}>{spec}</span>
                                ))}
                            </div>
                        </div>
                        <div className='button-block text-body-md'>
                                Стало интересно?
                            <button className='pop-button text-body-md' onClick={onOpenModal}>
                                Узнать подробности
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default PopularCard;
