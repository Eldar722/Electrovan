import { useState, useEffect } from 'react';

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
            <span className="logo text-heading-xl">ElectroVan</span>
            <nav className="nav">
                <a href="" className="nav-link text-body-sm">Направления</a>
                <a href="" className="nav-link text-body-sm">Каталог</a>
                <a href="" className="nav-link text-body-sm">Помощь</a>
                <a href="" className="nav-link text-body-sm">Гарантии</a>
                <a href="" className="nav-link text-body-sm">Контакты</a>
            </nav>
            <button className="cta-btn text-body-lg">Оставить заявку</button>
        </header>
    );
}

export default Header;