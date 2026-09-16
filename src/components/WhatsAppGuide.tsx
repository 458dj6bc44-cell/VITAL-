import React, { useState } from 'react';
import { ShoppingBag, FileText, Send, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { getWhatsAppGeneralContactUrl, WHATSAPP_PHONE_NUMBER } from '../utils/whatsapp';
import { AnimatedReveal } from './AnimatedReveal';

export const WhatsAppGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'CHOOSE YOUR SUPPLEMENTS',
      desc: 'Browse our precision catalog of native whey, Creapure®, hydration electrolytes, and recovery botanicals. Select your preferred flavor and size.',
      icon: ShoppingBag,
      highlight: 'Clinical Dosing'
    },
    {
      num: '02',
      title: 'BUILD YOUR CART',
      desc: 'Add individual items or build a tailored stack. Our real-time calculator updates your subtotal and unlocks free shipping on orders above 1,500 EGP.',
      icon: ShoppingBag,
      highlight: 'Free Shipping > 1,500 EGP'
    },
    {
      num: '03',
      title: 'FILL DISPATCH FORM',
      desc: 'Provide your name, phone number, city, and delivery address. No account registration or complex login required.',
      icon: FileText,
      highlight: 'Customer Information'
    },
    {
      num: '04',
      title: 'REVIEW & CONFIRM',
      desc: 'Check your itemized summary and click "CONFIRM & ORDER ON WHATSAPP". Our system compiles the formatted message in one tap.',
      icon: Send,
      highlight: 'Review Order'
    },
    {
      num: '05',
      title: 'WE CONFIRM ON WHATSAPP',
      desc: 'Our dispatch team confirms your order details, preferred delivery slot, and schedules your courier. Pay on delivery or via InstaPay.',
      icon: CheckCircle2,
      highlight: 'Average Reply: 3 Mins'
    }
  ];

  return (
    <section id="whatsapp-guide" className="py-20 sm:py-28 bg-[#0d0e11] relative border-t border-zinc-800/80 overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#ccff00]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header with Reveal */}
        <AnimatedReveal animation="fade-up" duration={700}>
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-zinc-700/80 text-xs font-tech text-[#ccff00] uppercase tracking-widest">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>FRICTIONLESS SOCIAL COMMERCE</span>
            </div>

            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white uppercase tracking-tight">
              SHOP. ADD TO CART. <br />
              <span className="text-[#ccff00]">ORDER ON WHATSAPP.</span>
            </h2>

            <p className="text-zinc-400 font-sans-clean text-sm sm:text-base leading-relaxed">
              We skipped clunky card forms, forgotten passwords, and payment gateway declines. Complete our simple customer form and transmit your order directly to WhatsApp for instant confirmation.
            </p>
          </div>
        </AnimatedReveal>

        {/* 5-Step Process Grid with Staggered Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 lg:gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;

            return (
              <AnimatedReveal
                key={step.num}
                animation="fade-up"
                delay={idx * 100}
                duration={600}
              >
                <div
                  id={`whatsapp-step-${step.num}`}
                  onMouseEnter={() => setActiveStep(idx)}
                  onClick={() => setActiveStep(idx)}
                  className={`relative rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between border h-full transform ${
                    isSelected
                      ? 'bg-zinc-900/95 border-[#ccff00] shadow-[0_0_25px_rgba(204,255,0,0.2)] -translate-y-1.5'
                      : 'bg-zinc-950/60 border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/50 hover:-translate-y-0.5'
                  }`}
                >
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-display font-black text-2xl sm:text-3xl transition-colors ${
                        isSelected ? 'text-[#ccff00]' : 'text-zinc-600'
                      }`}
                    >
                      {step.num}
                    </span>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#ccff00] text-black shadow-md'
                          : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-2 flex-1">
                    <span className="text-[10px] font-tech uppercase tracking-widest text-[#ccff00] font-bold">
                      {step.highlight}
                    </span>
                    <h3 className="font-display font-bold text-sm sm:text-base text-white uppercase tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-sans-clean leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  {/* Bottom Step Indicator line */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-tech text-zinc-500">
                    <span>STEP {step.num} OF 05</span>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isSelected ? 'bg-[#ccff00] animate-pulse' : 'bg-zinc-800'
                      }`}
                    />
                  </div>
                </div>
              </AnimatedReveal>
            );
          })}
        </div>

        {/* Live WhatsApp Demo Card / Direct Help Box with Scale Up Reveal */}
        <AnimatedReveal animation="scale-up" delay={250} duration={650}>
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md shadow-2xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-[#ccff00] text-xs font-tech font-bold uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Direct Hotline: +{WHATSAPP_PHONE_NUMBER}</span>
              </div>
              <h4 className="font-display font-bold text-xl sm:text-2xl text-white">
                Have questions or want customized stack advice?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-sans-clean max-w-xl">
                Our sports nutrition specialists are available on WhatsApp to help you choose the ideal combination for your goals, whether endurance running, hypertrophy, or fat loss.
              </p>
            </div>

            <a
              id="btn-whatsapp-guide-chat"
              href={getWhatsAppGeneralContactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 px-6 py-3.5 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-tech font-bold text-xs sm:text-sm uppercase tracking-wider transition-all transform hover:scale-[1.02] flex items-center gap-2 shadow-[0_0_20px_rgba(204,255,0,0.2)] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat With Nutritionist</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </AnimatedReveal>

      </div>
    </section>
  );
};
