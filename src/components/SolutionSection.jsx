import { PhoneCall, MessageCircle, Globe, Zap } from 'lucide-react';

export default function SolutionSection({ theme, isDark }) {
  return (
    <section id="solution" className="py-32">
       <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-24">
             <h2 className={`text-4xl md:text-6xl font-black ${theme.heading} tracking-tighter`}>Built for hyper-growth.</h2>
             <p className="text-xl text-slate-500 mt-6 font-medium">Verify, automate, and dominate the Indian market.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
             {/* AI CALLS */}
             <div className={`md:col-span-8 rounded-[2.5rem] p-12 border relative overflow-hidden flex flex-col justify-end transition-all ${theme.card}`}>
                <div className={`absolute top-0 right-0 p-12 opacity-10 ${theme.accent}`}><PhoneCall size={200} /></div>
                <div className="relative z-10 max-w-lg">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-white bg-gradient-to-br ${theme.accentGradient}`}>
                      <PhoneCall size={24} />
                   </div>
                   <h3 className={`text-3xl md:text-5xl font-black ${theme.heading} mb-6 leading-tight`}>AI Voice calls that feel human.</h3>
                   <p className="text-lg text-slate-500 font-medium">Our AI calls customers instantly in 8+ Indian languages. It confirms address, intent, and time preferences with 99% accuracy.</p>
                </div>
             </div>

             {/* WHATSAPP */}
             <div className={`md:col-span-4 rounded-[2.5rem] p-10 border transition-all flex flex-col justify-center ${theme.card}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-green-500/10 text-green-500`}>
                   <MessageCircle size={28} />
                </div>
                <h3 className={`text-2xl font-black ${theme.heading} mb-4`}>WhatsApp Fallback</h3>
                <p className="text-slate-500 font-medium leading-relaxed">Missed calls? No problem. We automatically trigger an interactive WhatsApp flow to secure the confirmation.</p>
             </div>

             {/* COURIER */}
             <div className={`md:col-span-6 rounded-[2.5rem] p-10 border transition-all flex items-center gap-8 ${theme.card}`}>
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 bg-blue-500/10 text-blue-500`}>
                   <Globe size={40} />
                </div>
                <div>
                  <h3 className={`text-2xl font-black ${theme.heading} mb-2`}>Smart Carrier Selection</h3>
                  <p className="text-slate-500 font-medium">Auto-selects best courier based on speed, cost, and historical RTO for that pincode.</p>
                </div>
             </div>

             {/* AUTOMATION */}
             <div className={`md:col-span-6 rounded-[2.5rem] p-10 border transition-all flex items-center gap-8 ${isDark ? 'bg-violet-600/10 border-violet-500/20' : 'bg-blue-600 text-white'}`}>
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center shrink-0 ${isDark ? 'bg-violet-500/20' : 'bg-white/20'}`}>
                   <Zap size={40} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black mb-2">Zero-Touch Dispatch</h3>
                  <p className="opacity-80 font-medium">Auto-tags Shopify orders and triggers labels instantly. No manual work required.</p>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}
