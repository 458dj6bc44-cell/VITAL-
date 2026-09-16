import React from 'react';
import { Check, X, ShieldAlert, Award } from 'lucide-react';
import { AnimatedReveal } from './AnimatedReveal';

export const ComparisonSection: React.FC = () => {
  const criteria = [
    {
      feature: 'Label Transparency',
      vitalo: '100% full ingredient amounts disclosed',
      others: 'Hidden proprietary blends & secret matrices'
    },
    {
      feature: 'Creatine Monohydrate Source',
      vitalo: '100% Creapure® German synthesized (99.95%)',
      others: 'Generic unverified industrial imports'
    },
    {
      feature: 'Sweeteners & Dyes',
      vitalo: 'Stevia & real fruit extracts; zero FD&C Red/Blue',
      others: 'Artificial Red 40, Sucralose, Acesulfame-K'
    },
    {
      feature: 'Digestive Comfort',
      vitalo: 'Cold-filtered native isolates + DigeZyme® enzymes',
      others: 'Concentrates heavy in residual lactose & bloat'
    },
    {
      feature: 'Ordering & Delivery UX',
      vitalo: 'Direct WhatsApp checkout • Next-day local dispatch',
      others: 'Clunky card forms, customs delays, payment declines'
    },
    {
      feature: 'Third-Party Batch Testing',
      vitalo: 'Independently tested for heavy metals & banned drugs',
      others: 'Rarely tested or self-certified only'
    }
  ];

  return (
    <section id="comparison" className="py-20 sm:py-28 bg-[#0d0e11] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Animated Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
              <Award className="w-3.5 h-3.5" />
              <span>THE INDUSTRY BENCHMARK</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              THE VITALØ STANDARD <br />
              <span className="text-[#ccff00]">VS GENERIC SUPPLEMENTS</span>
            </h2>

            <p className="text-zinc-400 font-sans-clean text-sm sm:text-base leading-relaxed">
              The sports nutrition aisle is flooded with flashy labels masking cheap commodity fillers. Here is why discerning athletes make the switch.
            </p>
          </div>
        </AnimatedReveal>

        {/* Comparison Matrix Table with Scale Reveal */}
        <AnimatedReveal animation="scale-up" delay={150} duration={700}>
          <div className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950/70 shadow-2xl backdrop-blur-md">
            {/* Table Header */}
            <div className="grid grid-cols-12 p-4 sm:p-6 bg-zinc-900/80 border-b border-zinc-800 items-center text-xs font-tech uppercase font-bold tracking-wider">
              <div className="col-span-5 sm:col-span-4 text-zinc-400">Standard Metric</div>
              <div className="col-span-4 sm:col-span-4 text-[#ccff00] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                <span>VITALØ Formulations</span>
              </div>
              <div className="col-span-3 sm:col-span-4 text-zinc-500 hidden sm:block">
                Conventional Brands
              </div>
            </div>

            {/* Table Rows with Staggered Visual Rhythm */}
            <div className="divide-y divide-zinc-800/80">
              {criteria.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 p-4 sm:p-6 items-center hover:bg-zinc-900/40 transition-colors text-xs sm:text-sm"
                >
                  {/* Feature Name */}
                  <div className="col-span-5 sm:col-span-4 font-display font-bold text-white pr-2">
                    {item.feature}
                  </div>

                  {/* VITALØ Solution */}
                  <div className="col-span-7 sm:col-span-4 flex items-start gap-2 text-zinc-200 font-sans-clean pr-2">
                    <div className="w-5 h-5 rounded-full bg-[#ccff00]/20 text-[#ccff00] flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="font-medium text-xs sm:text-sm text-zinc-200">
                      {item.vitalo}
                    </span>
                  </div>

                  {/* Conventional Brand Solution */}
                  <div className="col-span-12 sm:col-span-4 hidden sm:flex items-start gap-2 text-zinc-500 font-sans-clean mt-2 sm:mt-0">
                    <div className="w-5 h-5 rounded-full bg-zinc-900 text-zinc-500 flex items-center justify-center shrink-0 mt-0.5">
                      <X className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm">{item.others}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Table Footer Banner */}
            <div className="p-4 sm:p-6 bg-zinc-900/40 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-zinc-400">
              <span className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[#ccff00]" />
                No medical claims made or implied. Engineered exclusively for athletic performance and recovery.
              </span>
              <span className="text-white font-bold uppercase tracking-wider">
                Zero compromises guaranteed.
              </span>
            </div>
          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
};
