import geelyCar from '../assets/images/cars/geely-card.png';
import batteryIcon from '../assets/images/icons/battery-icon.svg';
import routeIcon from '../assets/images/icons/route-icon.svg';
import vanIcon from '../assets/images/icons/van-icon.svg';
import tengeIcon from '../assets/images/icons/tengeDark-icon.svg';
import CatalogModal from './Catalog-modal';
import { useState } from 'react';

function CatalogCard() {
    const [isOpen, setIsOpen] = useState(false);
    console.log(isOpen);

    return (
        <section className='catalog-cards'>
            <div className='card'>
                <img src={geelyCar} alt='geely-car' className='card-img' />
                <div className='card-titles'>
                    <div className='text-body-lg'>Geely Farizon SuperVan</div>
                    <div className='text-caption title-in'>Поместится до 10 человек</div>
                    <div className='card-line'></div>
                    <div className='card-params'>
                        <div className='one-param text-body-md'>
                            <img src={batteryIcon} alt='battery-icon' />
                            83кВт*ч
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={routeIcon} alt='battery-icon' />
                            450км.
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={vanIcon} alt='battery-icon' />
                            1.8тонн
                        </div>
                    </div>
                    <div className='card-line'></div>
                    <div className='card-price'>
                        <div className='card-cost text-caption'>
                            от 12.000.000
                            <img src={tengeIcon} alt='tenge-icon' />
                        </div>
                        <button className='card-button text-caption' onClick={() => setIsOpen(true)}>
                            Посмотреть детали
                        </button>
                        {isOpen && <CatalogModal onClose={() => setIsOpen(false)} />}
                    </div>
                </div>
            </div>
            <div className='card'>
                <img src={geelyCar} alt='geely-car' className='card-img' />
                <div className='card-titles'>
                    <div className='text-body-lg'>Geely Farizon SuperVan</div>
                    <div className='text-caption title-in'>Поместится до 10 человек</div>
                    <div className='card-line'></div>
                    <div className='card-params'>
                        <div className='one-param text-body-md'>
                            <img src={batteryIcon} alt='battery-icon' />
                            83кВт*ч
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={routeIcon} alt='battery-icon' />
                            450км.
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={vanIcon} alt='battery-icon' />
                            1.8тонн
                        </div>
                    </div>
                    <div className='card-line'></div>
                    <div className='card-price'>
                        <div className='card-cost text-caption'>
                            от 12.000.000
                            <img src={tengeIcon} alt='tenge-icon' />
                        </div>
                        <button className='card-button text-caption' onClick={() => setIsOpen(true)}>
                            Посмотреть детали
                        </button>
                        {isOpen && <CatalogModal onClose={() => setIsOpen(false)} />}
                    </div>
                </div>
            </div>
            <div className='card'>
                <img src={geelyCar} alt='geely-car' className='card-img' />
                <div className='card-titles'>
                    <div className='text-body-lg'>Geely Farizon SuperVan</div>
                    <div className='text-caption title-in'>Поместится до 10 человек</div>
                    <div className='card-line'></div>
                    <div className='card-params'>
                        <div className='one-param text-body-md'>
                            <img src={batteryIcon} alt='battery-icon' />
                            83кВт*ч
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={routeIcon} alt='battery-icon' />
                            450км.
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={vanIcon} alt='battery-icon' />
                            1.8тонн
                        </div>
                    </div>
                    <div className='card-line'></div>
                    <div className='card-price'>
                        <div className='card-cost text-caption'>
                            от 12.000.000
                            <img src={tengeIcon} alt='tenge-icon' />
                        </div>
                        <button className='card-button text-caption' onClick={() => setIsOpen(true)}>
                            Посмотреть детали
                        </button>
                        {isOpen && <CatalogModal onClose={() => setIsOpen(false)} />}
                    </div>
                </div>
            </div>
            <div className='card'>
                <img src={geelyCar} alt='geely-car' className='card-img' />
                <div className='card-titles'>
                    <div className='text-body-lg'>Geely Farizon SuperVan</div>
                    <div className='text-caption title-in'>Поместится до 10 человек</div>
                    <div className='card-line'></div>
                    <div className='card-params'>
                        <div className='one-param text-body-md'>
                            <img src={batteryIcon} alt='battery-icon' />
                            83кВт*ч
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={routeIcon} alt='battery-icon' />
                            450км.
                        </div>
                        <div className='one-param text-body-md'>
                            <img src={vanIcon} alt='battery-icon' />
                            1.8тонн
                        </div>
                    </div>
                    <div className='card-line'></div>
                    <div className='card-price'>
                        <div className='card-cost text-caption'>
                            от 12.000.000
                            <img src={tengeIcon} alt='tenge-icon' />
                        </div>
                        <button className='card-button text-caption' onClick={() => setIsOpen(true)}>
                            Посмотреть детали
                        </button>
                        {isOpen && <CatalogModal onClose={() => setIsOpen(false)} />}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CatalogCard;