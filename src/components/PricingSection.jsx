import React, { useRef } from 'react';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger);
}

export default function PricingSection({ theme, isDark }) {
   const sectionRef = useRef(null);
   const cardRef = useRef(null);

   useGSAP(() => {
      // 1. Header Animation
      gsap.from(".gsap-pricing-header", {
         scrollTrigger: {
            trigger: ".gsap-pricing-header",
            start: "top 80%",
         },
         y: 30,
         opacity: 0,
         duration: 0.8,
         ease: "power3.out"
      });

      // 2. Pricing Card Scale Up
      gsap.from(cardRef.current, {
         scrollTrigger: {
            trigger: cardRef.current,
            start: "top 75%",
         },
         scale: 0.95,
         opacity: 0,
         duration: 0.8,
         ease: "expo.out"
      });

      // 3. Staggered Features List
      gsap.from(".gsap-price-feature", {
         scrollTrigger: {
            trigger: cardRef.current,
            start: "top 65%",
         },
         x: -20,
         opacity: 0,
         stagger: 0.1,
         duration: 0.8,
         ease: "power2.out"
      });
   }, { scope: sectionRef });

   // Hover Shimmer Trigger
   const handleMouseEnter = () => {
      gsap.fromTo(".gsap-price-shimmer",
         { x: "-100%", opacity: 0 },
         { x: "100%", opacity: 1, duration: 1, ease: "power3.inOut" }
      );
   };

   // Glass Design Logic
   const glassBase = isDark
      ? "bg-white/[0.03] border-white/10 hover:bg-white/[0.08] hover:border-violet-500/50"
      : "bg-white/40 border-slate-200 hover:bg-white/70 hover:border-blue-400";

   return (
      <section
         id="pricing"
         ref={sectionRef}
         className={`py-32 border-y transition-colors relative overflow-hidden ${isDark ? 'bg-slate-900/20 border-white/5' : 'bg-slate-100/50 border-slate-200'
            }`}
      >
         {/* Dynamic Background Glows */}
         <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-20 gsap-pricing-header">
               <h2 className={`text-4xl md:text-6xl font-black ${theme.heading} mb-6 tracking-tighter`}>
                  ₹4 per confirmed order.
               </h2>
               <p className="text-xl text-slate-500 font-medium">
                  No setup fees. No monthly subscriptions. Just pay for results.
               </p>
            </div>

            <div className="max-w-xl mx-auto">
               <div
                  ref={cardRef}
                  onMouseEnter={handleMouseEnter}
                  className={`rounded-[3rem] p-12 border transition-all duration-700 relative overflow-hidden group backdrop-blur-md hover:backdrop-blur-2xl shadow-sm hover:shadow-2xl ${glassBase}`}
               >
                  {/* Glass Shimmer Effect */}
                  <div className="gsap-price-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none opacity-0" />

                  {/* Popular Badge */}
                  <div className={`absolute top-0 right-0 px-8 py-2 font-black text-xs uppercase tracking-widest ${isDark ? 'bg-violet-600 text-white' : 'bg-blue-600 text-white'
                     }`}>
                     Popular Plan
                  </div>

                  <div className="flex items-baseline gap-2 mb-10">
                     <span className={`text-7xl font-black tracking-tighter ${theme.heading}`}>₹4</span>
                     <span className="text-slate-500 font-bold text-lg">/ confirmation</span>
                  </div>

                  <ul className="space-y-6 mb-12">
                     {[
                        "AI Voice Calls (Human Tone)",
                        "Multi-language Support (8+ Langs)",
                        "WhatsApp Fallback Automation",
                        "Smart Carrier Optimization",
                        "Real-time Dashboard & Analytics",
                        "Zero Setup & Onboarding Fees"
                     ].map((f, i) => (
                        <li key={i} className="gsap-price-feature flex items-center gap-4">
                           <div className={`p-1 rounded-full ${isDark ? 'bg-violet-400/10' : 'bg-blue-600/10'}`}>
                              <CheckCircle2 size={22} className={isDark ? 'text-violet-400' : 'text-blue-600'} />
                           </div>
                           <span className={`font-bold text-lg ${theme.heading}`}>{f}</span>
                        </li>
                     ))}
                  </ul>

                  <button className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all active:scale-95 shadow-2xl hover:-translate-y-1 group-hover:shadow-violet-500/20 ${theme.primaryBtn}`}>
                     Start Saving Now
                  </button>

                  <p className="text-center mt-6 text-xs font-bold text-slate-400 uppercase tracking-widest">
                     Cancel or pause anytime
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}