import cityIcon from '../assets/images/icons/cityIcon.svg';
import trackIcon from '../assets/images/icons/logisticIcon.svg';
import rentIcon from '../assets/images/icons/rentIcon.svg';
import tourismIcon from '../assets/images/icons/tourismIcon.svg';

function DirCard() {
    return (
        <div className='directions-cards'>
            <div className='direct-card'>
                <img src={cityIcon} alt='city' />
                <div className='dircard-text text-heading-lg'>
                    Ремонт и строительство
                    <div className='text-caption'>
                        Регулярные маршруты доставки с прогнозируемым пробегом и загрузкой. Подходит для интернет-магазинов, курьерских служб и распределительных центров.
                    </div>
                </div>
            </div>
            <div className='direct-card'>
                <img src={trackIcon} alt='city' />
                <div className='dircard-text text-heading-lg'>
                    Логистика
                    <div className='text-caption'>
                        Эксплуатация на коротких и средних дистанциях с фиксированными маршрутами. Используется для корпоративных и служебных перевозок, трансферов и логистических задач. Используется как в городе так и между городами.
                    </div>
                </div>
            </div>
            <div className='direct-card'>
                <img src={tourismIcon} alt='city' />
                <div className='dircard-text text-heading-lg'>
                    Туризм
                    <div className='text-caption'>
                        Удобен для перевозки пассажиров и багажа на короткие и средние дистанции. Подходит для отелей, экскурсионных маршрутов и организованных поездок.
                    </div>
                </div>
            </div>
            <div className='direct-card'>
                <img src={rentIcon} alt='city' />
                <div className='dircard-text text-heading-lg'>
                    Аренда
                    <div className='text-caption'>
                        Использование в краткосрочной и долгосрочной аренде. Удобен для корпоративных автопарков и компаний, предоставляющих коммерческий транспорт в пользование, а так же для школ и других учебных учреждений.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DirCard;