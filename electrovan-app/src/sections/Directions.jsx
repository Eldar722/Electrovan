import DirCard from "../components/directions-card";

function Directions() {
    return (
        <section className="directions">
        <div className='container'>
          <div className='directions-title text-heading-xl'>
              Где удобно использовать?
              <div className='text-body-md subdirections-title'>
                комфорт услуг в сферах
              </div>
          </div>
          <DirCard />
        </div>
      </section>
    )
}

export default Directions;