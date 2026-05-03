import { memo } from 'react';
import PropTypes from 'prop-types';
import batteryIcon from '../../assets/images/icons/battery-icon.svg';
import routeIcon from '../../assets/images/icons/route-icon.svg';
import vanIcon from '../../assets/images/icons/van-icon.svg';
import tengeIcon from '../../assets/images/icons/tengeDark-icon.svg';

function SingleCard({ car, onSelect }) {
    const subtitle = car.description || car.category || null;

    return (
        <div className='card'>
            <div className='card-img-wrap'>
                {car.image
                    ? <img src={car.image} alt={`${car.brand} ${car.model}`} className='card-img' loading="lazy" onError={(e) => e.currentTarget.classList.add('img-fallback')} />
                    : <div className='card-img img-placeholder' />
                }
            </div>
            <div className='card-titles'>
                <div className='text-body-lg card-inner-title'>{car.brand} {car.model}</div>
                {subtitle && (
                    <div className='text-caption title-in card-inner-description'>{subtitle}</div>
                )}
                <div className='catalog-line'></div>
                <div className='card-params'>
                    <div className='one-param text-body-md'>
                        <img src={batteryIcon} alt='' aria-hidden="true" />
                        <span className='param-text'>{car.battery != null ? `${car.battery} кВт·ч` : '—'}</span>
                    </div>
                    <div className='one-param text-body-md'>
                        <img src={routeIcon} alt='' aria-hidden="true" />
                        <span className='param-text'>{car.range != null ? `${car.range} км` : '—'}</span>
                    </div>
                    <div className='one-param text-body-md'>
                        <img src={vanIcon} alt='' aria-hidden="true" />
                        <span className='param-text'>{car.weight != null ? `${car.weight} т` : '—'}</span>
                    </div>
                </div>
                <div className='catalog-line'></div>
                <div className='card-price'>
                    <div className='card-cost text-caption'>
                        от {(Number(car.fullPrice ?? car.full_price ?? car.price) || 0).toLocaleString('ru-RU')} <img src={tengeIcon} alt='' aria-hidden="true" />
                    </div>
                    <button className='card-button text-caption' onClick={() => onSelect(car)}>
                        Посмотреть детали
                    </button>
                </div>
            </div>
        </div>
    );
}

SingleCard.propTypes = {
    car: PropTypes.shape({
        id:          PropTypes.number,
        brand:       PropTypes.string,
        model:       PropTypes.string,
        description: PropTypes.string,
        category:    PropTypes.string,
        battery:     PropTypes.number,
        range:       PropTypes.number,
        capacity:    PropTypes.number,
        weight:      PropTypes.number,
        fullPrice:   PropTypes.number,
        image:       PropTypes.string,
    }).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default memo(SingleCard);
