import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { getWhatsAppGeneralContactUrl } from '../utils/whatsapp';

interface NavbarProps {
  onNavigateSection: (sectionId: string) => void;
  onFilterCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection, onFilterCategory }) => {
  const { cartCount, openCart, openSearch, isCartBumping } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigateSection(sectionId);
  };

  const handleCategoryClick = (category: string) => {
    setIsMobileMenuOpen(false);
    if (onFilterCategory) {
      onFilterCategory(category);
    }
    onNavigateSection('catalog');
  };

  const navLinks = [
    { id: 'catalog', label: 'Shop All' },
    { id: 'routine', label: 'The Routine' },
    { id: 'formulas', label: 'Our Formulas' },
    { id: 'whatsapp-guide', label: 'How to Order', badge: true },
    { id: 'reviews', label: 'Community' },
    { id: 'faq', label: 'FAQ' }
  ];

  return (
    <>
      {/* Top Notification Announcement Bar with Subtle Shimmer */}
      <div id="announcement-bar" className="bg-[#101215] border-b border-zinc-800/80 text-[11px] sm:text-xs text-zinc-300 py-1.5 px-4 text-center tracking-wide font-tech uppercase relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 relative z-10">
          <span className="inline-flex items-center gap-1.5 text-[#ccff00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-ping"></span>
            NEXT-DAY DISPATCH
          </span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="hidden sm:inline text-zinc-400">FREE SHIPPING ON ORDERS OVER 1,500 EGP</span>
          <span className="text-zinc-600 hidden md:inline">•</span>
          <span className="text-zinc-300">ORDER DIRECTLY ON WHATSAPP (+20 155 538 0043)</span>
        </div>
      </div>

      {/* Main Sticky Navbar with Dynamic Blur & Elevation */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0b0c0e]/95 backdrop-blur-xl border-b border-zinc-800/90 shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
            : 'bg-[#0b0c0e]/75 backdrop-blur-md border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Morphing Hamburger + Brand Logo */}
            <div className="flex items-center gap-4 sm:gap-6">
              {/* Animated Morphing Hamburger Icon */}
              <button
                id="btn-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors focus:outline-none relative w-8 h-8 flex flex-col items-center justify-center cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-1.5 bg-[#ccff00]' : ''
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transition-all duration-200 my-1 ${
                    isMobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-current rounded-full transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 -translate-y-1.5 bg-[#ccff00]' : ''
                  }`}
                />
              </button>

              <button
                id="btn-brand-logo"
                onClick={() => handleNavClick('hero')}
                className="flex items-center gap-2 group text-left cursor-pointer"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-zinc-900 border border-[#ccff00]/40 flex items-center justify-center font-display font-black text-[#ccff00] text-lg sm:text-xl shadow-[0_0_15px_rgba(204,255,0,0.15)] group-hover:scale-105 group-hover:border-[#ccff00] group-hover:shadow-[0_0_20px_rgba(204,255,0,0.3)] transition-all duration-300">
                  Ø
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black tracking-tight text-xl sm:text-2xl text-white group-hover:text-zinc-200 transition-colors leading-none">
                    VITAL<span className="text-[#ccff00]">Ø</span>
                  </span>
                  <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 group-hover:text-zinc-400 font-tech transition-colors">
                    PRECISION LABS
                  </span>
                </div>
              </button>
            </div>

            {/* Center: Desktop Navigation with Expanding Animated Underlines */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleNavClick(link.id)}
                  className="relative group py-1 text-xs uppercase tracking-[0.14em] font-tech text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse"></span>
                  )}
                  {/* Expanding underline hover effect */}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#ccff00] transition-all duration-300 ease-out group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right: Search, Cart with Bump Animation, & WhatsApp CTA */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Trigger */}
              <button
                id="btn-search-trigger"
                onClick={openSearch}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-center gap-2 cursor-pointer group"
                aria-label="Search supplements"
                title="Search (Press Ctrl+K or ⌘K)"
              >
                <Search className="w-4 h-4 text-zinc-400 group-hover:text-[#ccff00] transition-colors" />
                <span className="hidden sm:inline text-xs font-tech text-zinc-400 group-hover:text-white transition-colors">
                  Search
                </span>
                <kbd className="hidden md:inline text-[10px] bg-zinc-950 text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-800 font-tech">
                  ⌘K
                </kbd>
              </button>

              {/* Cart Trigger with Reaction Animation */}
              <button
                id="btn-cart-trigger"
                onClick={() => openCart('cart')}
                className={`relative p-2 sm:px-3.5 sm:py-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-center gap-2 cursor-pointer ${
                  isCartBumping ? 'animate-cart-bump border-[#ccff00]' : ''
                }`}
                aria-label="View shopping cart"
              >
                <ShoppingBag className="w-4 h-4 text-[#ccff00]" />
                <span className="hidden sm:inline text-xs font-tech text-zinc-300">Bag</span>
                {cartCount > 0 && (
                  <span
                    id="cart-badge-count"
                    className={`min-w-5 h-5 px-1 rounded-full bg-[#ccff00] text-black text-[11px] font-tech font-extrabold flex items-center justify-center transition-transform duration-300 ${
                      isCartBumping ? 'scale-125' : 'scale-100'
                    }`}
                  >
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Direct WhatsApp Action Button with Micro-Animation */}
              <a
                id="btn-nav-whatsapp-direct"
                href={getWhatsAppGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-bold font-tech uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-[0_0_20px_rgba(204,255,0,0.2)] cursor-pointer group"
              >
                <span>WhatsApp Desk</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer Overlay with Staggered Entrance */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu-overlay"
          className="fixed inset-0 z-50 lg:hidden bg-black/85 backdrop-blur-xl animate-fade-in flex flex-col"
        >
          <div className="p-4 flex items-center justify-between border-b border-zinc-800 bg-[#0b0c0e]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-[#ccff00]/40 flex items-center justify-center font-display font-extrabold text-[#ccff00] text-lg">
                Ø
              </div>
              <span className="font-display font-bold text-xl text-white">VITALØ</span>
            </div>
            <button
              id="btn-close-mobile-menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-zinc-400 hover:text-white"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0b0c0e]">
            {/* Quick Search */}
            <button
              id="btn-mobile-search-trigger"
              onClick={() => {
                setIsMobileMenuOpen(false);
                openSearch();
              }}
              className="w-full py-3 px-4 rounded-xl bg-zinc-900 border border-zinc-800 text-left flex items-center justify-between text-zinc-400"
            >
              <div className="flex items-center gap-3">
                <Search className="w-4 h-4 text-[#ccff00]" />
                <span className="text-sm font-sans-clean">Search VITALØ formulas...</span>
              </div>
              <span className="text-xs font-tech text-zinc-500">⌘K</span>
            </button>

            {/* Quick Categories */}
            <div className="space-y-2">
              <span className="text-[11px] font-tech uppercase tracking-[0.2em] text-zinc-500">Categories</span>
              <div className="grid grid-cols-2 gap-2">
                {['Protein', 'Performance', 'Recovery', 'Hydration', 'Wellness'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className="p-3 text-left rounded-xl bg-zinc-900/60 hover:bg-zinc-800 border border-zinc-800/80 text-xs font-tech uppercase text-zinc-300 hover:text-[#ccff00] transition-colors"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Sections Navigation */}
            <div className="space-y-1 border-t border-zinc-800 pt-4">
              {navLinks.map((link, idx) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full text-left py-3 text-sm font-tech uppercase tracking-wider text-zinc-300 hover:text-[#ccff00] flex items-center justify-between transition-colors border-b border-zinc-900/60"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <span className="flex items-center gap-2">
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="text-[10px] bg-[#ccff00]/10 text-[#ccff00] px-2 py-0.5 rounded font-tech">
                        5 Steps
                      </span>
                    )}
                  </span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                </button>
              ))}
            </div>

            {/* Mobile Direct Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-zinc-800">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openCart('cart');
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-zinc-900 border border-zinc-700 text-white font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
              >
                <ShoppingBag className="w-5 h-5 text-[#ccff00]" />
                <span>Open Bag ({cartCount})</span>
              </button>

              <a
                href={getWhatsAppGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#ccff00] text-black font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.25)]"
              >
                <span>Order via WhatsApp (+20 155 538 0043)</span>
              </a>
            </div>

            {/* Studio Credit */}
            <div className="pt-6 text-center text-xs text-zinc-500 font-tech">
              SiteNova Web Design Studio • Showcase #3
            </div>
          </div>
        </div>
      )}
    </>
  );
};
