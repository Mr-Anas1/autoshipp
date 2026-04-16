'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';

// TODO: Replace with GET /api/v1/brand/dashboard
const BIG_NUMBERS = [
  { label: 'RTOs Prevented This Month', value: '284', sub: 'vs 412 previous month', color: 'emerald' },
  { label: 'Money Saved (Est.)', value: '₹1.42L', sub: '@ ₹500 avg RTO cost', color: 'violet' },
  { label: 'Prepaid Conversions', value: '63', sub: 'COD → prepaid upsells', color: 'blue' },
  { label: 'Call Success Rate', value: '81%', sub: 'answered & confirmed', color: 'amber' },
];

// Funnel data
const FUNNEL = [
  { label: 'Orders Received', value: 1400, pct: 100 },
  { label: 'Calls Made', value: 1120, pct: 80 },
  { label: 'Confirmed', value: 897, pct: 64 },
  { label: 'Shipped', value: 880, pct: 63 },
  { label: 'Delivered', value: 820, pct: 59 },
];

export default function BrandDashboard() {
  return (
    <>
      <DashboardHeader title="Brand Dashboard" />
      <main className="flex-1 p-6 space-y-6 overflow-auto">

        {/* Big numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {BIG_NUMBERS.map((n) => (
            <BigNumberCard key={n.label} {...n} />
          ))}
        </div>

        {/* Funnel chart */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-5">Order Funnel</h2>
          <div className="space-y-2">
            {FUNNEL.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="w-36 shrink-0 text-xs text-slate-400">{step.label}</div>
                <div className="flex-1 h-7 bg-white/5 rounded-lg overflow-hidden relative">
                  <div
                    className="h-full rounded-lg transition-all"
                    style={{
                      width: `${step.pct}%`,
                      background: `linear-gradient(90deg, rgba(139,92,246,${0.8 - i * 0.12}), rgba(139,92,246,${0.4 - i * 0.06}))`,
                    }}
                  />
                  <span className="absolute inset-y-0 left-3 flex items-center text-xs text-white/80 font-medium">
                    {step.value.toLocaleString()}
                  </span>
                </div>
                <div className="w-10 text-right text-xs text-slate-500">{step.pct}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Trend note */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-5">
          <p className="text-sm text-emerald-300 font-medium mb-1">Great performance this month</p>
          <p className="text-xs text-slate-400">
            Your RTO rate dropped from <strong className="text-slate-200">29.4%</strong> to{' '}
            <strong className="text-slate-200">20.3%</strong> — Autoshipp prevented 128 additional returns
            compared to last month.
          </p>
        </div>
      </main>
    </>
  );
}

const COLORS = {
  emerald: 'text-emerald-400',
  violet: 'text-violet-400',
  blue: 'text-blue-400',
  amber: 'text-amber-400',
};

function BigNumberCard({ label, value, sub, color }) {
  return (
    <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-5">
      <p className="text-xs text-slate-500 mb-2">{label}</p>
      <p className={`text-2xl font-bold ${COLORS[color]}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1">{sub}</p>
    </div>
  );
}
