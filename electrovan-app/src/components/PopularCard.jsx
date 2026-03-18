import tengeIcon from '../assets/images/icons/tenge.svg';

function PopularCard({ popularcar = [] }) {
    return (
        <section className='popular-cards'>
            {popularcar.map((car) => (
                <div key={car.id} className={`popular-card${car.id}`}>
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
                        <div className='button-block'>
                            <div className='text-body-md'>
                                Стало интересно?
                            </div>
                            <button className='pop-button'>
                                <div className='text-body-md'>Узнать подробности</div>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}

export default PopularCard;