function Hero () {
    return(
        <section>
            <div className="container hero-content">
                <div className="main-text-container">
                    <h1 className="main-text-hero text-display-xl">
                        <span className="highlight">Электро</span> транспорт -
                        наше реальное
                        будущее
                    </h1>
                </div>
                <div className="sub-text-container">
                    <p className="sub-text-hero text-body-md">Хороший вариант для бизнеса. То что нужно, для коммерческих целей с <span className="alt-highlight">большой</span> выгодой.</p>
                </div>
                <div className="hero-buttons">
                    <button className="hero-cta-button text-body-lg">Оставить заявку</button>
                    <button className="catalog-button text-body-lg">Перейти к каталогу</button>
                </div>
                <hr className="line-under-cta" />
                <div className="statistics">
                    <div className="block-of-statistic">
                        <div className="number-of-statistic text-heading-xl">50 000</div>
                        <div className="thing-of-statistic text-caption">км гарантии</div>
                    </div>
                    <div className="block-of-statistic">
                        <div className="number-of-statistic text-heading-xl">70%</div>
                        <div className="thing-of-statistic text-caption">экономии</div>
                    </div>
                    <div className="block-of-statistic">
                        <div className="number-of-statistic text-heading-xl">24/7</div>
                        <div className="thing-of-statistic text-caption">поддержка</div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;    