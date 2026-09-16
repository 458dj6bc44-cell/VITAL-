import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
import { FAQS } from '../data/products';
import { getWhatsAppGeneralContactUrl } from '../utils/whatsapp';
import { AnimatedReveal } from './AnimatedReveal';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#0b0c0e] relative border-t border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="text-center space-y-4 mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl text-white uppercase tracking-tight">
              QUESTIONS & ANSWERS.
            </h2>

            <p className="text-zinc-400 font-sans-clean text-sm sm:text-base max-w-xl mx-auto">
              Everything you need to know about our precision supplement formulas, batch lab testing, and fast WhatsApp order dispatch.
            </p>
          </div>
        </AnimatedReveal>

        {/* Accordion with Staggered Fade Up */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <AnimatedReveal
                key={idx}
                animation="fade-up"
                delay={idx * 60}
                duration={500}
              >
                <div
                  id={`faq-item-${idx}`}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-zinc-900/95 border-[#ccff00]/50 shadow-xl'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className="text-[10px] font-tech uppercase text-[#ccff00] font-bold">
                        {faq.category}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-white">
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center bg-zinc-900 border border-zinc-700 text-zinc-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#ccff00] border-[#ccff00]' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-zinc-300 font-sans-clean leading-relaxed border-t border-zinc-800/60 pt-4">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </AnimatedReveal>
            );
          })}
        </div>

        {/* Still have questions CTA */}
        <AnimatedReveal animation="scale-up" delay={200} duration={600}>
          <div className="mt-12 text-center p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="text-left">
              <h4 className="font-display font-bold text-sm sm:text-base text-white">
                Still have a specific nutrition question?
              </h4>
              <p className="text-xs text-zinc-400 font-sans-clean">
                Ask our advisory team directly on WhatsApp for an immediate response.
              </p>
            </div>

            <a
              href={getWhatsAppGeneralContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02] flex items-center gap-2 shrink-0 shadow-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat On WhatsApp</span>
            </a>
          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
};
