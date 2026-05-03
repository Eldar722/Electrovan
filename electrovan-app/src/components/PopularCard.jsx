import tengeIcon from '../assets/images/icons/tenge.svg';

function PopularCard({ popularcar = [], onOpenModal }) {
    return (
        <section className='popular-cards'>
            {popularcar.map((car, index) => (
                <div
                    key={car.id}
                    className={`popular-card${index + 1}`}
                    style={car.popularBg ? { backgroundImage: `url(${car.popularBg})` } : undefined}
                >
                    <div className='pop-card-img-mobile'>
                        {car.popularBg
                            ? <img src={car.popularBg} alt={`${car.brand} ${car.model}`} loading="lazy" onError={(e) => e.currentTarget.classList.add('img-fallback')} />
                            : <div className='img-placeholder' style={{ width: '100%', aspectRatio: '16/7' }} />
                        }
                    </div>
                    <div className='container'>
                        <div className='text-display-xl'>
                            {car.brand} {car.model}
                        </div>
                        <div className='popular-cost'>
                            <div className='text-heading-lg'>
                                Цена стартует от {(Number(car.fullPrice ?? car.full_price) || 0).toLocaleString('ru-RU')}
                            </div>
                            <img src={tengeIcon} alt='' aria-hidden="true" />
                        </div>
                        <div className='pop-why'>
                            <div className='text-heading-lg'>
                                Почему именно эта машина?
                            </div>
                        </div>
                        <div className='text-heading-lg'>
                            <div className='pop-nuv'>
                                {car.seats != null && <span>до {car.seats} посадочных мест</span>}
                                {car.battery != null && <span>{car.battery} кВт·ч батарея</span>}
                                {car.range != null && <span>Запас хода — до {car.range} км</span>}
                                {car.volume != null && <span>Кузов {car.volume} м³</span>}
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
