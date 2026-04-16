import React, { useRef } from 'react';
import { PhoneCall, MessageCircle, Globe, Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
   gsap.registerPlugin(ScrollTrigger);
}

export default function SolutionSection({ theme, isDark }) {
   const sectionRef = useRef(null);

   useGSAP(() => {
      // 1. Entrance Animation
      gsap.from(".gsap-solution-header", {
         scrollTrigger: {
            trigger: ".gsap-solution-header",
            start: "top 80%",
         },
         y: 40,
         opacity: 0,
         duration: 1,
         ease: "power3.out"
      });

      gsap.from(".gsap-solution-card", {
         scrollTrigger: {
            trigger: ".gsap-solution-grid",
            start: "top 70%",
         },
         scale: 0.9,
         y: 40,
         opacity: 0,
         stagger: 0.12,
         duration: 0.8,
         ease: "back.out(1.2)",
         clearProps: "all"
      });

      // 2. Parallax Icon Effect
      const handleMouseMove = (e) => {
         const { clientX, clientY } = e;
         const xPos = (clientX / window.innerWidth - 0.5) * 40;
         const yPos = (clientY / window.innerHeight - 0.5) * 40;

         gsap.to(".gsap-parallax-icon", {
            x: xPos,
            y: yPos,
            duration: 2,
            ease: "power2.out"
         });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
   }, { scope: sectionRef });

   // 3. Hover Shimmer Animation
   const onMouseEnter = (e) => {
      const shimmer = e.currentTarget.querySelector(".shimmer-swipe");
      gsap.fromTo(shimmer,
         { x: "-100%", opacity: 0 },
         { x: "100%", opacity: 1, duration: 0.8, ease: "power2.inOut" }
      );
   };

   // Glass Design Tokens
   const glassClasses = isDark
      ? "bg-white/[0.02] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
      : "bg-white/30 border-slate-200 hover:bg-white/60 hover:border-white";

   return (
      <section
         id="solution"
         ref={sectionRef}
         className="py-32 relative overflow-hidden"
      >
         {/* Background Glows - Critical for Glass Effect visibility */}
         <div className="absolute top-1/2 left-[-10%] w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
         <div className="absolute top-10 right-[-10%] w-[400px] h-[400px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

         <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <div className="gsap-solution-header text-center mb-24">
               <h2 className={`text-4xl md:text-6xl font-black ${theme.heading} tracking-tighter`}>
                  Built for hyper-growth.
               </h2>
               <p className="text-xl text-slate-500 mt-6 font-medium">
                  Verify, automate, and dominate the Indian market.
               </p>
            </div>

            <div className="gsap-solution-grid grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[650px]">

               {/* AI CALLS (Main Feature) */}
               <div
                  onMouseEnter={onMouseEnter}
                  className={`gsap-solution-card md:col-span-8 rounded-[2.5rem] p-12 border relative overflow-hidden flex flex-col justify-end group transition-all duration-500 backdrop-blur-sm hover:backdrop-blur-xl ${glassClasses} shadow-sm hover:shadow-2xl`}
               >
                  {/* Glass Shimmer Swipe */}
                  <div className="shimmer-swipe absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 -z-0 pointer-events-none opacity-0" />

                  <div className={`gsap-parallax-icon absolute top-0 right-0 p-12 opacity-[0.05] dark:opacity-[0.1] ${theme.accent}`}>
                     <PhoneCall size={320} strokeWidth={1} />
                  </div>

                  <div className="relative z-10 max-w-lg">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br ${theme.accentGradient} shadow-lg group-hover:scale-110 transition-transform`}>
                        <PhoneCall size={24} />
                     </div>
                     <h3 className={`text-3xl md:text-5xl font-black ${theme.heading} mb-6 leading-tight`}>
                        AI Voice calls that feel human.
                     </h3>
                     <p className="text-lg text-slate-500 font-medium leading-relaxed">
                        Our AI calls customers instantly in 8+ Indian languages. It confirms address, intent, and time preferences with 99% accuracy.
                     </p>
                  </div>
               </div>

               {/* WHATSAPP */}
               <div
                  onMouseEnter={onMouseEnter}
                  className={`gsap-solution-card md:col-span-4 rounded-[2.5rem] p-10 border relative overflow-hidden flex flex-col justify-center group transition-all duration-500 backdrop-blur-sm hover:backdrop-blur-xl ${glassClasses} shadow-sm hover:shadow-2xl`}
               >
                  <div className="shimmer-swipe absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none opacity-0" />
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-green-500/10 text-green-500 group-hover:rotate-12 transition-transform`}>
                     <MessageCircle size={28} />
                  </div>
                  <h3 className={`text-2xl font-black ${theme.heading} mb-4`}>WhatsApp Fallback</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                     Missed calls? No problem. We automatically trigger an interactive WhatsApp flow to secure confirmation.
                  </p>
               </div>

               {/* COURIER */}
               <div
                  onMouseEnter={onMouseEnter}
                  className={`gsap-solution-card md:col-span-6 rounded-[2.5rem] p-10 border relative overflow-hidden flex items-center gap-8 group transition-all duration-500 backdrop-blur-sm hover:backdrop-blur-xl ${glassClasses} shadow-sm hover:shadow-2xl`}
               >
                  <div className="shimmer-swipe absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none opacity-0" />
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-500 group-hover:scale-105 transition-transform`}>
                     <Globe size={40} />
                  </div>
                  <div>
                     <h3 className={`text-2xl font-black ${theme.heading} mb-2`}>Smart Carrier Selection</h3>
                     <p className="text-slate-500 font-medium">Auto-selects best courier based on speed, cost, and historical RTO for that pincode.</p>
                  </div>
               </div>

               {/* AUTOMATION (Special Glass) */}
               <div
                  onMouseEnter={onMouseEnter}
                  className={`gsap-solution-card md:col-span-6 rounded-[2.5rem] p-10 border relative overflow-hidden flex items-center gap-8 group transition-all duration-500 backdrop-blur-md hover:backdrop-blur-2xl ${isDark
                     ? 'bg-violet-600/20 border-violet-500/30 hover:bg-violet-600/40'
                     : 'bg-blue-600/90 border-blue-400 hover:bg-blue-600 text-white'
                     } shadow-sm hover:shadow-2xl`}
               >
                  <div className="shimmer-swipe absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none opacity-0" />
                  <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 ${isDark ? 'bg-violet-500/20' : 'bg-white/20'}  group-hover:text-blue-600 transition-all duration-300`}>
                     <Zap size={40} className={isDark ? "text-white" : "text-white group-hover:text-blue-600"} />
                  </div>
                  <div>
                     <h3 className={`text-2xl font-black mb-2 ${!isDark && 'text-white'}`}>Zero-Touch Dispatch</h3>
                     <p className={`font-medium ${isDark ? 'opacity-80' : 'text-blue-50'}`}>Auto-tags Shopify orders and triggers labels instantly. No manual work required.</p>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}