import WhatsappIcon from "../assets/images/socials/whatsapp.svg"
import TelegramIcon from "../assets/images/socials/telegram.svg"

function Footer({ onOpenModal, settings }) {
    const phone    = settings?.phone    || '+7 777 777 77 77';
    const email    = settings?.email    || 'info@electrovan.kz';
    const whatsapp = settings?.whatsapp || '#';
    const telegram = settings?.telegram || '#';

    return (
        <footer className="page-blue" id="footer">
            <div className="container">
                <div className="footer-container">
                    <div className="footer-brand">
                        <span className="footer-logo text-display-xl text-white-base">ElectroVan</span>
                        <ul className="footer-feature text-white-base text-caption">
                            <li>Коммерческий электротранспорт для бизнеса.</li>
                            <li>Снижение затрат на эксплуатацию до 70%.</li>
                            <li>Надежность и простое обслуживание.</li>
                        </ul>
                    </div>
                    <div className="footer-socials">
                        <h3 className="footer-title text-white-base text-heading-lg">Соц. сети</h3>
                        <ul className="social-list">
                            <li>
                                <a href={whatsapp} className="social-link" target="_blank" rel="noopener noreferrer">
                                    <img src={WhatsappIcon} alt="Whatsapp" className="social-link-icon" />
                                    <span className="social-link-text text-body-lg text-white-base">Whatsapp</span>
                                </a>
                            </li>
                            <li>
                                <a href={telegram} className="social-link" target="_blank" rel="noopener noreferrer">
                                    <img src={TelegramIcon} alt="Telegram" className="social-link-icon" />
                                    <span className="social-link-text text-body-lg text-white-base">Telegram</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="footer-contacts">
                        <h3 className="footer-title text-heading-lg text-white-base">Контакты</h3>
                        <a href={`tel:${phone.replace(/\s/g, '')}`} className="footer-phone text-body-lg text-white-base">{phone}</a>
                        <a href={`mailto:${email}`} className="footer-email text-body-lg text-white-base">{email}</a>
                        <button className="footer-cta-btn text-body-lg" onClick={onOpenModal}>Рассчитать экономию</button>
                        <div className="footer-warranty text-white-base">Гарантия до <strong>50 000 км</strong></div>
                    </div>
                </div>
                <hr className="footer-divider" />
                <div className="footer-bottom">
                    <p className="footer-copyright">&copy; 2026 ElectroVan</p>
                    <div className="footer-legal">
                        <a href="#">Политика конфиденциальности</a>
                        <a href="#">Пользовательское соглашение</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
