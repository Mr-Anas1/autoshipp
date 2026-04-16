import { Zap, Globe, MessageCircle } from 'lucide-react';

export default function Footer({ theme, isDark }) {
  return (
    <footer className={`py-20 border-t transition-colors ${isDark ? 'bg-black border-white/5' : 'bg-slate-100 border-slate-200'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <div className={`flex items-center gap-2 ${theme.heading} font-bold text-2xl tracking-tight mb-8`}>
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${theme.accentGradient} flex items-center justify-center text-white`}>
                <Zap size={18} fill="currentColor" />
              </div>
              Autoship
            </div>
            <p className="text-slate-500 font-medium leading-relaxed mb-8">
              The AI-native dispatch engine for Indian D2C brands. Stop RTO, Start Profit.
            </p>
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-blue-600 shadow-sm'}`}><Globe size={20} /></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'bg-white/5 text-slate-400 hover:text-white' : 'bg-white text-slate-500 hover:text-blue-600 shadow-sm'}`}><MessageCircle size={20} /></div>
            </div>
          </div>

          {[
            { title: "Product", links: ["Features", "Pricing", "API Docs", "Changelog"] },
            { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
            { title: "Legal", links: ["Privacy", "Terms", "Security", "GDPR"] }
          ].map((col, i) => (
            <div key={i}>
              <h4 className={`font-black text-sm uppercase tracking-widest ${theme.heading} mb-8`}>{col.title}</h4>
              <ul className="space-y-4 text-slate-500 font-bold">
                {col.links.map((link, j) => (
                  <li key={j}><a href="#" className={`transition-colors hover:${theme.accent}`}>{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className={`pt-12 border-t flex flex-col md:flex-row items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500 gap-6 ${isDark ? 'border-white/5' : 'border-slate-200'}`}>
          <p>© 2024 Autoship. Built with for D2C Brands.</p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${isDark ? 'bg-violet-400' : 'bg-blue-600'}`}></span>
              Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
