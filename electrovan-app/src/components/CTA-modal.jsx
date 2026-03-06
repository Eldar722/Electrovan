import crossIcon from '../assets/images/icons/cross-icon.svg';

function CTAmodal({ onClose }) {


    return (
        <section className="modal-section">
            <div className="container">
                <div className="modalcta-back">
                    <button className='model-close' onClick={onClose}>
                        <img src={crossIcon} alt='cross-icon' />
                    </button>
                    <div className="modalcta-title text-display-xl">
                        Оставить заявку на <span>рассмотрение</span>
                    </div>

                    <div className="modalcta-graphs">
                        <div className="one-graph">
                            <div className="graph-title text-heading-lg">Ваше имя</div>
                            <input type='text' className="text-graph text-body-lg" placeholder="Введите имя.."></input>
                        </div>
                        <div className="one-graph">
                            <div className="graph-title text-heading-lg">Номер телефона</div>
                            <input type='tel' id='phone' className="text-graph text-body-lg"
                                placeholder="Введите номер телефона.." pattern="[0-9]{3}[0-9]{3}[0-9]{4}" required></input>
                        </div>
                        <button className="feedback-button text-heading-lg">Оставить заявку</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTAmodal;