import { useState, useEffect } from 'react';

const navLinks = [
        { desktop: 'Направления', mobile: 'Направления', href: "#directions"},
        { desktop: 'Каталог', mobile: 'Перейти в каталог', href: "#catalog"},
        { desktop: 'Помощь', mobile: 'Помощь в выборе', href: "#help"},
        { desktop: 'Гарантии', mobile: 'Условия гарантии', href: "#guarantee"},
        { desktop: 'Контакты', mobile: 'Наши контакты', href: "#footer"},
];

function Header({ onOpenModal }) {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 80);

        const debounce = (fn, delay) => {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => fn(...args), delay);
            };
        };

        const handleResize = debounce(() => setIsMobile(window.innerWidth <= 768), 150);

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
        
        return () => { 
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return (
        <header className={`header${scrolled ? ' header--scrolled' : ''}`} role="banner">
            <span className={`logo text-heading-xl ${isMobileMenuOpen ? 'logo--menu-open' : ''}`}>ElectroVan</span>
            <nav id="main-nav" className={`nav ${isMobileMenuOpen ? 'nav--open' : ''}`} aria-label="Основная навигация">
                {navLinks.map((link) => (
                    <a
                        key={link.desktop}
                        href={link.href}
                        className="nav-link text-body-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {isMobile ? link.mobile : link.desktop}
                    </a>
                ))}
                <button className="cta-btn text-body-lg cta-btn--mobile" onClick={onOpenModal}>Оставить заявку</button>
            </nav>
            <button className="cta-btn text-body-lg cta-btn--desktop" onClick={onOpenModal}>Оставить заявку</button>

            <button
                className={`menu-btn ${isMobileMenuOpen ? 'menu-btn--open' : ''}`}
                aria-expanded={isMobileMenuOpen}
                aria-controls="main-nav"
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
        </header>
    );
}

export default Header;
