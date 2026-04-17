'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className={`text-3xl md:text-4xl font-black ${theme.heading} mb-8`}>Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>Acceptance of Terms</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                By accessing and using Autoship, you agree to be bound by these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>Services</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                Autoship provides AI-powered logistics services including:
              </p>
              <ul className="space-y-2 ml-6">
                <li className={`text-sm ${theme.text}`}>• Order verification through AI calls</li>
                <li className={`text-sm ${theme.text}`}>• RTO prevention and analytics</li>
                <li className={`text-sm ${theme.text}`}>• Smart carrier routing</li>
                <li className={`text-sm ${theme.text}`}>• Real-time tracking and reporting</li>
              </ul>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>User Responsibilities</h2>
              <div className={`${theme.card} rounded-xl p-6 ${isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-blue-50 border-blue-200'}`}>
                <h3 className={`font-bold ${theme.heading} mb-2`}>As a user, you agree to:</h3>
                <ul className="space-y-2">
                  <li className={`flex items-start gap-2 ${theme.text}`}>
                    <Scale size={16} className="mt-1 shrink-0 text-blue-500" />
                    <span>Provide accurate information for order verification</span>
                  </li>
                  <li className={`flex items-start gap-2 ${theme.text}`}>
                    <Scale size={16} className="mt-1 shrink-0 text-blue-500" />
                    <span>Use the service for legitimate business purposes</span>
                  </li>
                  <li className={`flex items-start gap-2 ${theme.text}`}>
                    <Scale size={16} className="mt-1 shrink-0 text-blue-500" />
                    <span>Maintain confidentiality of account credentials</span>
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>Payment Terms</h2>
              <p className={`leading-relaxed ${theme.text} mb-4`}>
                Subscription fees are billed monthly. Service continues until cancellation.
              </p>
              <div className={`grid md:grid-cols-2 gap-6 ${theme.card} rounded-xl p-6`}>
                <div>
                  <h4 className={`font-bold ${theme.heading} mb-2`}>Cancellation</h4>
                  <p className={`text-sm ${theme.text}`}>
                    Cancel anytime with 30-day notice. No long-term commitments.
                  </p>
                </div>
                <div>
                  <h4 className={`font-bold ${theme.heading} mb-2`}>Refunds</h4>
                  <p className={`text-sm ${theme.text}`}>
                    Prorated refunds for unused service portions.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className={`text-2xl font-bold ${theme.heading} mb-4`}>Limitation of Liability</h2>
              <p className={`leading-relaxed ${theme.text}`}>
                Autoship is not liable for indirect or consequential damages. Use of service is at your own risk.
              </p>
            </section>

            <section className={`mt-8 p-6 rounded-2xl ${isDark ? 'bg-violet-500/10 border-violet-500/20' : 'bg-blue-50 border-blue-200'}`}>
              <h3 className={`text-lg font-bold ${theme.heading} mb-2`}>Contact Legal</h3>
              <p className={`mb-4 ${theme.text}`}>
                For questions about these terms, contact our legal team at legal@autoship.com
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
