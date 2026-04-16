import React, { useRef, useState } from 'react';
import { Sun, Moon, Zap, Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { gsapSmoothScroll } from '../utils/smoothScroll';

export default function Header({ isScrolled, isDark, setIsDark, theme }) {
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  // --- GSAP Animations ---
  useGSAP(() => {
    // 1. Initial Desktop Entrance
    const tl = gsap.timeline();
    tl.from(".gsap-header-logo", { x: -20, opacity: 0, duration: 0.6, ease: "power3.out" })
      .from(".gsap-nav-item", { y: -10, opacity: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }, "-=0.4")
      .from(".gsap-header-actions", { x: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.6");

    // 2. Mobile Menu Animation Logic
    if (isOpen) {
      gsap.to(menuRef.current, {
        clipPath: "circle(150% at 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
      gsap.fromTo(".gsap-mobile-link",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 0.3 }
      );
    } else {
      gsap.to(menuRef.current, {
        clipPath: "circle(0% at 100% 0%)",
        duration: 0.6,
        ease: "power4.inOut",
      });
    }

    // 3. Magnetic Links (Desktop)
    const navItems = gsap.utils.toArray(".gsap-nav-item");
    navItems.forEach(item => {
      item.addEventListener("mousemove", (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = item.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        gsap.to(item, { x: x * 0.3, y: y * 0.3, duration: 0.2 });
      });
      item.addEventListener("mouseleave", () => {
        gsap.to(item, { x: 0, y: 0, duration: 0.4, ease: "back.out(2)" });
      });
    });
  }, { scope: headerRef, dependencies: [isOpen] });

  const toggleMenu = () => setIsOpen(!isOpen);

  const glassClasses = isScrolled
    ? isDark
      ? 'bg-[#030014]/80 border-white/10 backdrop-blur-xl py-4 shadow-2xl'
      : 'bg-white/80 border-slate-200 backdrop-blur-xl py-4 shadow-sm'
    : 'bg-transparent border-transparent py-6';

  return (
    <nav ref={headerRef} className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${glassClasses}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative z-[60]">

        {/* Logo */}
        <div className="gsap-header-logo flex items-center gap-2 font-bold text-2xl tracking-tight cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white shadow-lg`}>
            <Zap size={20} fill="currentColor" />
          </div>
          <span className={theme.heading}>Autoship</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 text-sm font-bold">
          {['Problem', 'Solution', 'Flow', 'Pricing'].map((item) => (
            <button
              key={item}
              onClick={() => gsapSmoothScroll(`#${item.toLowerCase()}`)}
              className={`gsap-nav-item relative px-4 py-2 group transition-colors hover:${theme.accent} ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
              type="button"
            >
              {item}
              <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] ${isDark ? 'bg-violet-500' : 'bg-blue-600'} transition-all duration-300 group-hover:w-1/2`} />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="gsap-header-actions flex items-center gap-2 sm:gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2.5 rounded-full transition-all border ${isDark ? 'bg-white/5 border-white/10 text-violet-400' : 'bg-slate-100 border-slate-200 text-blue-600'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button className={`hidden sm:block text-sm font-black px-8 py-3 rounded-full transition-all active:scale-95 shadow-lg ${theme.primaryBtn}`}>
            Book Demo
          </button>

          {/* Hamburger Menu Icon */}
          <button
            onClick={toggleMenu}
            className={`md:hidden p-2.5 rounded-xl transition-all ${isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-600'}`}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      <div
        ref={menuRef}
        style={{ clipPath: "circle(0% at 100% 0%)" }}
        className={`fixed inset-0 w-full h-screen flex flex-col items-center justify-center gap-8 z-[55] md:hidden ${isDark ? 'bg-[#030014]/98 backdrop-blur-2xl' : 'bg-white/98 backdrop-blur-2xl'
          }`}
      >
        {['Problem', 'Solution', 'Flow', 'Pricing'].map((item) => (
          <button
            key={item}
            onClick={() => { toggleMenu(); gsapSmoothScroll(`#${item.toLowerCase()}`); }}
            className={`gsap-mobile-link text-4xl font-black tracking-tighter ${theme.heading} hover:${theme.accent}`}
          >
            {item}
          </button>
        ))}
        <button
          onClick={toggleMenu}
          className={`gsap-mobile-link mt-4 px-10 py-4 rounded-2xl font-black text-xl ${theme.primaryBtn}`}
        >
          Book Demo
        </button>
      </div>
    </nav>
  );
}