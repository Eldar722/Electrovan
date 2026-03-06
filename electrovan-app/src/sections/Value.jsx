import { useEffect, useRef } from "react";
import gsap from "gsap";

function Value() {
    const cardsRef = useRef([]);

    useEffect(() => {
        const animations = [];

        cardsRef.current.forEach((card) => {
            if (!card) return;

            const line = card.querySelector(".value-card-line");
            const anim = gsap.to(line, {
                scaleX: 1,
                duration: 0.4,
                ease: "power2.out",
                paused: true,
                transformOrigin: "left center",
            });

            const onEnter = () => anim.play();
            const onLeave = () => anim.reverse();

            card.addEventListener("mouseenter", onEnter);
            card.addEventListener("mouseleave", onLeave);

            animations.push({ card, anim, onEnter, onLeave });
        });

        return () => {
            animations.forEach(({ card, anim, onEnter, onLeave }) => {
                card.removeEventListener("mouseenter", onEnter);
                card.removeEventListener("mouseleave", onLeave);
                anim.kill();
            });
        };
    }, []);

    return (
        <section className="page-white">
            <div className="container">
                <div className="section-heading">
                    <h2 className="section-title text-heading-xl text-blue-300">Что вы получаете покупая у нас</h2>
                    <p className="section-description text-body-md text-blue-200">Конкретные выгоды и результаты, которые получает ваш бизнес. Измеримо, прозрачно, гарантировано.</p>
                </div>
                <div className="value-block">
                    <div className="value-card" ref={(el) => (cardsRef.current[0] = el)}>
                        <div className="value-card-line"></div>
                        <div className="number-block text-body-lg">01</div>
                        <div className="title-subtitle-block">
                            <h4 className="title-block text-heading-lg">Меньше поломок - Меньше расход</h4>
                            <p className="subtitle-block text-body-md">Простая конструкция с минимумом движущихся частей снижает затраты на обслуживание на 70%.</p>
                        </div>
                        <div className="advantages">
                            <p className="advantage text-caption">Экономия до 30% на расходах</p>
                            <p className="advantage text-caption">Окупаемость за 8-12 месяцев</p>
                        </div>
                    </div>
                    <div className="value-card" ref={(el) => (cardsRef.current[1] = el)}>
                        <div className="value-card-line"></div>
                        <div className="number-block text-body-lg">02</div>
                        <div className="title-subtitle-block">
                            <h4 className="title-block text-heading-lg">Бизнес без простоев</h4>
                            <p className="subtitle-block text-body-md">Ваши операции не остановятся из-за транспортных проблем. Гарантируем стабильность и быструю поддержку.</p>
                        </div>
                        <div className="advantages">
                            <p className="advantage text-caption">99.8% времени работы без сбоев</p>
                            <p className="advantage text-caption">Постоянная техническая поддержка</p>
                        </div>
                    </div>
                    <div className="value-card" ref={(el) => (cardsRef.current[2] = el)}>
                        <div className="value-card-line"></div>
                        <div className="number-block text-body-lg">03</div>
                        <div className="title-subtitle-block">
                            <h4 className="title-block text-heading-lg">Больше доверия — больше клиентов</h4>
                            <p className="subtitle-block text-body-md">Соответствие ESG-стандартам повышает значимость среди конкурентов и укрепляет доверие среди клиентов</p>
                        </div>
                        <div className="advantages">
                            <p className="advantage text-caption">Готовые отчёты для инвесторов</p>
                            <p className="advantage text-caption">Международные сертификаты</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Value;