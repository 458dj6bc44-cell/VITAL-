import React from 'react';
import { Star, CheckCircle, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/products';
import { AnimatedReveal } from './AnimatedReveal';

export const SocialProof: React.FC = () => {
  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#0b0c0e] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>THE ATHLETE COMMUNITY</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                PROVEN IN TRAINING. <br />
                <span className="text-[#ccff00]">VERIFIED BY COMMUNITY.</span>
              </h2>

              <p className="text-zinc-400 font-sans-clean text-sm sm:text-base leading-relaxed">
                From elite hybrid athletes and CrossFitters to early-morning runners and dedicated professionals—read what active performers say about VITALØ.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl backdrop-blur-sm shadow-lg">
              <div className="text-right">
                <div className="font-display font-black text-2xl text-white">4.9 / 5.0</div>
                <div className="text-[11px] font-tech text-zinc-400">Based on 1,400+ Orders</div>
              </div>
              <div className="flex flex-col gap-1 text-amber-400">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] text-zinc-400 font-tech">98% WhatsApp Reorder Rate</span>
              </div>
            </div>
          </div>
        </AnimatedReveal>

        {/* Testimonials Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <AnimatedReveal
              key={t.id}
              animation="fade-up"
              delay={idx * 100}
              duration={600}
            >
              <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-zinc-700 hover:-translate-y-1 flex flex-col justify-between space-y-6 transition-all duration-300 backdrop-blur-sm group h-full">
                <div className="space-y-4">
                  {/* Rating & Product Tag */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[10px] font-tech text-[#ccff00] font-bold uppercase bg-[#ccff00]/10 px-2 py-0.5 rounded">
                      Verified Order
                    </span>
                  </div>

                  {/* Headline & Quote */}
                  <div className="space-y-2">
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#ccff00] transition-colors leading-snug">
                      "{t.headline}"
                    </h4>
                    <p className="text-xs text-zinc-300 font-sans-clean leading-relaxed">
                      {t.quote}
                    </p>
                  </div>
                </div>

                {/* Author & Product */}
                <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-700"
                  />
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-bold text-xs text-white truncate">
                        {t.name}
                      </span>
                      <CheckCircle className="w-3 h-3 text-[#ccff00] shrink-0" />
                    </div>
                    <span className="text-[11px] text-zinc-400 font-sans-clean truncate">
                      {t.role}
                    </span>
                    <span className="text-[9px] text-zinc-400 font-tech mt-0.5">
                      {t.productUsed}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
