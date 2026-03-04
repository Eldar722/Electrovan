import './assets/styles/global.css'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import HeroSection from './sections/Hero.jsx'
import ValueSection from './sections/Value.jsx'
import BenefitsSection from './sections/Benefits.jsx'
import TrustSection from './sections/Trust.jsx'

function App() {
  return (
    <>
      <div className="hero-wrapper">
        <Header />
        <HeroSection />
      </div>
        <ValueSection />
        <BenefitsSection />
        <TrustSection />
        <Footer />
    </>
  );
}

export default App;
