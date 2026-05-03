import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import crossIcon from '../../assets/images/icons/cross-icon.svg';
import tengeIcon from '../../assets/images/icons/tengeDark-icon.svg';

function CatalogModal({ car, onClose, onOpenCtaModal }) {
    const [isClosing, setIsClosing] = useState(false);
    const modalRef = useRef(null);
    const triggerRef = useRef(null);

    const handleClose = () => {
        setIsClosing(true);
    };

    // Lock background scroll while modal is open; save trigger for focus restore
    useEffect(() => {
        const prev = document.body.style.overflow;
        triggerRef.current = document.activeElement;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
            triggerRef.current?.focus();
        };
    }, []);

    // Close on Escape key
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setIsClosing(true);
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
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
            if (focusable.length === 0) return;
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

    return (
        <section
            ref={modalRef}
            className={`modal-section${isClosing ? ' modal-section--closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={`Карточка ${car.brand} ${car.model}`}
            onClick={handleClose}
        >
            <button className='modal-close' onClick={handleClose} aria-label="Закрыть">
                <img src={crossIcon} alt='' aria-hidden="true" />
            </button>
            <div className="modalcat-back" onClick={(e) => e.stopPropagation()}>
                {car.modalImage
                    ? <img src={car.modalImage} alt={`${car.brand} ${car.model}`} onError={(e) => e.currentTarget.classList.add('img-fallback')} />
                    : <div className='modal-img-placeholder' />
                }
                <div className='modal-info'>
                    <div className='modal-title text-heading-xl'>
                        {car.brand} {car.model}
                    </div>
                    <div className='modal-subtitle text-body-lg'>
                        {car.description}
                    </div>
                    <div className='modal-used'>
                        <div className='modal-used-label text-caption'>Применяется в:</div>
                        <div className='modal-used-tags'>
                            {(car.usedIn ?? []).map((tag) => (
                                <span key={tag} className='modal-used-tag text-caption'>{tag}</span>
                            ))}
                        </div>
                    </div>
                    <div className='specs'>
                        <div className='specs-row'>
                            <span className='label'>Грузоподъемность</span>
                            <span className='value'>{car.capacity != null ? `${car.capacity} кг` : '—'}</span>
                        </div>
                        <div className='specs-row'>
                            <span className='label'>Вес автомобиля</span>
                            <span className='value'>{car.weight != null ? `${car.weight} т` : '—'}</span>
                        </div>
                        <div className='specs-row'>
                            <span className='label'>Габариты (ДхШхВ)</span>
                            <span className='value'>{car.dimensions || '—'}</span>
                        </div>
                        <div className='specs-row'>
                            <span className='label'>Объем кузова</span>
                            <span className='value'>{car.volume != null ? `${car.volume} м³` : '—'}</span>
                        </div>
                        <div className='specs-row'>
                            <span className='label'>Емкость батареи</span>
                            <span className='value'>{car.battery != null ? `${car.battery} кВт·ч` : '—'}</span>
                        </div>
                        <div className='specs-row'>
                            <span className='label'>Запас хода</span>
                            <span className='value'>{car.range != null ? `${car.range} км` : '—'}</span>
                        </div>
                        <div className='specs-row'>
                            <span className='label'>Количество мест</span>
                            <span className='value'>{car.seats != null ? car.seats : '—'}</span>
                        </div>
                        <div className='specs-row'>
                            <span className='label'>Наличие гарантии</span>
                            <span className='value'>{car.warranty ? 'есть' : 'нет'}</span>
                        </div>
                    </div>
                    <div className='modal-specs-line'></div>
                    <div className='modal-end'>
                        {car.warranty && (
                            <button className='guarantees-button text-caption'>
                                Условия гарантии
                            </button>
                        )}
                        <div className='model-line'></div>
                        <div className='modal-price'>
                            <div className='modal-cost text-body-md'>
                                Стоимость: ~{car.fullPrice != null ? Number(car.fullPrice).toLocaleString('ru-RU') : '—'}
                                <img src={tengeIcon} alt='' aria-hidden="true" />
                            </div>
                            <button
                                className='order-button'
                                onClick={() => {
                                    handleClose();
                                    setTimeout(() => onOpenCtaModal?.(), 350);
                                }}
                            >
                                Оформить заказ
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

CatalogModal.propTypes = {
    car: PropTypes.shape({
        brand: PropTypes.string,
        model: PropTypes.string,
        description: PropTypes.string,
        usedIn: PropTypes.arrayOf(PropTypes.string),
        weight: PropTypes.number,
        dimensions: PropTypes.string,
        volume: PropTypes.number,
        battery: PropTypes.number,
        range: PropTypes.number,
        seats: PropTypes.number,
        warranty: PropTypes.bool,
        fullPrice: PropTypes.string,
        modalImage: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onOpenCtaModal: PropTypes.func,
};

export default CatalogModal;
