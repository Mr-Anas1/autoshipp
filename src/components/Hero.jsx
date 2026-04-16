import { useEffect, useRef } from 'react';
import { ArrowRight, MousePointer2, Layers } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero({ theme, isDark }) {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // 1. Initial Entrance Animation
    tl.from(".gsap-hero-badge", {
      y: -20,
      opacity: 0,
      duration: 0.8
    })
      .from(".gsap-hero-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1
      }, "-=0.4")
      .from(".gsap-hero-subtitle", {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      .from(".gsap-hero-btn", {
        scale: 0.9,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: "back.out(1.7)"
      }, "-=0.5");

    // 2. Floating Animation for Blobs
    gsap.to(".gsap-float", {
      y: "random(-20, 20)",
      x: "random(-15, 15)",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 1,
        from: "random"
      }
    });

    // 3. Mouse Parallax Effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth) - 0.5;
      const yPos = (clientY / window.innerHeight) - 0.5;

      gsap.to(".gsap-parallax", {
        x: xPos * 50,
        y: yPos * 50,
        duration: 1,
        ease: "power2.out",
        overwrite: "auto"
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, { scope: container });

  return (
    <section
      ref={container}
      className="max-w-7xl mx-auto px-6 md:px-12 pt-44 pb-20 text-center relative overflow-hidden"
    >
      <div className="relative z-10">
        <div className={` inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-bold uppercase tracking-wider transition-all ${isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
          <Layers size={14} />
          Stop Losing COD Profits
        </div>

        <h1 className={`gsap-hero-title text-6xl md:text-8xl font-black ${theme.heading} tracking-tighter leading-[0.95] mb-8 max-w-5xl mx-auto transition-colors`}>
          Verify orders with <br />
          <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>AI Voice Automation</span>
        </h1>

        <p className="gsap-hero-subtitle text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
          Reduce RTO by up to <span className={theme.heading}>70%</span> by confirming intent before you ship. Zero setup fees. Zero monthly costs.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
          <button className={`gsap-hero-btn w-full sm:w-auto font-bold px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-2 text-xl shadow-2xl ${theme.primaryBtn} hover:scale-105 active:scale-95`}>
            Get Started <ArrowRight size={22} />
          </button>
          <button className={`gsap-hero-btn w-full sm:w-auto font-bold px-10 py-5 rounded-2xl border transition-all flex items-center justify-center gap-2 text-xl ${theme.secondaryBtn} hover:bg-slate-50 dark:hover:bg-slate-800`}>
            Watch Demo <MousePointer2 size={20} />
          </button>
        </div>

        <p className="gsap-hero-btn mt-8 text-sm font-bold text-slate-400">
          Join 500+ India's top D2C brands
        </p>
      </div>

      {/* Abstract floating elements */}
      <div className="gsap-float gsap-parallax absolute top-20 left-[5%] w-64 h-64 rounded-full bg-violet-500/10 blur-[80px] -z-10"></div>
      <div className="gsap-float gsap-parallax absolute bottom-10 right-[5%] w-80 h-80 rounded-full bg-blue-500/10 blur-[100px] -z-10"></div>
      <div className="gsap-float gsap-parallax absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-fuchsia-500/5 blur-[120px] -z-20"></div>
    </section>
  );
}