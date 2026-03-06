import { useState } from 'react';
import crossIcon from '../assets/images/icons/cross-icon.svg';

function CTAmodal({ onClose }) {

    const [isClosing, setIsClosing] = useState(false);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(onClose, 300);
    };

    return (
        <section className={`modal-section${isClosing ? ' modal-section--closing' : ''}`} onClick={handleClose}>
            <div className="container">
                <div className="modalcta-back" onClick={(e) => e.stopPropagation()}>
                    <button className='modal-close' onClick={handleClose}>
                        <img src={crossIcon} alt='cross-icon' />
                    </button>
                    <div className="modalcta-title text-display-xl">
                        Оставить заявку на <span>рассмотрение</span>
                    </div>

                    <div className="modalcta-graphs">
                        <div className="one-graph">
                            <div className="graph-title text-heading-lg">Ваше имя</div>
                            <input type='text' className="text-graph text-body-lg" placeholder="Введите имя.."></input>
                        </div>
                        <div className="one-graph">
                            <div className="graph-title text-heading-lg">Номер телефона</div>
                            <input type='tel' id='phone' className="text-graph text-body-lg"
                                placeholder="Введите номер телефона.." pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required></input>
                        </div>
                        <button className="feedback-button text-heading-lg">Оставить заявку</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTAmodal;