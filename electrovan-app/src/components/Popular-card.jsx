import tengeIcon from '../assets/images/icons/tenge.svg';

function PopularCard() {
    return (
        <section className='popular-cards'>
            <div className='popular-card1'>
                <div className='container'>
                    <div className='text-display-xl'>
                        GEELY Farizon SuperVan
                    </div>
                    <div className='popular-cost'>
                        <div className='text-heading-lg'>
                            Цена стартует от 12.000.000
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
                            <span>до 10 посадочных мест</span>
                            <span>83кВт*ч батарея</span>
                            <span>Запас хода - до 450 км.</span>
                            <span>Кузов 9,39 куб.м.</span>
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
            <div className='popular-card2'>
                <div className='container'>
                    <div className='text-display-xl'>
                        Renault Master Z.E.
                    </div>
                    <div className='popular-cost'>
                        <div className='text-heading-lg'>
                            Цена стартует от 12.000.000
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
                            <span>до 10 посадочных мест</span>
                            <span>83кВт*ч батарея</span>
                            <span>Запас хода - до 450 км.</span>
                            <span>Кузов 9,39 куб.м.</span>
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
            <div className='popular-card3'>
                <div className='container'>
                    <div className='text-display-xl'>
                        Kia PV5
                    </div>
                    <div className='popular-cost'>
                        <div className='text-heading-lg'>
                            Цена стартует от 12.000.000
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
                            <span>до 10 посадочных мест</span>
                            <span>83кВт*ч батарея</span>
                            <span>Запас хода - до 450 км.</span>
                            <span>Кузов 9,39 куб.м.</span>
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
        </section>
    )
}

export default PopularCard;