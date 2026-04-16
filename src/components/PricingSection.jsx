import { CheckCircle2 } from 'lucide-react';

export default function PricingSection({ theme, isDark }) {
   return (
      <section id="pricing" className={`py-32 border-y transition-colors ${isDark ? 'bg-slate-900/20 border-white/5' : 'bg-slate-100/50 border-slate-200'}`}>
         <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="text-center max-w-2xl mx-auto mb-20">
               <h2 className={`text-4xl md:text-6xl font-black ${theme.heading} mb-6 tracking-tighter`}>¥4 per confirmed order.</h2>
               <p className="text-xl text-slate-500 font-medium">No setup fees. No monthly subscriptions. Just pay for results.</p>
            </div>

            <div className="max-w-xl mx-auto">
               <div className={`rounded-[3rem] p-12 border transition-all duration-500 relative overflow-hidden ${isDark ? 'bg-white/5 border-violet-500/30' : 'bg-white border-blue-200 shadow-2xl'}`}>
                  <div className={`absolute top-0 right-0 px-8 py-2 font-black text-xs uppercase transition-colors ${isDark ? 'bg-violet-600 text-white' : 'bg-blue-600 text-white'}`}>Popular Plan</div>

                  <div className="flex items-baseline gap-2 mb-10">
                     <span className={`text-7xl font-black tracking-tighter ${theme.heading}`}>¥4</span>
                     <span className="text-slate-500 font-bold">/ confirmation</span>
                  </div>

                  <ul className="space-y-6 mb-12">
                     {[
                        "AI Voice Calls (Human Tone)",
                        "Multi-language Support (8+ Langs)",
                        "WhatsApp Fallback Automation",
                        "Smart Carrier Optimization",
                        "Real-time Dashboard & Analytics",
                        "Zero Setup & Onboarding Fees"
                     ].map((f, i) => (
                        <li key={i} className="flex items-center gap-4">
                           <CheckCircle2 size={24} className={isDark ? 'text-violet-400' : 'text-blue-600'} />
                           <span className={`font-bold ${theme.heading}`}>{f}</span>
                        </li>
                     ))}
                  </ul>

                  <button className={`w-full py-5 rounded-[2rem] font-black text-xl transition-all active:scale-95 shadow-2xl ${theme.primaryBtn}`}>
                     Start Saving Now
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}
