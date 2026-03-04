function Header () {
    return(
        <header>
            <div className="container">
                <div className="header">
                    <span className="logo text-heading-lg">ElectroVan</span>
                    <nav className="nav">
                        <a href="" className="nav-link text-body-sm">Направления</a>
                        <a href="" className="nav-link text-body-sm">Каталог</a>
                        <a href="" className="nav-link text-body-sm">Помощь</a>
                        <a href="" className="nav-link text-body-sm">Гарантии</a>
                        <a href="" className="nav-link text-body-sm">Контакты</a>
                    </nav>
                    <button className="cta-btn text-body-lg">Оставить заявку</button>
                </div>
            </div>
        </header>
    );
}

export default Header;