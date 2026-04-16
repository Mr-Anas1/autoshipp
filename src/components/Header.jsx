import { Sun, Moon, Zap, Layers } from 'lucide-react';
import { gsapSmoothScroll } from '../utils/smoothScroll';

export default function Header({ isScrolled, isDark, setIsDark, theme }) {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled ? 'backdrop-blur-xl py-4 ' + (isDark ? 'bg-[#030014]/80 border-white/10' : 'bg-white/80 border-slate-200 shadow-sm') : 'bg-transparent border-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className={`flex items-center gap-2 ${theme.heading} font-bold text-2xl tracking-tight`}>
          <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white shadow-lg`}>
            <Zap size={20} fill="currentColor" />
          </div>
          Autoship
        </div>

        <div className="hidden md:flex items-center gap-10 text-sm font-semibold">
          <button
            onClick={() => gsapSmoothScroll('#problem')}
            className={`transition-colors hover:${theme.accent} cursor-pointer`}
            type="button"
          >
            Problem
          </button>
          <button
            onClick={() => gsapSmoothScroll('#solution')}
            className={`transition-colors hover:${theme.accent} cursor-pointer`}
            type="button"
          >
            Solution
          </button>
          <button
            onClick={() => gsapSmoothScroll('#how-it-works')}
            className={`transition-colors hover:${theme.accent} cursor-pointer`}
            type="button"
          >
            Flow
          </button>
          <button
            onClick={() => gsapSmoothScroll('#pricing')}
            className={`transition-colors hover:${theme.accent} cursor-pointer`}
            type="button"
          >
            Pricing
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2.5 rounded-full transition-all ${isDark ? 'bg-white/5 text-violet-400 hover:bg-white/10' : 'bg-slate-100 text-blue-600 hover:bg-slate-200'}`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className={`hidden sm:block text-sm font-bold px-6 py-2.5 rounded-full transition-all ${theme.primaryBtn} shadow-lg shadow-violet-500/10`}>
            Book Demo
          </button>
        </div>
      </div>
    </nav>
  );
}
