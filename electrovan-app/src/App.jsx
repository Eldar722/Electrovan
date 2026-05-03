import { useState, useEffect, useCallback } from 'react';
import { submitLead, fetchSettings, supabase } from './api/supabase';
import { useCatalogStore } from './store/useCatalogStore';
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
import CTAmodal from './components/CTAmodal.jsx'

function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isToastClosing, setIsToastClosing] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [siteSettings, setSiteSettings] = useState(null);
    const loadCars = useCatalogStore((s) => s.loadCars);
    const subscribeToCarChanges = useCatalogStore((s) => s.subscribeToCarChanges);

    useEffect(() => {
        loadCars();
        const unsubscribeCars = subscribeToCarChanges();

        const loadSettings = () => {
            fetchSettings().then(data => { if (data) setSiteSettings(data); }).catch(() => {});
        };
        loadSettings();

        // Realtime fires a fresh fetch instead of using payload.new directly —
        // safe even if table lacks REPLICA IDENTITY FULL (partial rows).
        const settingsChannel = supabase
            .channel('site-settings-landing')
            .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'site_settings' }, loadSettings)
            .subscribe();

        return () => {
            unsubscribeCars();
            supabase.removeChannel(settingsChannel);
        };
    }, [loadCars, subscribeToCarChanges]);

    const openModal  = useCallback(() => setIsModalOpen(true),  []);
    const closeModal = useCallback(() => setIsModalOpen(false), []);

    const handleFormSubmit = useCallback(async ({ name, phone }) => {
        await submitLead(name, phone); // throws on error — CTAmodal handles it

        setShowToast(true);
        setIsToastClosing(false);

        setTimeout(() => {
            setIsToastClosing(true);
            setTimeout(() => {
                setShowToast(false);
                setIsToastClosing(false);
            }, 300);
        }, 3700);
    }, []);

    return (
        <>
            {/* Screen reader announcement — always in DOM so aria-live fires on text change */}
            <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {showToast ? 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.' : ''}
            </div>

            {/* Visual toast — mounts/unmounts to keep CSS animation working */}
            {showToast && (
                <div className={`toast${isToastClosing ? ' toast--closing' : ''}`}>
                    Заявка отправлена! Мы свяжемся с вами в ближайшее время.
                </div>
            )}

            {isModalOpen && (
                <CTAmodal
                    onClose={closeModal}
                    onSubmit={handleFormSubmit}
                />
            )}

            <div className="hero-wrapper">
                <Header onOpenModal={openModal} />
                <HeroSection onOpenModal={openModal} />
            </div>
            <ValueSection />
            <DirectionsSection id="directions" />
            <PopularCarSection onOpenModal={openModal} />
            <CatalogSection id="catalog" onOpenModal={openModal} />
            <BenefitsSection />
            <HelpPageSection id="help" />
            <TrustSection id="guarantee" />
            <CTASection onOpenModal={openModal} />
            <Footer onOpenModal={openModal} settings={siteSettings} />
        </>
    );
}

export default App;