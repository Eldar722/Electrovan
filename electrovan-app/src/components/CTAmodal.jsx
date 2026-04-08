import { useState, useRef, useEffect } from 'react';
import crossIcon from '../assets/images/icons/cross-icon.svg';

function CTAmodal({ onClose, onSubmit }) {
    const [isClosing, setIsClosing] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const modalRef = useRef(null);

    const handleClose = () => {
        setIsClosing(true);
    };

    useEffect(() => {
        const el = modalRef.current;
        if (!el) return;

        const onAnimEnd = () => {
            if (isClosing) onClose();
        };
        el.addEventListener('animationend', onAnimEnd);
        return () => el.removeEventListener('animationend', onAnimEnd);
    }, [isClosing, onClose]);

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ name, phone });
        handleClose();
    };

    return (
        <section
            ref={modalRef}
            className={`modal-section${isClosing ? ' modal-section--closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label="Форма заявки"
            onClick={handleClose}
        >
            <div className="modalcta-back" onClick={(e) => e.stopPropagation()}>
                    <button className='modal-close' onClick={handleClose}>
                        <img src={crossIcon} alt='cross-icon' />
                    </button>
                    <div className="modalcta-title text-display-xl">
                        Оставить заявку на <span>рассмотрение</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modalcta-graphs">
                            <div className="one-graph">
                                <div className="graph-title text-heading-lg">Ваше имя</div>
                                <input
                                    type='text'
                                    className="text-graph text-body-lg"
                                    placeholder="Введите имя.."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="one-graph">
                                <div className="graph-title text-heading-lg">Номер телефона</div>
                                <input
                                    type='tel'
                                    className="text-graph text-body-lg"
                                    placeholder="Введите номер телефона.."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    pattern="[\+]?[78]?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}"
                                    required
                                />
                            </div>
                            <button type='submit' className="feedback-button text-heading-lg">
                                Оставить заявку
                            </button>
                        </div>
                    </form>
            </div>
        </section>
    );
}

export default CTAmodal;