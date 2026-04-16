'use client';

import { useRouter } from 'next/navigation';
import { Sun, Moon, Menu, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useDashboard } from '@/contexts/DashboardContext';
import { cn } from '@/lib/utils';

export default function DashboardHeader({ title }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme, setSidebarOpen } = useDashboard();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.push('/login');
  }

  return (
    <header className={cn(
      'sticky top-0 z-10 h-16 flex items-center justify-between px-4 md:px-6 shrink-0 transition-colors duration-300',
      isDark
        ? 'bg-[#030014]/90 border-b border-white/[0.06] backdrop-blur-xl'
        : 'bg-white/90 border-b border-slate-200 backdrop-blur-xl shadow-sm'
    )}>
      {/* Left — hamburger + title */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className={cn(
            'md:hidden p-2 rounded-xl transition-colors',
            isDark ? 'text-slate-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
          )}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className={cn(
            'text-sm font-black tracking-widest uppercase',
            isDark ? 'text-white' : 'text-slate-900'
          )}>
            {title}
          </h1>
        </div>
      </div>

      {/* Right — theme toggle + user + logout */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={cn(
            'p-2 rounded-xl transition-all border',
            isDark
              ? 'bg-white/5 border-white/10 text-violet-400 hover:bg-white/10'
              : 'bg-slate-100 border-slate-200 text-blue-600 hover:bg-slate-200'
          )}
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* User email — hidden on small */}
        <span className={cn(
          'hidden sm:block text-xs font-medium max-w-[180px] truncate',
          isDark ? 'text-slate-400' : 'text-slate-500'
        )}>
          {user?.email}
        </span>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            'flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border transition-all',
            isDark
              ? 'border-white/10 text-slate-400 hover:text-white hover:border-white/20 hover:bg-white/5'
              : 'border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
          )}
        >
          <LogOut size={14} />
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  );
}
