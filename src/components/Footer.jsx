import React, { useRef } from 'react';
import { Zap, Globe, MessageCircle, Link } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Footer({ theme, isDark }) {
  const footerRef = useRef(null);

  useGSAP(() => {
    // 1. Column Entrance: Staggered slide up
    gsap.from(".gsap-footer-col", {
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
      },
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.8,
      ease: "power2.out"
    });

    // 2. Logo Breathing Animation
    gsap.to(".gsap-footer-logo-icon", {
      scale: 1.15,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // 3. Magnetic Social Icons Logic
    const socialIcons = gsap.utils.toArray(".gsap-footer-social");
    socialIcons.forEach(icon => {
      icon.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = icon.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(icon, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      icon.addEventListener("mouseleave", () => {
        gsap.to(icon, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
      });
    });
  }, { scope: footerRef });

  return (
    <footer
      ref={footerRef}
      className={`py-20 border-t transition-colors relative overflow-hidden ${isDark ? 'bg-[#05050a] border-white/5' : 'bg-slate-50 border-slate-200'
        }`}
    >
      {/* Background Ambient Glow (Bottom Right) */}
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-violet-600/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-20">

          {/* Brand Info */}
          <div className="gsap-footer-col col-span-1">
            <div className={`flex items-center gap-2 ${theme.heading} font-bold text-2xl tracking-tight mb-8`}>
              <div className={`gsap-footer-logo-icon w-9 h-9 rounded-xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white shadow-lg`}>
                <Zap size={20} fill="currentColor" />
              </div>
              Autoship
            </div>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              The AI-native dispatch engine for high-growth Indian D2C brands. Stop RTO, Start Profit.
            </p>
            <div className="flex items-center gap-4">
              {[Globe, MessageCircle, Link, Link].map((Icon, idx) => (
                <div
                  key={idx}
                  className={`gsap-footer-social w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer border ${isDark
                    ? 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-blue-600 shadow-sm'
                    }`}
                >
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Link Columns */}
          {[
            {
              title: "Product",
              links: ["AI Voice", "WhatsApp Flow", "Smart Carrier", "Analytics"]
            },
            {
              title: "Company",
              links: ["About Us", "Brand Assets", "Careers", "Contact"]
            },
            {
              title: "Legal",
              links: ["Privacy Policy", "Terms of Service", "Security", "SLA"]
            }
          ].map((col, i) => (
            <div key={i} className="gsap-footer-col">
              <h4 className={`font-black text-sm uppercase tracking-[0.15em] ${theme.heading} mb-8`}>
                {col.title}
              </h4>
              <ul className="space-y-4">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="group flex items-center gap-0 text-slate-500 font-bold hover:text-inherit transition-all duration-300"
                    >
                      <span className={`w-0 group-hover:w-4 h-[2px] ${isDark ? 'bg-violet-500' : 'bg-blue-600'} transition-all duration-300 mr-0 group-hover:mr-2`} />
                      <span className={`transition-colors group-hover:${theme.accent}`}>
                        {link}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className={`pt-10 border-t flex flex-col md:flex-row items-center justify-between text-[11px] font-black uppercase tracking-[0.2em] text-slate-500/60 gap-6 ${isDark ? 'border-white/5' : 'border-slate-200'
          }`}>
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8">
            <p>© 2026 Autoship Technologies. All rights reserved.</p>
            <div className="hidden md:block w-1 h-1 bg-slate-400 rounded-full" />
            <p>Made in India for the World</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isDark ? 'bg-violet-400' : 'bg-emerald-400'} opacity-75`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isDark ? 'bg-violet-500' : 'bg-emerald-500'}`}></span>
              </span>
              <span className="opacity-80">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}