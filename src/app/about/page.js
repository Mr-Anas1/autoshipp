'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';

export default function AboutPage() {
  const [isDark, setIsDark] = useState(true);
  
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

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans`}>
      {/* Header */}
      <nav className={`border-b ${isDark ? 'border-white/[0.06]' : 'border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                <img src="/images/logo.png" alt="Autoship Logo" className="w-full h-full object-contain" />
              </div>
              <span className={`text-lg font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Auto<span className="text-violet-400">shipp</span>
              </span>
            </Link>
            
            <Link 
              href="/"
              className={`flex items-center gap-2 text-sm font-medium ${isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16">
        <div className={`max-w-3xl mx-auto ${theme.card} rounded-3xl p-8 md:p-12`}>
          <h1 className={`text-3xl md:text-4xl font-black ${theme.heading} mb-8`}>About Autoship</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className={`text-lg leading-relaxed ${theme.text}`}>
              Autoship is revolutionizing the Indian D2C logistics landscape with AI-powered order verification and RTO prevention. 
              Our mission is to help high-growth brands stop losing money to failed deliveries and optimize their logistics operations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 my-12">
              <div className={`${theme.card} rounded-2xl p-6`}>
                <h2 className={`text-xl font-bold ${theme.heading} mb-4`}>Our Mission</h2>
                <p className={theme.text}>
                  To eliminate Return-to-Origin (RTO) losses for Indian D2C brands through intelligent automation and real-time verification systems.
                </p>
              </div>
              
              <div className={`${theme.card} rounded-2xl p-6`}>
                <h2 className={`text-xl font-bold ${theme.heading} mb-4`}>Our Vision</h2>
                <p className={theme.text}>
                  To become the leading logistics platform enabling 1000+ Indian brands to scale profitably with confidence.
                </p>
              </div>
            </div>

            <h2 className={`text-2xl font-bold ${theme.heading} mt-12 mb-6`}>Key Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'AI Voice Verification', desc: 'Automated customer calls to confirm order authenticity' },
                { title: 'Real-time Analytics', desc: 'Track delivery success rates and identify issues instantly' },
                { title: 'Smart Routing', desc: 'Intelligent carrier selection based on success patterns' }
              ].map((feature, i) => (
                <div key={i} className={`${theme.card} rounded-xl p-6`}>
                  <h3 className={`font-bold ${theme.heading} mb-2`}>{feature.title}</h3>
                  <p className={`text-sm ${theme.text}`}>{feature.desc}</p>
                </div>
              ))}
            </div>

            <div className={`mt-12 p-6 rounded-2xl ${isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-blue-50 border-blue-200'}`}>
              <h3 className={`text-lg font-bold ${theme.heading} mb-2`}>Get Started Today</h3>
              <p className={`mb-4 ${theme.text}`}>
                Ready to transform your logistics? Book a demo with our team and see how Autoship can help your business grow.
              </p>
              <Link 
                href="/"
                className={`inline-flex items-center gap-2 ${theme.primaryBtn} px-6 py-3 rounded-xl font-bold transition-all`}
              >
                Book a Demo
                <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
