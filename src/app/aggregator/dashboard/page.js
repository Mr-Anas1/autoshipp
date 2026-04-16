'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';

// TODO: Replace with GET /api/v1/aggregator/dashboard
const STATS = [
  { label: 'Total Orders Routed', value: '24,381', sub: 'all time', color: 'violet' },
  { label: 'Brands via Connection', value: '12', sub: 'active brands', color: 'blue' },
  { label: 'Orders Today', value: '842', sub: 'last synced just now', color: 'emerald' },
  { label: 'System Uptime', value: '99.97%', sub: 'last 30 days', color: 'amber' },
];

const LATENCY = [12, 14, 11, 13, 10, 15, 12, 9, 11, 13, 14, 12, 10, 11, 13];

export default function AggregatorDashboard() {
  const maxL = Math.max(...LATENCY);

  return (
    <>
      <DashboardHeader title="Partner Overview" />
      <main className="flex-1 p-6 space-y-6 overflow-auto">

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Latency chart */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">API Latency (ms)</h2>
            <span className="text-xs text-slate-500">Avg: 12ms — last 15 requests</span>
          </div>
          <div className="flex items-end gap-1.5 h-24">
            {LATENCY.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-emerald-500/40 hover:bg-emerald-500/70 transition-colors"
                style={{ height: `${(v / maxL) * 100}%` }}
                title={`${v}ms`}
              />
            ))}
          </div>
        </div>

        {/* Quick status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-slate-500 mb-3">Endpoint Status</p>
            <div className="space-y-2 text-sm">
              {[
                { ep: 'POST /webhooks/orders', status: 'Operational' },
                { ep: 'POST /webhooks/updates', status: 'Operational' },
                { ep: 'GET /health', status: 'Operational' },
              ].map(({ ep, status }) => (
                <div key={ep} className="flex items-center justify-between">
                  <span className="font-mono text-xs text-slate-400">{ep}</span>
                  <span className="flex items-center gap-1.5 text-[11px] text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-slate-500 mb-3">This Month</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-slate-400">Webhooks received</span><span className="text-white font-mono">18,420</span></div>
              <div className="flex justify-between"><span className="text-slate-400">200 OK</span><span className="text-emerald-400 font-mono">18,204</span></div>
              <div className="flex justify-between"><span className="text-slate-400">4xx Errors</span><span className="text-red-400 font-mono">216</span></div>
              <div className="flex justify-between"><span className="text-slate-400">Error rate</span><span className="text-amber-400 font-mono">1.17%</span></div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const COLORS = {
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  emerald: 'text-emerald-400',
  amber: 'text-amber-400',
};

function StatCard({ label, value, sub, color }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <p className="text-xs text-slate-500 mb-2">{label}</p>
      <p className={`text-2xl font-bold ${COLORS[color]}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  );
}
