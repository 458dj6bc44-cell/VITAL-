import React, { useState } from 'react';
import { ArrowRight, Check, MessageCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { getWhatsAppGeneralContactUrl, WHATSAPP_PHONE_NUMBER } from '../utils/whatsapp';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#07080a] text-zinc-400 border-t border-zinc-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Pre-Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-zinc-800">
          
          {/* Brand Identity & Mission */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-[#ccff00]/40 flex items-center justify-center font-display font-extrabold text-[#ccff00] text-xl shadow-[0_0_15px_rgba(204,255,0,0.15)]">
                Ø
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                VITAL<span className="text-[#ccff00]">Ø</span>
              </span>
            </div>

            <p className="font-display font-bold text-lg text-white">
              "Fuel your everyday."
            </p>

            <p className="text-xs sm:text-sm text-zinc-400 font-sans-clean leading-relaxed max-w-md">
              Precision nutrition for modern human performance. Engineered with cold-filtered native isolates, 100% German Creapure®, and bioavailable chelated minerals. Zero proprietary blends, zero compromises.
            </p>

            {/* Direct WhatsApp Badge */}
            <div className="pt-2">
              <a
                href={getWhatsAppGeneralContactUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-tech text-zinc-200 transition-all group"
              >
                <MessageCircle className="w-4 h-4 text-[#ccff00]" />
                <span>WhatsApp Dispatch: +{WHATSAPP_PHONE_NUMBER}</span>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Navigation Links Columns */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 text-xs font-tech">
            <div className="space-y-3">
              <span className="text-white font-bold uppercase tracking-wider block">Formulas</span>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button onClick={() => onNavigateSection('catalog')} className="hover:text-[#ccff00] transition-colors">
                    Native Whey Isolate
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('catalog')} className="hover:text-[#ccff00] transition-colors">
                    Creapure® Creatine
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('catalog')} className="hover:text-[#ccff00] transition-colors">
                    Pre-Workout Catalyst
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('catalog')} className="hover:text-[#ccff00] transition-colors">
                    Cellular Electrolytes
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('catalog')} className="hover:text-[#ccff00] transition-colors">
                    Daily Micronutrient
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-white font-bold uppercase tracking-wider block">Company</span>
              <ul className="space-y-2 text-zinc-400">
                <li>
                  <button onClick={() => onNavigateSection('routine')} className="hover:text-[#ccff00] transition-colors">
                    The 24h Routine
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('formulas')} className="hover:text-[#ccff00] transition-colors">
                    Inside The Formula
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('whatsapp-guide')} className="hover:text-[#ccff00] transition-colors">
                    WhatsApp Social Order
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('reviews')} className="hover:text-[#ccff00] transition-colors">
                    Athlete Community
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('faq')} className="hover:text-[#ccff00] transition-colors">
                    FAQ & Dispatch
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Signup & Studio Showcase Card */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-tech font-bold uppercase tracking-wider text-white block">
              The Performance Dispatch
            </span>
            <p className="text-xs text-zinc-400 font-sans-clean leading-relaxed">
              Receive early batch releases, sports science breakdowns, and exclusive WhatsApp subscriber drops.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs uppercase tracking-wider transition-colors shrink-0 flex items-center gap-1"
                >
                  {subscribed ? <Check className="w-4 h-4 stroke-[3]" /> : <span>Join</span>}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-[#ccff00] font-tech">✓ Welcome to VITALØ Performance Circle.</p>
              )}
            </form>

            {/* SiteNova Web Studio Showcase Credit Badge */}
            <div className="mt-4 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-[11px] font-tech text-zinc-400 flex items-center justify-between">
              <div>
                <span className="text-zinc-200 font-bold block">SiteNova Web Design Studio</span>
                <span className="text-zinc-500 text-[10px]">Showcase Project #3 • DTC E-Commerce</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#ccff00]/10 text-[#ccff00] text-[10px] uppercase font-bold">
                Portfolio
              </span>
            </div>
          </div>

        </div>

        {/* Disclaimer on Health & Non-Medical Claims */}
        <div className="py-6 border-b border-zinc-800/80 text-[10px] text-zinc-400 font-sans-clean leading-relaxed flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
          <p>
            *Disclaimer: The statements on this website have not been evaluated by the National Food Safety Authority (NFSA) or the FDA. These products are dietary nutritional supplements engineered for healthy adults, athletes, and fitness enthusiasts. They are not intended to diagnose, treat, cure, or prevent any medical disease or pathological condition. Consult your licensed healthcare provider prior to starting any vigorous exercise regimen or dietary supplement protocol.
          </p>
        </div>

        {/* Copyright & Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-zinc-400">
          <div>
            © {new Date().getFullYear()} VITALØ Performance Labs. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Cairo, Egypt</span>
            <span>•</span>
            <span>Direct WhatsApp Social-Commerce</span>
            <span>•</span>
            <span>Crafted for SiteNova Portfolio</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
