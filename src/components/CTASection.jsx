import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CTASection({ theme, isDark }) {
  const containerRef = useRef(null);
  const bgTextRef = useRef(null);

  useGSAP(() => {
    // 1. Infinite Scrolling Background Text
    gsap.to(bgTextRef.current, {
      xPercent: -50,
      repeat: -1,
      duration: 20,
      ease: "none",
    });

    // 2. Main Content Entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 65%", // Earlier trigger for better responsiveness
      }
    });

    tl.from(".gsap-cta-content", {
      y: 100,
      scale: 0.9,
      opacity: 0,
      duration: 1,
      ease: "expo.out"
    })
      .from(".gsap-cta-title", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.6")
      .from(".gsap-cta-btn", {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3");

    // 3. Magnetic Button Logic
    const btns = gsap.utils.toArray(".gsap-magnetic-btn");
    btns.forEach(btn => {
      btn.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = btn.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      btn.addEventListener("mouseleave", () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      });
    });

  }, { scope: containerRef });

  const glassClasses = isDark
    ? "bg-white/[0.02] border-white/10 backdrop-blur-2xl"
    : "bg-white/40 border-white/40 backdrop-blur-2xl shadow-2xl";

  return (
    <section
      ref={containerRef}
      className="py-20 md:py-44 relative overflow-hidden text-center"
    >
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-600/20 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className={`gsap-cta-content max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20 rounded-[2rem] md:rounded-[4rem] border relative z-10 ${glassClasses}`}>
        {/* Hover Shimmer */}
        <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent pointer-events-none rounded-[4rem]" />

        <div className="relative z-10">
          <h2 className={`gsap-cta-title text-3xl md:text-5xl lg:text-8xl font-black ${theme.heading} tracking-tighter mb-6 md:mb-10 leading-[0.9] md:leading-[0.9]`}>
            Ready to stop <br className="block md:hidden" /> losing money?
          </h2>

          <p className="text-lg md:text-xl lg:text-2xl text-slate-500 mb-8 md:mb-12 font-medium max-w-2xl mx-auto px-4">
            Setup takes 15 minutes. Impact is immediate. Start protecting your margins today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
            <div className="gsap-cta-btn w-full sm:w-auto">
              <button className={`gsap-magnetic-btn w-full sm:w-auto font-black px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] text-lg md:text-2xl transition-all shadow-2xl ${theme.primaryBtn}`}>
                Start Free Trial
              </button>
            </div>

            <div className="gsap-cta-btn w-full sm:w-auto">
              <button className={`gsap-magnetic-btn w-full sm:w-auto font-black px-8 md:px-12 py-4 md:py-6 rounded-[1.5rem] md:rounded-[2rem] border text-lg md:text-2xl transition-all ${theme.secondaryBtn}`}>
                Book Demo
              </button>
            </div>
          </div>

          <p className="mt-6 md:mt-10 text-xs md:text-sm font-bold text-slate-400 uppercase tracking-[0.15em] md:tracking-[0.2em] px-4">
            No credit card required • 14-day free trial
          </p>
        </div>
      </div>

      {/* Large background scrolling text */}
      <div
        ref={bgTextRef}
        className={`absolute bottom-0 left-0 w-[200%] font-black text-[15vw] md:text-[25vw] select-none pointer-events-none opacity-[0.03] ${theme.heading} whitespace-nowrap leading-none transition-colors`}
      >
        AUTOSHIP AUTOSHIP AUTOSHIP AUTOSHIP
      </div>
    </section>
  );
}