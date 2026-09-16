import React, { useState } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandTicker } from './components/BrandTicker';
import { RoutineSection } from './components/RoutineSection';
import { ProductCatalog } from './components/ProductCatalog';
import { InsideFormula } from './components/InsideFormula';
import { ComparisonSection } from './components/ComparisonSection';
import { WhatsAppGuide } from './components/WhatsAppGuide';
import { SocialProof } from './components/SocialProof';
import { EditorialGallery } from './components/EditorialGallery';
import { FAQSection } from './components/FAQSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { NotificationToast } from './components/NotificationToast';
import { ProductCategory } from './types';

const MainContent: React.FC = () => {
  const { selectedProduct, closeProductModal } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('All');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (cat: ProductCategory) => {
    setSelectedCategory(cat);
    scrollToSection('catalog');
  };

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-zinc-100 flex flex-col font-sans-clean selection:bg-[#ccff00] selection:text-black">
      {/* Navigation */}
      <Navbar
        onNavigateSection={scrollToSection}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExploreCatalog={() => scrollToSection('catalog')}
          onViewRoutine={() => scrollToSection('routine')}
        />

        {/* 2. Marquee Ticker */}
        <BrandTicker />

        {/* 3. The 24-Hour Performance Routine Section */}
        <RoutineSection />

        {/* 4. Complete Supplement Product Catalog & Filter */}
        <ProductCatalog
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* 5. Inside The Formula (Ingredient Science & Purity) */}
        <InsideFormula />

        {/* 6. Comparison Section (VITALØ vs Generic Industry) */}
        <ComparisonSection />

        {/* 7. WhatsApp Social Commerce Ordering Guide */}
        <WhatsAppGuide />

        {/* 8. Athlete Community Reviews & Proof */}
        <SocialProof />

        {/* 9. Editorial Visual Gallery */}
        <EditorialGallery />

        {/* 10. Frequently Asked Questions */}
        <FAQSection />

        {/* 11. Final Call To Action */}
        <FinalCTA onExploreShop={() => scrollToSection('catalog')} />
      </main>

      {/* Footer */}
      <Footer onNavigateSection={scrollToSection} />

      {/* Modals, Overlays & Persistent Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeProductModal}
        />
      )}

      <CartDrawer />
      <SearchModal />
      <FloatingWhatsApp />
      <NotificationToast />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <MainContent />
    </CartProvider>
  );
}
