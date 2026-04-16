import { Package, Activity, TrendingDown } from 'lucide-react';

export default function DashboardPreview({ theme, isDark }) {
  return (
    <section className="max-w-6xl mx-auto px-6 mb-32">
       <div className={`rounded-[2rem] border p-2 p-md-4 transition-all duration-700 ${isDark ? 'bg-white/5 border-white/10 shadow-[0_0_100px_rgba(139,92,246,0.1)]' : 'bg-white border-slate-200 shadow-2xl'}`}>
          <div className={`rounded-[1.5rem] overflow-hidden ${isDark ? 'bg-[#0a0a16]' : 'bg-slate-50'}`}>
             {/* Mock Header */}
             <div className={`h-14 flex items-center px-6 justify-between border-b ${isDark ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-white'}`}>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400/50" />
                  <div className="w-3 h-3 rounded-full bg-amber-400/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400/50" />
                </div>
                <div className={`text-xs font-bold uppercase tracking-widest ${isDark ? 'text-violet-400' : 'text-blue-600'}`}>Live Dispatch Engine</div>
             </div>
             {/* Mock Content */}
             <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity size={20} className={theme.accent} />
                    <h4 className={`font-bold ${theme.heading}`}>Active Verification Stream</h4>
                  </div>
                  {[
                    { id: "ORD-882", client: "Rajesh K.", type: "AI Voice", status: "Verified", val: "¥2,499", color: "text-emerald-500", bg: "bg-emerald-500/10" },
                    { id: "ORD-881", client: "Ananya S.", type: "WhatsApp", status: "Confirming", val: "¥1,200", color: "text-amber-500", bg: "bg-amber-500/10" },
                    { id: "ORD-880", client: "Unknown", type: "AI Voice", status: "Cancelled", val: "¥5,400", color: "text-red-500", bg: "bg-red-500/10" },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center justify-between p-5 rounded-2xl border transition-colors ${isDark ? 'bg-white/5 border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                             <Package size={20} className="text-slate-400" />
                          </div>
                          <div>
                             <div className={`font-bold ${theme.heading}`}>{item.id} - {item.client}</div>
                             <div className="text-xs text-slate-500">{item.type} Flow Triggered</div>
                          </div>
                       </div>
                       <div className="flex items-center gap-4">
                          <div className="text-right hidden sm:block">
                             <div className={`font-bold ${theme.heading}`}>{item.val}</div>
                             <div className="text-[10px] text-slate-500 uppercase font-bold">COD Order</div>
                          </div>
                          <div className={`px-4 py-1.5 rounded-full text-xs font-black uppercase ${item.bg} ${item.color}`}>
                             {item.status}
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                   <div className={`p-8 rounded-3xl border transition-all ${isDark ? 'bg-violet-600/10 border-violet-500/20' : 'bg-blue-600 text-white'}`}>
                      <div className="text-xs font-bold uppercase opacity-80 mb-2">Total Savings</div>
                      <div className="text-4xl font-black mb-4 tracking-tighter">¥84,200</div>
                      <div className="flex items-center gap-2 text-sm font-bold">
                         <TrendingDown size={16} /> 12% RTO Drop
                      </div>
                   </div>
                   <div className={`p-8 rounded-3xl border transition-all ${theme.card}`}>
                      <div className="text-xs font-bold text-slate-500 uppercase mb-2">Success Rate</div>
                      <div className={`text-4xl font-black mb-4 tracking-tighter ${theme.heading}`}>94.8%</div>
                      <div className={`h-2 w-full rounded-full overflow-hidden ${isDark ? 'bg-white/10' : 'bg-slate-100'}`}>
                         <div className={`h-full bg-gradient-to-r ${theme.accentGradient} w-[94.8%]`} />
                      </div>
                   </div>
                </div>
             </div>
          </div>
       </div>
    </section>
  );
}
