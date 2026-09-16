import React from 'react';
import { Camera } from 'lucide-react';
import { AnimatedReveal } from './AnimatedReveal';

export const EditorialGallery: React.FC = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      caption: 'Track Sprint Velocity',
      tag: 'TRAINING',
      span: 'col-span-1 md:col-span-2 row-span-2'
    },
    {
      url: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=800&q=80',
      caption: 'Native Whey Isolate Texture',
      tag: 'PURITY',
      span: 'col-span-1 row-span-1'
    },
    {
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
      caption: 'Heavy Deadlift Session',
      tag: 'POWER',
      span: 'col-span-1 row-span-1'
    },
    {
      url: 'https://images.unsplash.com/photo-1550572017-edd951b55104?auto=format&fit=crop&w=800&q=80',
      caption: 'Electrolyte Dissolution',
      tag: 'HYDRATION',
      span: 'col-span-1 md:col-span-2 row-span-1'
    },
    {
      url: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80',
      caption: 'Creapure® 200 Mesh Micronization',
      tag: 'SCIENCE',
      span: 'col-span-1 row-span-1'
    },
    {
      url: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      caption: 'Post-Workout Shaker Ritual',
      tag: 'RECOVERY',
      span: 'col-span-1 row-span-1'
    }
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0d0e11] relative border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
                <Camera className="w-3.5 h-3.5" />
                <span>THE VISUAL ARCHIVE</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
                PERFORMANCE IN MOTION.
              </h2>

              <p className="text-zinc-400 font-sans-clean text-sm sm:text-base leading-relaxed">
                An editorial look into our formulas, athlete rituals, and the everyday pursuit of next-level physical capability.
              </p>
            </div>

            <div className="text-xs font-tech text-zinc-400">
              <span>TAG @VITALO.LABS ON INSTAGRAM</span>
            </div>
          </div>
        </AnimatedReveal>

        {/* Editorial Masonry/Grid with Blur to Sharp entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[220px] sm:auto-rows-[240px]">
          {images.map((item, idx) => (
            <AnimatedReveal
              key={idx}
              animation="blur-sharp"
              delay={idx * 80}
              duration={700}
              className={item.span}
            >
              <div className="group relative rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 h-full w-full">
                <img
                  src={item.url}
                  alt={item.caption}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Tag & Caption */}
                <div className="absolute top-4 left-4">
                  <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-zinc-700 text-[10px] font-tech text-[#ccff00] font-bold uppercase">
                    {item.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="font-display font-bold text-sm sm:text-base text-white block">
                    {item.caption}
                  </span>
                  <span className="text-[10px] text-zinc-400 font-tech">VITALØ ATHLETIC DOCUMENTARY</span>
                </div>
              </div>
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
