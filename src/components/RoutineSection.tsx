import React, { useState } from 'react';
import { Sun, BatteryCharging, Flame, Dumbbell, Moon, Plus, Check } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import { formatEGP } from '../utils/whatsapp';
import { AnimatedReveal } from './AnimatedReveal';

export const RoutineSection: React.FC = () => {
  const { addItem, openProductModal } = useCart();
  const [activePhaseIndex, setActivePhaseIndex] = useState(2); // default to Pre-Workout (Peak Training)
  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  const phases = [
    {
      time: '07:00 AM',
      name: 'MORNING FOUNDATION',
      sub: 'Cellular Ion Hydration & Micronutrients',
      icon: Sun,
      quote: 'Start the day primed with active methylated cofactors and fluid equilibrium before coffee or emails.',
      productIds: ['vitalo-electrolytes', 'vitalo-daily']
    },
    {
      time: '01:00 PM',
      name: 'MIDDAY RESILIENCE',
      sub: 'Cognitive Drive & Healthy Fats',
      icon: BatteryCharging,
      quote: 'Maintain cellular membrane fluidity and sustained mental clarity without mid-afternoon energy slumps.',
      productIds: ['vitalo-omega']
    },
    {
      time: '05:30 PM',
      name: 'PRE-TRAINING CATALYST',
      sub: 'High Nitric Oxide & Phosphocreatine Saturation',
      icon: Flame,
      quote: 'Tunnel-vision focus, vascular blood flow, and clean cellular ATP priming 25 minutes before heavy loads.',
      productIds: ['vitalo-pre', 'vitalo-creatine']
    },
    {
      time: '07:00 PM',
      name: 'POST-WORKOUT SYNTHESIS',
      sub: 'Rapid Isolate Leucine Delivery',
      icon: Dumbbell,
      quote: 'Cold-filtered whey isolate provides immediate amino acids directly to recovering myofibrils.',
      productIds: ['vitalo-whey', 'vitalo-bcaa']
    },
    {
      time: '10:30 PM',
      name: 'DEEP NOCTURNAL REST',
      sub: 'Neuromuscular Easing & REM Support',
      icon: Moon,
      quote: 'Bisglycinate chelate and L-Threonate ease muscular tension and encourage restorative slow-wave sleep.',
      productIds: ['vitalo-mag']
    }
  ];

  const currentPhase = phases[activePhaseIndex];
  const phaseProducts = currentPhase.productIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as typeof PRODUCTS;

  const handleQuickAdd = (p: (typeof PRODUCTS)[0]) => {
    addItem(p);
    setAddedIds((prev) => ({ ...prev, [p.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [p.id]: false }));
    }, 1400);
  };

  return (
    <section id="routine" className="py-20 sm:py-28 bg-[#0b0c0e] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Narrative Intro with Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
              <span>THE 24-HOUR PERFORMANCE PROTOCOL</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              NUTRITION SHOULDN’T <br />
              COMPLICATE YOUR ROUTINE.
            </h2>

            <p className="text-zinc-400 font-sans-clean text-sm sm:text-base leading-relaxed">
              Athletic performance isn't built in a single workout—it is sustained across a calibrated 24-hour cycle. We engineered VITALØ formulas to lock together seamlessly from the moment you wake to deep nocturnal REM recovery.
            </p>
          </div>
        </AnimatedReveal>

        {/* Phase Timeline Buttons */}
        <AnimatedReveal animation="fade-up" delay={150} duration={600}>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
            {phases.map((phase, idx) => {
              const Icon = phase.icon;
              const isSelected = activePhaseIndex === idx;

              return (
                <button
                  key={phase.time}
                  onClick={() => setActivePhaseIndex(idx)}
                  className={`p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer transform ${
                    isSelected
                      ? 'bg-zinc-900 border-[#ccff00] shadow-[0_0_25px_rgba(204,255,0,0.2)] -translate-y-1'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 text-zinc-400 hover:text-white hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-tech font-bold text-[#ccff00]">{phase.time}</span>
                    <Icon className={`w-4 h-4 transition-colors ${isSelected ? 'text-[#ccff00]' : 'text-zinc-500'}`} />
                  </div>
                  <div className="space-y-0.5">
                    <div className={`font-display font-bold text-xs uppercase transition-colors ${isSelected ? 'text-white' : 'text-zinc-300'}`}>
                      {phase.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </AnimatedReveal>

        {/* Active Phase Display Card with Smooth Scale Reveal */}
        <AnimatedReveal animation="scale-up" delay={200} duration={700}>
          <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Phase Information */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-lg bg-[#ccff00] text-black text-xs font-tech font-extrabold uppercase">
                    {currentPhase.time}
                  </span>
                  <span className="text-xs font-tech uppercase text-zinc-400">Target Phase</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white uppercase">
                  {currentPhase.name}
                </h3>

                <p className="text-sm font-tech text-[#ccff00] font-semibold">
                  {currentPhase.sub}
                </p>

                <blockquote className="text-zinc-300 text-sm font-sans-clean italic border-l-2 border-[#ccff00] pl-4 py-1 leading-relaxed">
                  "{currentPhase.quote}"
                </blockquote>

                <div className="pt-2 flex items-center gap-2 text-xs font-tech text-zinc-400">
                  <span>Recommended Stack:</span>
                  <span className="text-white font-bold">{phaseProducts.map((p) => p.name).join(' + ')}</span>
                </div>
              </div>

              {/* Products in this Phase */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {phaseProducts.map((product) => {
                  const isJustAdded = addedIds[product.id];

                  return (
                    <div
                      key={product.id}
                      className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between space-y-4 group"
                    >
                      <div className="flex gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-zinc-900 shrink-0 cursor-pointer group-hover:scale-105 transition-transform"
                          onClick={() => openProductModal(product)}
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-tech uppercase text-[#ccff00] font-bold">
                            {product.category}
                          </span>
                          <h4
                            onClick={() => openProductModal(product)}
                            className="font-display font-bold text-sm sm:text-base text-white hover:text-[#ccff00] transition-colors truncate cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-zinc-400 font-sans-clean line-clamp-2 mt-0.5">
                            {product.shortDesc}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                        <span className="font-display font-black text-sm sm:text-base text-white">
                          {formatEGP(product.price)}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openProductModal(product)}
                            className="px-2.5 py-1.5 rounded-lg text-xs font-tech text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer transition-colors"
                          >
                            Specs
                          </button>
                          <button
                            onClick={() => handleQuickAdd(product)}
                            disabled={isJustAdded}
                            className={`px-3 py-1.5 rounded-xl text-xs font-tech font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                              isJustAdded
                                ? 'bg-emerald-500 text-black'
                                : 'bg-[#ccff00] hover:bg-[#b8e600] text-black shadow-sm active:scale-95'
                            }`}
                          >
                            {isJustAdded ? (
                              <>
                                <Check className="w-3.5 h-3.5 stroke-[3]" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
};
