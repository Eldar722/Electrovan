import { useState } from 'react';
import FeedbackIcon from '../assets/images/icons/mail-icon.svg?react';
import CTAmodal from '../components/CTA-modal';


function CTA() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="cta-section">
            <div className="container">
                <div className="cta-block">
                    <div className="cta-title text-display-xl">
                        Готовы приобрести себе <span>электротранспорт?</span>
                    </div>
                    <div className="feedback-title text-body-md">
                        Мы поможем подобрать оптимальное решение для вашего бизнеса и ответим на все вопросы.
                    </div>
                    <button className="cta-button text-heading-lg" onClick={() => setIsOpen(true)}>
                        Оставьте заявку
                        <FeedbackIcon alt='mail-icon' />
                    </button>
                    {isOpen && <CTAmodal onClose={() => setIsOpen(false)} />}
                </div>
            </div>
        </section>
    );
}

export default CTA;