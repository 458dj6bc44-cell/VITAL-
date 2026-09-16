import React from 'react';

export const BrandTicker: React.FC = () => {
  const row1 = [
    'PRECISION NUTRITION',
    'COLD-FILTERED NATIVE WHEY',
    'ZERO PROPRIETARY BLENDS',
    '100% CREAPURE® MONOHYDRATE',
    'THIRD-PARTY LAB TESTED',
    'CLEAN PERFORMANCE PROTOCOL',
    'DIRECT WHATSAPP DISPATCH'
  ];

  const row2 = [
    'FUEL YOUR EVERYDAY',
    'NO CHEMICAL DYES',
    'INSTANT CAIRO & GIZA DELIVERY',
    'CASH ON DELIVERY & INSTAPAY',
    'BATCH CERTIFIED PURITY',
    'ELEVATED ATHLETIC CAPACITY',
    'VITALØ PRECISION LABS'
  ];

  return (
    <div id="brand-ticker" className="relative w-full overflow-hidden bg-black border-y border-zinc-800/80 py-2.5 select-none space-y-1.5">
      {/* Upper marquee */}
      <div className="flex animate-marquee whitespace-nowrap">
        {[...row1, ...row1].map((text, idx) => (
          <div key={`r1-${idx}`} className="flex items-center gap-6 mx-4">
            <span className="font-display font-black text-xs sm:text-sm tracking-[0.2em] uppercase text-zinc-300 hover:text-white transition-colors">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] shadow-[0_0_8px_#ccff00]" />
          </div>
        ))}
      </div>

      {/* Subtle reversed lower marquee */}
      <div className="flex animate-marquee-reverse whitespace-nowrap opacity-60 hover:opacity-100 transition-opacity">
        {[...row2, ...row2].map((text, idx) => (
          <div key={`r2-${idx}`} className="flex items-center gap-6 mx-4">
            <span className="font-tech text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#ccff00]/90">
              {text}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/60" />
          </div>
        ))}
      </div>
    </div>
  );
};
