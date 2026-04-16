'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import DashboardPreview from '../components/DashboardPreview';
import ProblemSection from '../components/ProblemSection';
import SolutionSection from '../components/SolutionSection';
import PricingSection from '../components/PricingSection';
import CTASection from '../components/CTASection';
import Footer from '../components/Footer';
import AmbientGlows from '../components/AmbientGlows';
import CustomCursor from '../components/CustomCursor';
import LoadingScreen from '../components/LoadingScreen';
import useGSAPAnimations from '../hooks/useGSAPAnimations';
import useSmoothScroll from '../hooks/useSmoothScroll';

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useGSAPAnimations();

  useSmoothScroll({ enabled: !isLoading });

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Theme-specific color classes
  const theme = {
    dark: isDark,
    bg: isDark ? 'bg-[#030014]' : 'bg-slate-50',
    text: isDark ? 'text-slate-300' : 'text-slate-600',
    heading: isDark ? 'text-white' : 'text-slate-900',
    accent: isDark ? 'text-violet-400' : 'text-blue-600',
    primaryBtn: isDark ? 'bg-violet-600 hover:bg-violet-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
    secondaryBtn: isDark ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 shadow-sm',
    card: isDark ? 'bg-white/[0.03] border-white/10' : 'bg-white border-slate-200 shadow-sm',
    glow: isDark ? 'opacity-20' : 'opacity-10',
    accentGradient: isDark ? 'from-violet-500 to-fuchsia-500' : 'from-blue-600 to-indigo-600',
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#030014] text-slate-300 font-sans selection:bg-violet-500 selection:text-white overflow-x-hidden">
        <div className="animate-pulse">
          <div className="h-20 bg-white/5"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-44 pb-20">
            <div className="h-32 bg-white/10 rounded-2xl mb-8"></div>
            <div className="h-20 bg-white/10 rounded-2xl mb-4"></div>
            <div className="h-96 bg-white/5 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={isDark ? 'dark' : ''}>
      <CustomCursor />
      <div ref={containerRef} className={`min-h-screen ${theme.bg} ${theme.text} font-sans selection:bg-violet-500 selection:text-white overflow-x-hidden transition-colors duration-700 scroll-smooth`}>
        
        <AmbientGlows theme={theme} isDark={isDark} />
        
        <Header 
          isScrolled={isScrolled} 
          isDark={isDark} 
          setIsDark={setIsDark} 
          theme={theme} 
        />

        <main className="relative z-10">
          <Hero theme={theme} isDark={isDark} />
          <DashboardPreview theme={theme} isDark={isDark} />
          <ProblemSection theme={theme} isDark={isDark} />
          <div id="how-it-works" />
          <SolutionSection theme={theme} isDark={isDark} />
          <PricingSection theme={theme} isDark={isDark} />
          <CTASection theme={theme} isDark={isDark} />
        </main>

        <Footer theme={theme} isDark={isDark} />
      </div>
    </div>
  );
}
