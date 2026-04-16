'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';

// TODO: Replace hardcoded data with API calls to /api/v1/admin/* endpoints
const STATS = [
  { label: 'Orders Processed Today', value: '1,284', delta: '+12%', color: 'violet' },
  { label: 'Active Brands', value: '34', delta: '+2 this week', color: 'emerald' },
  { label: 'MRR (Est.)', value: '₹4.2L', delta: '+8% MoM', color: 'blue' },
  { label: 'Total RTOs Saved', value: '18,740', delta: 'all time', color: 'amber' },
];

// Sparkline data — orders per day for last 30 days
const CHART_DATA = [
  820, 932, 901, 934, 1290, 1330, 1320, 980, 860, 940,
  780, 1040, 1100, 950, 1200, 1340, 1280, 1190, 1320, 1450,
  1380, 1420, 1500, 1380, 1480, 1530, 1420, 1520, 1600, 1284,
];

const BRANDS_SUMMARY = [
  { name: 'FabIndia Direct', type: 'Direct', status: 'Active', orders: 3400 },
  { name: 'Pepperfry', type: 'Aggregator', status: 'Active', orders: 8200 },
  { name: 'HealthKart', type: 'Direct', status: 'Paused', orders: 1200 },
  { name: 'Bewakoof', type: 'Direct', status: 'Active', orders: 5100 },
];

export default function AdminDashboard() {
  const maxVal = Math.max(...CHART_DATA);

  return (
    <>
      <DashboardHeader title="System Overview" />
      <main className="flex-1 p-6 space-y-6 overflow-auto">

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {/* Order volume chart */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Order Volume — Last 30 Days</h2>
            <span className="text-xs text-slate-500">Live once API is connected</span>
          </div>
          <div className="flex items-end gap-1 h-36">
            {CHART_DATA.map((v, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-violet-500/40 hover:bg-violet-500/70 transition-colors"
                style={{ height: `${(v / maxVal) * 100}%` }}
                title={`Day ${i + 1}: ${v}`}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 text-[10px] text-slate-600">
            <span>30d ago</span><span>Today</span>
          </div>
        </div>

        {/* Quick brand snapshot */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Brand Snapshot</h2>
            <a href="/admin/brands" className="text-xs text-violet-400 hover:text-violet-300">View all →</a>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-500 border-b border-white/5">
                <th className="pb-2 font-medium">Brand</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 font-medium text-right">Orders</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {BRANDS_SUMMARY.map((b) => (
                <tr key={b.name} className="text-slate-300">
                  <td className="py-2.5">{b.name}</td>
                  <td className="py-2.5 text-slate-400">{b.type}</td>
                  <td className="py-2.5">
                    <StatusBadge status={b.status} />
                  </td>
                  <td className="py-2.5 text-right font-mono text-slate-300">{b.orders.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Global metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-slate-500 mb-1">Total Calls Made</p>
            <p className="text-2xl font-bold text-white">42,381</p>
          </div>
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
            <p className="text-xs text-slate-500 mb-1">Global Call Success Rate</p>
            <p className="text-2xl font-bold text-emerald-400">78.4%</p>
          </div>
        </div>
      </main>
    </>
  );
}

function StatCard({ label, value, delta, color }) {
  const colors = {
    violet: 'text-violet-400',
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
  };
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <p className="text-xs text-slate-500 mb-2">{label}</p>
      <p className={`text-2xl font-bold ${colors[color]}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{delta}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full
      ${status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-500/10 text-slate-400'}`}>
      <span className={`w-1 h-1 rounded-full ${status === 'Active' ? 'bg-emerald-400' : 'bg-slate-400'}`} />
      {status}
    </span>
  );
}
