import { ArrowRight, MousePointer2, Layers } from 'lucide-react';

export default function Hero({ theme, isDark }) {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-12 pt-44 pb-20 text-center">
      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 text-sm font-bold uppercase tracking-wider transition-all ${isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-blue-50 border-blue-100 text-blue-600'}`}>
        <Layers size={14} />
        Stop Losing COD Profits
      </div>

      <h1 className={`text-6xl md:text-8xl font-black ${theme.heading} tracking-tighter leading-[0.95] mb-8 max-w-5xl mx-auto transition-colors`}>
        Verify orders with <br />
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme.accentGradient}`}>AI Voice Automation</span>
      </h1>

      <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
        Reduce RTO by up to <span className={theme.heading}>70%</span> by confirming intent before you ship. Zero setup fees. Zero monthly costs.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
        <button className={`w-full sm:w-auto font-bold px-10 py-5 rounded-2xl transition-all flex items-center justify-center gap-2 text-xl shadow-2xl ${theme.primaryBtn}`}>
          Get Started <ArrowRight size={22} />
        </button>
        <button className={`w-full sm:w-auto font-bold px-10 py-5 rounded-2xl border transition-all flex items-center justify-center gap-2 text-xl ${theme.secondaryBtn}`}>
          Watch Demo <MousePointer2 size={20} />
        </button>
      </div>
      <p className="mt-8 text-sm font-bold text-slate-400">Join 500+ India's top D2C brands</p>
    </section>
  );
}
