'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDashboard } from '@/contexts/DashboardContext';

const NAV = {
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard', icon: GridIcon },
    { label: 'Brands', href: '/admin/brands', icon: BuildingIcon },
    { label: 'Call Logs', href: '/admin/call-logs', icon: PhoneIcon },
    { label: 'Billing', href: '/admin/billing', icon: CreditCardIcon },
  ],
  brand: [
    { label: 'Dashboard', href: '/brand/dashboard', icon: GridIcon },
    { label: 'Orders', href: '/brand/orders', icon: BoxIcon },
    { label: 'Analytics', href: '/brand/analytics', icon: ChartIcon },
    { label: 'Settings', href: '/brand/settings', icon: SettingsIcon },
  ],
  aggregator: [
    { label: 'Dashboard', href: '/aggregator/dashboard', icon: GridIcon },
    { label: 'Webhooks', href: '/aggregator/webhooks', icon: WebhookIcon },
  ],
};

const ROLE_META = {
  admin: { label: 'Admin', color: 'from-red-500 to-orange-500' },
  brand: { label: 'Brand', color: 'from-violet-500 to-fuchsia-500' },
  aggregator: { label: 'Partner', color: 'from-emerald-500 to-teal-500' },
};

export default function DashboardSidebar({ role }) {
  const pathname = usePathname();
  const { isDark, sidebarOpen, setSidebarOpen } = useDashboard();
  const items = NAV[role] ?? [];
  const meta = ROLE_META[role];

  return (
    <aside className={cn(
      // Base
      'fixed md:static inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-300 ease-in-out',
      // Mobile show/hide
      sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
      // Theme
      isDark
        ? 'bg-[#060612] border-r border-white/[0.06]'
        : 'bg-white border-r border-slate-200 shadow-sm'
    )}>

      {/* Logo */}
      <div className={cn(
        'px-6 py-5 border-b flex items-center justify-between',
        isDark ? 'border-white/[0.06]' : 'border-slate-100'
      )}>
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform`}>
            <Zap size={16} fill="currentColor" />
          </div>
          <span className={cn(
            'text-lg font-black tracking-tight',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            Auto<span className="text-violet-400">shipp</span>
          </span>
        </Link>
        {/* Close on mobile */}
        <button
          className="md:hidden p-1 rounded-lg text-slate-400 hover:text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Role badge */}
      <div className="px-4 pt-4 pb-2">
        <div className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl',
          isDark ? 'bg-white/[0.04]' : 'bg-slate-50 border border-slate-100'
        )}>
          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${meta.color} animate-pulse`} />
          <span className={cn(
            'text-[11px] font-black uppercase tracking-widest',
            isDark ? 'text-slate-400' : 'text-slate-500'
          )}>
            {meta.label} Portal
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-2 space-y-0.5 overflow-y-auto">
        {items.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/');
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setSidebarOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 group relative',
                active
                  ? isDark
                    ? 'bg-violet-600/15 text-violet-300'
                    : 'bg-blue-50 text-blue-700'
                  : isDark
                    ? 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              )}
            >
              {/* Active indicator */}
              {active && (
                <span className={cn(
                  'absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full',
                  isDark ? 'bg-violet-400' : 'bg-blue-600'
                )} />
              )}
              <Icon className={cn(
                'w-4 h-4 shrink-0 transition-colors',
                active
                  ? isDark ? 'text-violet-400' : 'text-blue-600'
                  : 'text-current'
              )} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom — home link */}
      <div className={cn(
        'px-4 py-4 border-t',
        isDark ? 'border-white/[0.06]' : 'border-slate-100'
      )}>
        <Link
          href="/"
          className={cn(
            'flex items-center gap-2 text-xs font-bold px-3 py-2 rounded-xl transition-colors',
            isDark
              ? 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
          )}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to site
        </Link>
      </div>
    </aside>
  );
}

/* ── Inline SVG icons ── */
function GridIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  );
}
function BuildingIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}
function PhoneIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
    </svg>
  );
}
function CreditCardIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  );
}
function BoxIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  );
}
function ChartIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}
function SettingsIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 010 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 010-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}
function WebhookIcon({ className }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
  );
}
