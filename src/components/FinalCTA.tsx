import React from 'react';
import { ArrowRight, MessageCircle, ShieldCheck, Zap } from 'lucide-react';
import { getWhatsAppGeneralContactUrl } from '../utils/whatsapp';
import { AnimatedReveal } from './AnimatedReveal';

interface FinalCTAProps {
  onExploreShop: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onExploreShop }) => {
  return (
    <section id="final-cta" className="relative py-24 sm:py-32 bg-[#08090b] overflow-hidden border-t border-zinc-800">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#ccff00]/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5" />
              <span>BUILT FOR YOUR NEXT LEVEL</span>
            </div>

            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white uppercase tracking-tight leading-[0.95]">
              READY TO ELEVATE <br />
              <span className="text-[#ccff00]">YOUR TRAINING PROTOCOL?</span>
            </h2>

            <p className="text-zinc-400 font-sans-clean text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Join thousands of athletes who trust VITALØ for transparent, uncompromised performance nutrition. Order directly via WhatsApp with zero friction.
            </p>
          </div>
        </AnimatedReveal>

        {/* Action Buttons with Scale Reveal */}
        <AnimatedReveal animation="scale-up" delay={150} duration={600}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="btn-final-cta-shop"
              onClick={onExploreShop}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-1 shadow-[0_10px_30px_rgba(204,255,0,0.25)] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>SHOP ALL SUPPLEMENTS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              id="btn-final-cta-whatsapp"
              href={getWhatsAppGeneralContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-white border border-zinc-700 font-tech font-bold text-sm uppercase tracking-wider transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer backdrop-blur-sm active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-[#ccff00]" />
              <span>ORDER VIA WHATSAPP (+20 155 538 0043)</span>
            </a>
          </div>
        </AnimatedReveal>

        {/* Small Trust Guarantees */}
        <AnimatedReveal animation="fade-in" delay={250} duration={600}>
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-tech text-zinc-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
              Cash on Delivery / InstaPay
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
              Next-Day Dispatch Across Egypt
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#ccff00]" />
              100% Tested Clean Ingredients
            </span>
          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
};
