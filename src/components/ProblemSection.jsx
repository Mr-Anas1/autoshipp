import React, { useRef } from 'react';
import { TrendingDown, Activity, Clock } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the plugin outside the component
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProblemSection({ theme, isDark }) {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Setup a timeline for the header and cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%", // Earlier trigger for better responsiveness
        toggleActions: "play none none none",
      }
    });

    tl.from(".gsap-problem-title", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out"
    })
      .from(".gsap-problem-card", {
        y: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "all" // Cleans up inline styles after animation
      }, "-=0.4");

    // 2. Separate ScrollTrigger for the counting numbers
    const stats = gsap.utils.toArray(".gsap-stat-value");
    stats.forEach((stat) => {
      const targetValue = parseInt(stat.getAttribute("data-value"));

      gsap.to(stat, {
        scrollTrigger: {
          trigger: stat,
          start: "top 85%",
        },
        innerText: targetValue,
        duration: 2,
        snap: { innerText: 1 },
        ease: "expo.out",
      });
    });

    // 3. Background floating effect (Continuous)
    gsap.to(".gsap-danger-glow", {
      scale: 1.3,
      opacity: 0.08,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

  }, { scope: sectionRef });

  const problemData = [
    {
      icon: <TrendingDown size={40} className="text-red-500" />,
      stat: "25",
      suffix: "%",
      label: "Average RTO Rate",
      desc: "1 in 4 orders are fake or undelivered, burning your marketing budget."
    },
    {
      icon: <Activity size={40} className="text-orange-500" />,
      prefix: "₹",
      stat: "150",
      label: "Lost per Return",
      desc: "Every RTO costs you double in shipping and logistics overhead."
    },
    {
      icon: <Clock size={40} className="text-amber-500" />,
      stat: "10",
      suffix: " Mins",
      label: "Manual Delay",
      desc: "Confirming orders manually is slow, error-prone, and expensive to scale."
    },
  ];

  return (
    <section
      id="problem"
      ref={sectionRef}
      className={`py-32 border-t transition-colors relative overflow-hidden ${isDark ? 'bg-slate-900/20 border-white/5' : 'bg-slate-100/50 border-slate-200'
        }`}
    >
      {/* Animated Danger Glow */}
      <div className="gsap-danger-glow absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[120px] pointer-events-none -z-10"></div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className={`gsap-problem-title text-4xl md:text-6xl font-black ${theme.heading} mb-20 tracking-tighter`}>
          COD is killing your business.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {problemData.map((item, i) => (
            <div
              key={i}
              className={`gsap-problem-card relative p-10 rounded-3xl border text-left transition-all duration-300 group ${theme.card} hover:border-red-500/30 shadow-sm hover:shadow-xl`}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className={`text-5xl font-black ${theme.heading} mb-2 flex items-baseline`}>
                {item.prefix && <span>{item.prefix}</span>}
                <span className="gsap-stat-value" data-value={item.stat}>0</span>
                {item.suffix && <span>{item.suffix}</span>}
              </div>
              <div className={`text-xl font-bold ${theme.heading} mb-4`}>
                {item.label}
              </div>
              <p className="text-slate-500 font-medium leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}