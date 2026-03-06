import './assets/styles/global.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HeroSection from './sections/Hero.jsx'
import ValueSection from './sections/Value.jsx'
import BenefitsSection from './sections/Benefits.jsx'
import TrustSection from './sections/Trust.jsx'
import CatalogSection from './sections/Catalog.jsx'
import CTASection from './sections/CTA.jsx'
import HelpPageSection from './sections/HelpPage.jsx'
import PopularCarSection from './sections/PopularCar.jsx'
import DirectionsSection from './sections/Directions.jsx'

function App() {
  return (
    <>
      <div className="hero-wrapper">
        <Header />
        <HeroSection />
      </div>
        <ValueSection />
        <DirectionsSection />
        <PopularCarSection />
        <CatalogSection />
        <BenefitsSection />
        <HelpPageSection />
        <TrustSection />
        <CTASection />
        <Footer />
    </>
  );
}

export default App;
