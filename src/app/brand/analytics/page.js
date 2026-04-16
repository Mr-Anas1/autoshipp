'use client';

import DashboardHeader from '@/components/dashboard/DashboardHeader';

// TODO: Replace with GET /api/v1/brand/analytics
const COD_BREAKDOWN = [
  { label: 'Confirmed', value: 80, color: 'bg-emerald-500' },
  { label: 'Rejected', value: 10, color: 'bg-red-400' },
  { label: 'Fallback', value: 10, color: 'bg-amber-400' },
];

const SHIPPING_TIMELINE = [
  { stage: 'Order → Call Made', avg: '18 min' },
  { stage: 'Call Made → Confirmed', avg: '2.4 hrs' },
  { stage: 'Confirmed → Label', avg: '22 min' },
  { stage: 'Label → Shipped', avg: '6.1 hrs' },
  { stage: 'Shipped → Delivered', avg: '2.3 days' },
];

const MONTHLY_TREND = [62, 68, 71, 74, 78, 80, 80];
const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'];

export default function BrandAnalyticsPage() {
  const maxTrend = Math.max(...MONTHLY_TREND);

  return (
    <>
      <DashboardHeader title="Analytics" />
      <main className="flex-1 p-6 space-y-6 overflow-auto">

        {/* COD Confirmation Donut-style breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-5">COD Call Outcomes</h2>

            {/* Stacked bar */}
            <div className="flex h-8 rounded-xl overflow-hidden mb-4">
              {COD_BREAKDOWN.map((s) => (
                <div
                  key={s.label}
                  className={`${s.color} transition-all`}
                  style={{ width: `${s.value}%` }}
                  title={`${s.label}: ${s.value}%`}
                />
              ))}
            </div>

            <div className="space-y-2">
              {COD_BREAKDOWN.map((s) => (
                <div key={s.label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-sm ${s.color}`} />
                    <span className="text-slate-400">{s.label}</span>
                  </div>
                  <span className="font-semibold text-white">{s.value}%</span>
                </div>
              ))}
            </div>

            <p className="text-xs text-slate-500 mt-4">
              Based on {(1120).toLocaleString()} calls made this month.
            </p>
          </div>

          {/* Shipping timelines */}
          <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-white mb-5">Shipping Timeline Averages</h2>
            <div className="space-y-3">
              {SHIPPING_TIMELINE.map((t) => (
                <div key={t.stage} className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{t.stage}</span>
                  <span className="font-semibold text-violet-300">{t.avg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirmation rate trend */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-white mb-1">COD Confirmation Rate Trend</h2>
          <p className="text-xs text-slate-500 mb-5">Last 7 months</p>

          <div className="flex items-end gap-3 h-28">
            {MONTHLY_TREND.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-slate-400">{v}%</span>
                <div
                  className="w-full rounded-t-sm bg-violet-500/60 hover:bg-violet-500 transition-colors"
                  style={{ height: `${(v / maxTrend) * 80}%` }}
                />
                <span className="text-[10px] text-slate-500">{MONTHS[i]}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-emerald-400 mt-3">
            ↑ +18 pp improvement over 7 months
          </p>
        </div>
      </main>
    </>
  );
}
