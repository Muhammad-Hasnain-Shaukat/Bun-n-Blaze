import React, { useEffect } from 'react';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/common/Navbar';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { BrandStatement } from './components/sections/BrandStatement';
import { MenuSection } from './components/menu/MenuSection';
import { FeaturedProduct } from './components/sections/FeaturedProduct';
import { BrandPillars } from './components/sections/BrandPillars';
import { ReviewsTicker } from './components/sections/ReviewsTicker';
import { SocialFeed } from './components/sections/SocialFeed';
import { LocationsSection } from './components/sections/LocationsSection';
import { Footer } from './components/common/Footer';

// Overlays & Modals
import { CartDrawer } from './components/cart/CartDrawer';
import { MobileCartBar } from './components/cart/MobileCartBar';
import { CustomizerModal } from './components/menu/CustomizerModal';
import { CheckoutModal } from './components/cart/CheckoutModal';
import { OrderTrackerModal } from './components/order/OrderTrackerModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { useOrderStore } from './store/useOrderStore';

export function App() {
  const { theme, currentPage, setCurrentPage } = useOrderStore();

  // Ensure theme class is applied on documentElement
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <div className="relative min-h-screen font-sans selection:bg-blaze selection:text-black overflow-x-hidden bg-[#070709] text-cream">
      {/* 1. Intro Loading Screen */}
      <LoadingScreen />

      {/* 2. Floating Navbar */}
      <Navbar />

      {/* 3. Page Router Container */}
      <main className="min-h-[75vh]">
        {/* FIRST PAGE: ONLY Hero Section and New About Section */}
        {currentPage === 'home' && (
          <div className="animate-fadeIn">
            <HeroSection />
            <AboutSection onNavigateToMenu={() => setCurrentPage('menu')} />
          </div>
        )}

        {/* SEPARATE PAGE: The Menu */}
        {currentPage === 'menu' && (
          <div className="animate-fadeIn pt-2">
            <MenuSection />
          </div>
        )}

        {/* SEPARATE PAGE: Double Inferno Signature Showcase */}
        {currentPage === 'featured' && (
          <div className="animate-fadeIn pt-2">
            <FeaturedProduct />
          </div>
        )}

        {/* SEPARATE PAGE: Philosophy & Brand Pillars */}
        {currentPage === 'philosophy' && (
          <div className="animate-fadeIn pt-2">
            <BrandStatement />
            <BrandPillars />
          </div>
        )}

        {/* SEPARATE PAGE: Feed & Street Reviews */}
        {currentPage === 'feed' && (
          <div className="animate-fadeIn pt-2">
            <ReviewsTicker />
            <SocialFeed />
          </div>
        )}

        {/* SEPARATE PAGE: Spots, Map, WhatsApp & Contact Hotlines */}
        {currentPage === 'locations' && (
          <div className="animate-fadeIn pt-2">
            <LocationsSection />
          </div>
        )}
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Persistent Interaction Drawers & Modals */}
      <CartDrawer />
      <MobileCartBar />
      <CustomizerModal />
      <CheckoutModal />
      <OrderTrackerModal />
      <AdminDashboardModal />
    </div>
  );
}

export default App;
