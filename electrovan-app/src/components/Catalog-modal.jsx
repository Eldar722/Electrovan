import { useState } from 'react';
import crossIcon from '../assets/images/icons/cross-icon.svg';
import farizonImg from '../assets/images/cars/farizon-model.png';
import tengeIcon from '../assets/images/icons/tengeDark-icon.svg';

function CatalogModal({ onClose }) {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    return (
        <section className={`modal-section${isClosing ? ' modal-section--closing' : ''}`} onClick={handleClose}>
            <div className="container">
                <button className='modal-close' onClick={handleClose}>
                    <img src={crossIcon} alt='cross-icon' />
                </button>
                <div className="modalcat-back" onClick={(e) => e.stopPropagation()}>
                    <img src={farizonImg} alt='farizon-car' />
                    <div className='modal-info'>
                        <div className='modal-title text-heading-xl'>
                            Geely Farizon SuperVan
                        </div>
                        <div className='modal-subtitle text-body-lg'>
                            Используется в <span>Логистике, Туризме, Аренде.</span>
                        </div>
                        <div className='specs'>
                            <div className='specs-row'>
                                <span className='label'>Грузоподъемность</span>
                                <span className='value'>до 2-х тонн</span>
                            </div>
                            <div className='specs-row'>
                                <span className='label'>Габариты(ДхШхВ)</span>
                                <span className='value'>5490х1980х2500</span>
                            </div>
                            <div className='specs-row'>
                                <span className='label'>Объем кузова</span>
                                <span className='value'>9,39 куб.м</span>
                            </div>
                            <div className='specs-row'>
                                <span className='label'>Емкость батареи</span>
                                <span className='value'>83кВт*ч</span>
                            </div>
                            <div className='specs-row'>
                                <span className='label'>Зарядка</span>
                                <span className='value'>медленная и быстрая(GB/T)</span>
                            </div>
                            <div className='specs-row'>
                                <span className='label'>Запас хода</span>
                                <span className='value'>450км</span>
                            </div>
                            <div className='specs-row'>
                                <span className='label'>Количество мест</span>
                                <span className='value'>7</span>
                            </div>
                            <div className='specs-row'>
                                <span className='label'>Наличие гарантии</span>
                                <span className='value'>есть</span>
                            </div>
                        </div>
                        <div className='modal-end'>
                            <button className='guarantees-button text-caption'>
                                Условия гарантии
                            </button>
                            <div className='model-line'></div>
                            <div className='modal-price'>
                                <div className='modal-cost text-body-md'>
                                    Стоимость: ~16.921.855
                                    <img src={tengeIcon} alt='tenge-icon' />
                                </div>
                                <button className='order-button'>Оформить заказ</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default CatalogModal;