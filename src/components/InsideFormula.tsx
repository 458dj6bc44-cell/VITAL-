import React, { useState } from 'react';
import { Beaker, Globe2, CheckCircle2 } from 'lucide-react';
import { INGREDIENT_SPOTLIGHTS } from '../data/products';
import { AnimatedReveal } from './AnimatedReveal';

export const InsideFormula: React.FC = () => {
  const [selectedIngredient, setSelectedIngredient] = useState(INGREDIENT_SPOTLIGHTS[0]);

  return (
    <section id="formulas" className="py-20 sm:py-28 bg-[#0b0c0e] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Animated Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
                <Beaker className="w-3.5 h-3.5" />
                <span>RADICAL TRANSPARENCY & CLINICAL DOSING</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                INSIDE THE FORMULA.
              </h2>

              <p className="text-zinc-400 font-sans-clean text-sm sm:text-base leading-relaxed">
                We source raw ingredients from globally verified pharmaceutical origins. No hidden blends, no sub-clinical fairy dusting, and no artificial dyes. Every milligram is declared on the bottle.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs font-tech text-zinc-400 border-l lg:border-l-2 border-zinc-800 pl-4">
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white">0%</span>
                <span className="text-[11px] uppercase">Proprietary Blends</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-[#ccff00]">100%</span>
                <span className="text-[11px] uppercase">Label Disclosure</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white">GMP</span>
                <span className="text-[11px] uppercase">Certified Clean</span>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        {/* Interactive Ingredient Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Ingredient Selector Cards (Slide from Left) */}
          <div className="lg:col-span-6 space-y-3">
            {INGREDIENT_SPOTLIGHTS.map((item, idx) => {
              const isSelected = selectedIngredient.id === item.id;

              return (
                <AnimatedReveal
                  key={item.id}
                  animation="slide-left"
                  delay={idx * 80}
                  duration={600}
                >
                  <div
                    onClick={() => setSelectedIngredient(item)}
                    className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 transform ${
                      isSelected
                        ? 'bg-zinc-900/90 border-[#ccff00] shadow-[0_0_25px_rgba(204,255,0,0.18)] translate-x-1.5'
                        : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/40 hover:translate-x-1'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-display font-bold text-base sm:text-lg text-white">
                          {item.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-[#ccff00] animate-pulse" />
                        )}
                      </div>
                      <div className="text-xs font-tech text-[#ccff00]">{item.subtitle}</div>
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 font-tech">
                        <Globe2 className="w-3 h-3 text-zinc-400" />
                        <span>Origin: {item.origin}</span>
                      </div>
                    </div>

                    <span className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-tech font-bold text-zinc-300 shrink-0">
                      {item.stats}
                    </span>
                  </div>
                </AnimatedReveal>
              );
            })}
          </div>

          {/* Right: Rich Visual Spotlight Container (Slide from Right) */}
          <div className="lg:col-span-6 relative">
            <AnimatedReveal animation="slide-right" delay={150} duration={700}>
              <div className="relative rounded-3xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
                <div className="relative h-64 sm:h-80 overflow-hidden">
                  <img
                    src={selectedIngredient.image}
                    alt={selectedIngredient.name}
                    className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-md bg-black/80 backdrop-blur-md border border-zinc-700 text-xs font-tech text-[#ccff00] uppercase font-bold">
                      Origin: {selectedIngredient.origin}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-tech uppercase text-[#ccff00] font-bold">
                      {selectedIngredient.subtitle}
                    </span>
                    <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                      {selectedIngredient.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4 bg-zinc-950">
                  <p className="text-zinc-300 font-sans-clean text-sm leading-relaxed">
                    {selectedIngredient.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-800/80">
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                      <span className="font-tech text-zinc-400 block uppercase text-[10px]">Purity Standard</span>
                      <span className="font-display font-bold text-white text-sm">Ultra-Pure Assay</span>
                    </div>
                    <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 text-xs">
                      <span className="font-tech text-zinc-400 block uppercase text-[10px]">Intended Action</span>
                      <span className="font-display font-bold text-[#ccff00] text-sm">High Cellular Uptake</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-tech">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#ccff00]" />
                    <span>Free of banned substances, micro-plastics, and animal byproducts</span>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          </div>

        </div>

      </div>
    </section>
  );
};
