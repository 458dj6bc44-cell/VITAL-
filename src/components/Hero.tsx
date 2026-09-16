import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { formatEGP } from '../utils/whatsapp';

interface HeroProps {
  onExploreCatalog?: () => void;
  onExploreShop?: () => void;
  onViewRoutine?: () => void;
  onExploreFormulas?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreCatalog,
  onExploreShop,
  onViewRoutine,
  onExploreFormulas
}) => {
  const { openProductModal, addItem } = useCart();
  const [activeHeroTab, setActiveHeroTab] = useState<'whey' | 'creatine' | 'pre'>('whey');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);

  const handleShop = onExploreCatalog || onExploreShop || (() => {});
  const handleRoutine = onViewRoutine || onExploreFormulas || (() => {});

  const wheyProduct = PRODUCTS.find((p) => p.id === 'vitalo-whey') || PRODUCTS[0];
  const creatineProduct = PRODUCTS.find((p) => p.id === 'vitalo-creatine') || PRODUCTS[1];
  const preProduct = PRODUCTS.find((p) => p.id === 'vitalo-pre') || PRODUCTS[2];

  const currentFeatured =
    activeHeroTab === 'whey' ? wheyProduct : activeHeroTab === 'creatine' ? creatineProduct : preProduct;

  // Mount animation trigger
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Desktop mouse movement 3D tilt interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    // Normalized offset between -1 and 1
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] lg:min-h-[96vh] flex flex-col justify-center overflow-hidden bg-[#0b0c0e] bg-grid-pattern pt-8 pb-16 lg:pt-12 lg:pb-20"
    >
      {/* Drifting Ambient Background Glow Orbs */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[650px] h-[350px] sm:h-[650px] bg-[#ccff00]/10 rounded-full blur-[150px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`
        }}
      />
      <div
        className="absolute -top-32 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`
        }}
      />

      {/* Decorative Drifting Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
        <div className="absolute top-1/3 right-16 w-3 h-3 rounded-full bg-emerald-400 blur-[1px] animate-float-slow" />
        <div className="absolute bottom-24 left-1/4 w-2 h-2 rounded-full bg-white animate-float-slight" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Staggered Editorial Typography & Actions */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6 sm:space-y-8">
            
            {/* Top Pill Tag Entrance */}
            <div
              className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-inner transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00] animate-ping" />
              <span className="text-[10px] sm:text-xs font-tech tracking-[0.2em] uppercase text-zinc-300">
                PRECISION NUTRITION // DIRECT WHATSAPP DISPATCH
              </span>
            </div>

            {/* Giant Architectural Headline with Reveal */}
            <div className="space-y-3">
              <h1
                className={`font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-white uppercase leading-[0.93] transition-all duration-1000 delay-100 ${
                  isLoaded ? 'opacity-100 translate-y-0 tracking-tight' : 'opacity-0 translate-y-6 tracking-wide'
                }`}
              >
                FUEL YOUR <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-[#ccff00] drop-shadow-[0_0_35px_rgba(204,255,0,0.15)]">
                  EVERYDAY.
                </span>
              </h1>

              {/* Staggered Subtitle */}
              <p
                className={`text-zinc-400 text-base sm:text-lg md:text-xl font-sans-clean max-w-xl font-normal leading-relaxed pt-2 transition-all duration-1000 delay-200 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}
              >
                Precision nutrition engineered for training, recovery, and daily physical capacity. Clean, tested, uncompromised formulas delivered across Egypt via frictionless WhatsApp checkout.
              </p>
            </div>

            {/* Conversion CTA Group with Staggered Delays */}
            <div
              className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto transition-all duration-1000 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                id="btn-hero-primary-shop"
                onClick={handleShop}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(204,255,0,0.3)] cursor-pointer"
              >
                <span>SHOP SUPPLEMENTS</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="btn-hero-secondary-formulas"
                onClick={handleRoutine}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-700/80 font-tech font-semibold text-sm uppercase tracking-wider transition-all cursor-pointer backdrop-blur-sm transform hover:-translate-y-0.5"
              >
                <span>THE 24H ROUTINE</span>
              </button>
            </div>

            {/* Trust and Clinical Highlights Bar */}
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 sm:pt-6 border-t border-zinc-800/80 w-full transition-all duration-1000 delay-500 ${
                isLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#ccff00] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200 uppercase font-tech">100% Tested</span>
                  <span className="text-[11px] text-zinc-400 font-sans-clean">Third-Party Lab Assayed</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Zap className="w-5 h-5 text-[#ccff00] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200 uppercase font-tech">Zero Hidden Blends</span>
                  <span className="text-[11px] text-zinc-400 font-sans-clean">Clinical Transparency</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-zinc-200 uppercase font-tech">WhatsApp Dispatch</span>
                  <span className="text-[11px] text-zinc-400 font-sans-clean">COD & Fast Local Delivery</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive 3D Card with Floating Movement */}
          <div
            className={`lg:col-span-5 relative flex flex-col items-center transition-all duration-1000 delay-300 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 mb-4 rounded-xl bg-zinc-900/90 border border-zinc-800 backdrop-blur-md z-20 shadow-lg">
              <button
                id="hero-tab-whey"
                onClick={() => setActiveHeroTab('whey')}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all cursor-pointer ${
                  activeHeroTab === 'whey'
                    ? 'bg-[#ccff00] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                VITALØ WHEY
              </button>
              <button
                id="hero-tab-creatine"
                onClick={() => setActiveHeroTab('creatine')}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all cursor-pointer ${
                  activeHeroTab === 'creatine'
                    ? 'bg-[#ccff00] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                CREATINE
              </button>
              <button
                id="hero-tab-pre"
                onClick={() => setActiveHeroTab('pre')}
                className={`px-3 py-1.5 rounded-lg text-xs font-tech font-bold uppercase transition-all cursor-pointer ${
                  activeHeroTab === 'pre'
                    ? 'bg-[#ccff00] text-black shadow-md'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                PRE-WORKOUT
              </button>
            </div>

            {/* Central Showcase Card with Interactive Perspective Tilt */}
            <div
              ref={heroCardRef}
              className="relative w-full max-w-md group transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -5}deg) rotateY(${mousePos.x * 5}deg)`
              }}
            >
              {/* Pulsing Outer Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-[#ccff00]/25 via-emerald-500/10 to-[#ccff00]/25 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-700 animate-pulse-glow" />

              {/* Main Visual Container */}
              <div className="relative rounded-2xl bg-zinc-900/95 border border-zinc-800 overflow-hidden shadow-2xl backdrop-blur-xl">
                
                {/* Header within card */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-zinc-800/80 bg-zinc-950/50">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-ping" />
                    <span className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-300">
                      {currentFeatured.category} EDITION
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 text-[10px] font-tech font-bold uppercase bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30 rounded-md">
                    {currentFeatured.badge || 'SIGNATURE'}
                  </span>
                </div>

                {/* Hero Product Image with Gentle Floating Movement */}
                <div
                  onClick={() => openProductModal(currentFeatured)}
                  className="relative h-72 sm:h-84 overflow-hidden cursor-pointer group/img bg-gradient-to-b from-zinc-900 via-zinc-950 to-black"
                >
                  <img
                    src={currentFeatured.image}
                    alt={currentFeatured.name}
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700 ease-out animate-float-slow"
                    loading="eager"
                  />
                  
                  {/* Subtle Dark Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                  {/* Dynamic Metric Badge */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <div className="px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border border-zinc-700/80 text-white text-xs font-tech font-bold shadow-lg">
                      {activeHeroTab === 'whey' && '27G NATIVE ISOLATE'}
                      {activeHeroTab === 'creatine' && '100% CREAPURE® GERMAN'}
                      {activeHeroTab === 'pre' && '6G L-CITRULLINE PUMP'}
                    </div>
                  </div>

                  {/* Price Tag with Glow */}
                  <div className="absolute bottom-4 right-4">
                    <div className="px-3.5 py-1.5 rounded-lg bg-[#ccff00] text-black text-xs font-tech font-extrabold shadow-[0_0_20px_rgba(204,255,0,0.35)]">
                      {formatEGP(currentFeatured.price)}
                    </div>
                  </div>
                </div>

                {/* Interactive Action Bar */}
                <div className="p-5 bg-zinc-950/90 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-display font-bold text-lg text-white group-hover:text-[#ccff00] transition-colors">
                        {currentFeatured.name}
                      </h2>
                      <p className="text-xs text-zinc-400 font-sans-clean line-clamp-1">
                        {currentFeatured.tagline}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-amber-400 font-bold flex items-center gap-1 justify-end">
                        ★ {currentFeatured.rating}
                      </span>
                      <span className="text-[10px] text-zinc-400 font-tech">
                        {currentFeatured.reviewCount} reviews
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      id={`btn-hero-quick-add-${currentFeatured.id}`}
                      onClick={() => addItem(currentFeatured)}
                      className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-tech font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 border border-white/10 cursor-pointer active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#ccff00]" />
                      <span>Quick Add</span>
                    </button>

                    <button
                      id={`btn-hero-view-details-${currentFeatured.id}`}
                      onClick={() => openProductModal(currentFeatured)}
                      className="w-full py-2.5 px-3 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-tech font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                    >
                      <span>View Formula</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Micro-Proof beneath card */}
            <div className="mt-4 flex items-center gap-4 text-zinc-400 text-xs font-tech">
              <span>• Zero Fillers</span>
              <span>• WhatsApp 1-Tap Order</span>
              <span>• Next-Day Dispatch</span>
            </div>

          </div>

        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="hidden md:flex flex-col items-center justify-center mt-6 text-zinc-500 text-[10px] font-tech tracking-widest uppercase gap-1 cursor-pointer opacity-70 hover:opacity-100 transition-opacity" onClick={handleShop}>
        <span>SCROLL TO EXPLORE</span>
        <ChevronDown className="w-4 h-4 text-[#ccff00] animate-bounce" />
      </div>
    </section>
  );
};
