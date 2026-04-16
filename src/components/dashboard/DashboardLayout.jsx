'use client';

import { DashboardProvider, useDashboard } from '@/contexts/DashboardContext';
import AuthGuard from '@/components/dashboard/AuthGuard';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';

function DashboardShell({ role, children }) {
  const { isDark, sidebarOpen, setSidebarOpen } = useDashboard();

  return (
    <div className={isDark ? 'dark' : ''}>
      {/* Ambient glows — match home page style */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        {isDark && (
          <>
            <div className="absolute top-[-10%] left-[50%] -translate-x-1/2 w-[800px] h-[500px] bg-violet-600 opacity-[0.04] blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600 opacity-[0.04] blur-[120px] rounded-full" />
          </>
        )}
      </div>

      <div className={`relative flex min-h-screen transition-colors duration-500 ${
        isDark ? 'bg-[#030014] text-slate-300' : 'bg-slate-50 text-slate-600'
      }`}>
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-20 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <DashboardSidebar role={role} />

        <div className="flex-1 flex flex-col min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ role, children }) {
  return (
    <DashboardProvider>
      <AuthGuard allowedRole={role}>
        <DashboardShell role={role}>
          {children}
        </DashboardShell>
      </AuthGuard>
    </DashboardProvider>
  );
}
