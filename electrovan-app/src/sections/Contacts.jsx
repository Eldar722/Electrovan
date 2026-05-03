import WhatsappIcon from '../assets/images/socials/whatsapp.svg';
import TelegramIcon from '../assets/images/socials/telegram.svg';
import MailIcon from '../assets/images/icons/mail-icon.svg';

function PhoneIcon() {
    return (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
    );
}

function Contacts({ settings }) {
    const phone    = settings?.phone    || '+7 777 777 77 77';
    const email    = settings?.email    || 'info@electrovan.kz';
    const whatsapp = settings?.whatsapp || '#';
    const telegram = settings?.telegram || '#';

    return (
        <section className="contacts-section page-white" id="contacts">
            <div className="container">
                <div className="section-heading">
                    <h2 className="text-display-xl text-blue-300">Свяжитесь с нами</h2>
                    <p className="text-body-lg text-blue-100">Мы всегда на связи — выберите удобный способ</p>
                </div>
                <div className="contacts-grid">
                    <a href={`tel:${phone.replace(/\s/g, '')}`} className="contacts-card">
                        <span className="contacts-card-icon" style={{ color: 'rgb(var(--blue-200-rgb))' }}>
                            <PhoneIcon />
                        </span>
                        <span className="text-heading-lg text-blue-300 contacts-card-label">Телефон</span>
                        <span className="text-body-md text-blue-200 contacts-card-value">{phone}</span>
                    </a>

                    <a href={`mailto:${email}`} className="contacts-card">
                        <span className="contacts-card-icon">
                            <img src={MailIcon} alt="" />
                        </span>
                        <span className="text-heading-lg text-blue-300 contacts-card-label">Email</span>
                        <span className="text-body-md text-blue-200 contacts-card-value">{email}</span>
                    </a>

                    <a href={whatsapp} className="contacts-card" target="_blank" rel="noopener noreferrer">
                        <span className="contacts-card-icon">
                            <img src={WhatsappIcon} alt="" />
                        </span>
                        <span className="text-heading-lg text-blue-300 contacts-card-label">WhatsApp</span>
                        <span className="text-body-md text-blue-200 contacts-card-value">Написать в мессенджер</span>
                    </a>

                    <a href={telegram} className="contacts-card" target="_blank" rel="noopener noreferrer">
                        <span className="contacts-card-icon">
                            <img src={TelegramIcon} alt="" />
                        </span>
                        <span className="text-heading-lg text-blue-300 contacts-card-label">Telegram</span>
                        <span className="text-body-md text-blue-200 contacts-card-value">Написать в мессенджер</span>
                    </a>
                </div>
            </div>
        </section>
    );
}

export default Contacts;
