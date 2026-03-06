import PopularCard from '../components/Popular-card';

function PopularCar() {
    return (
        <section className='catalog-section'>
        <div className='container'>
          <div className='catalog-title'>
            <div className='text-display-xl'>
              Наши популярные модели
            </div>
          </div>
        </div>
        <PopularCard />
      </section>
    )
}

export default PopularCar;