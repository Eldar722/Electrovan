import { useState, useRef, useEffect } from 'react';
import crossIcon from '../assets/images/icons/cross-icon.svg';

function CTAmodal({ onClose, onSubmit }) {
    const [isClosing, setIsClosing] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const modalRef = useRef(null);

    const handleClose = () => {
        if (isSubmitting) return;
        setIsClosing(true);
    };

    // Lock background scroll; restore focus to trigger element on close
    useEffect(() => {
        const prev = document.body.style.overflow;
        const trigger = document.activeElement;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
            trigger?.focus();
        };
    }, []);

    // Focus trap: keep Tab/Shift+Tab inside the modal
    useEffect(() => {
        const el = modalRef.current;
        if (!el) return;
        const handleTab = (e) => {
            if (e.key !== 'Tab') return;
            const focusable = el.querySelectorAll(
                'button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];
            if (e.shiftKey) {
                if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
            } else {
                if (document.activeElement === last)  { e.preventDefault(); first?.focus(); }
            }
        };
        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, []);

    // Close on Escape key (blocked during submit)
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape' && !isSubmitting) setIsClosing(true);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isSubmitting]);

    // Close after exit animation; fallback fires if animation doesn't trigger
    useEffect(() => {
        if (!isClosing) return;
        const el = modalRef.current;
        const fallback = setTimeout(onClose, 400);
        const onAnimEnd = () => {
            clearTimeout(fallback);
            onClose();
        };
        el?.addEventListener('animationend', onAnimEnd);
        return () => {
            el?.removeEventListener('animationend', onAnimEnd);
            clearTimeout(fallback);
        };
    }, [isClosing, onClose]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isSubmitting) return;

        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();

        if (!trimmedName) {
            setSubmitError('Введите имя.');
            return;
        }
        if (!trimmedPhone) {
            setSubmitError('Введите номер телефона.');
            return;
        }

        setIsSubmitting(true);
        setSubmitError(null);
        try {
            await onSubmit({ name: trimmedName, phone: trimmedPhone });
            handleClose();
        } catch {
            setSubmitError('Не удалось отправить заявку. Попробуйте ещё раз.');
            setIsSubmitting(false);
        }
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
                    <button className='modal-close' onClick={handleClose} aria-label="Закрыть">
                        <img src={crossIcon} alt='' aria-hidden="true" />
                    </button>
                    <div className="modalcta-title text-display-xl">
                        Оставить заявку на <span>рассмотрение</span>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modalcta-graphs">
                            <div className="one-graph">
                                <label htmlFor="cta-name" className="graph-title text-heading-lg">Ваше имя</label>
                                <input
                                    id="cta-name"
                                    type='text'
                                    className="text-graph text-body-lg"
                                    placeholder="Введите имя.."
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    disabled={isSubmitting}
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className="one-graph">
                                <label htmlFor="cta-phone" className="graph-title text-heading-lg">Номер телефона</label>
                                <input
                                    id="cta-phone"
                                    type='tel'
                                    className="text-graph text-body-lg"
                                    placeholder="Введите номер телефона.."
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    pattern="[\+]?[78]?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}"
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>
                            {submitError && (
                                <p role="alert" style={{ color: '#ff6b6b', margin: 0, fontSize: '14px' }}>{submitError}</p>
                            )}
                            <button type='submit' className="feedback-button text-heading-lg" disabled={isSubmitting}>
                                {isSubmitting ? 'Отправка...' : 'Оставить заявку'}
                            </button>
                        </div>
                    </form>
            </div>
        </section>
    );
}

export default CTAmodal;