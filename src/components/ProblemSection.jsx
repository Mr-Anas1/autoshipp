import { TrendingDown, Activity, Clock } from 'lucide-react';

export default function ProblemSection({ theme, isDark }) {
  return (
    <section id="problem" className={`py-32 border-t transition-colors relative overflow-hidden ${isDark ? 'bg-slate-900/20 border-white/5' : 'bg-slate-100/50 border-slate-200'}`}>
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[120px] pointer-events-none gsap-parallax" data-speed="-30"></div>
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center relative z-10">
        <h2 className={`gsap-slide-in text-4xl md:text-6xl font-black ${theme.heading} mb-20 tracking-tighter`}>COD is killing your business.</h2>
        <div className="gsap-stagger-grid grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <TrendingDown size={40} className="text-red-500" />, stat: "25%", label: "Average RTO Rate", desc: "1 in 4 orders are fake or undelivered, burning your marketing budget." },
            { icon: <Activity size={40} className="text-orange-500" />, stat: "₹150", label: "Lost per Return", desc: "Every RTO costs you double in shipping and logistics overhead." },
            { icon: <Clock size={40} className="text-amber-500" />, stat: "10 Mins", label: "Manual Delay", desc: "Confirming orders manually is slow, error-prone, and expensive to scale." },
          ].map((item, i) => (
            <div key={i} className={`relative p-10 rounded-3xl border text-left transition-all hover:-translate-y-2 duration-300 ${theme.card}`}>
              <div className="mb-6">{item.icon}</div>
              <div className={`text-5xl font-black ${theme.heading} mb-2`}>{item.stat}</div>
              <div className={`text-xl font-bold ${theme.heading} mb-4`}>{item.label}</div>
              <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
