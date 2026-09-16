import React, { useState } from 'react';
import { MessageCircle, X, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { getWhatsAppGeneralContactUrl, WHATSAPP_PHONE_NUMBER } from '../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div id="floating-whatsapp-container" className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end">
      {/* Expanded Quick Card Tooltip */}
      {showTooltip && (
        <div className="mb-3 w-72 sm:w-80 p-4 rounded-2xl bg-[#0f1013] border border-zinc-700 shadow-2xl backdrop-blur-xl animate-fade-in text-left">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="text-xs font-tech font-bold uppercase text-white tracking-wider">
                VITALØ Dispatch Desk
              </span>
            </div>
            <button
              onClick={() => setShowTooltip(false)}
              className="text-zinc-500 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 space-y-1.5 text-xs">
            <p className="text-zinc-300 font-sans-clean leading-relaxed">
              Order directly via WhatsApp or consult with our supplement specialists.
            </p>
            <div className="flex items-center gap-1.5 text-[#ccff00] font-tech text-[11px]">
              <Zap className="w-3.5 h-3.5" />
              <span>Typical reply time: Under 3 minutes</span>
            </div>
          </div>

          <a
            href={getWhatsAppGeneralContactUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>Start WhatsApp Chat</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="flex items-center gap-2">
        <button
          id="btn-floating-whatsapp-pill"
          onClick={() => setShowTooltip(!showTooltip)}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-tech font-semibold shadow-xl backdrop-blur-md transition-all cursor-pointer"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>Order on WhatsApp</span>
        </button>

        <a
          id="btn-floating-whatsapp-circle"
          href={getWhatsAppGeneralContactUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="relative w-14 h-14 sm:w-14 sm:h-14 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black flex items-center justify-center shadow-[0_0_25px_rgba(204,255,0,0.35)] transition-transform transform hover:scale-105 active:scale-95 group"
          aria-label="Order on WhatsApp"
        >
          <MessageCircle className="w-7 h-7 stroke-[2.2]" />
          <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#0b0c0e]"></span>
        </a>
      </div>
    </div>
  );
};
