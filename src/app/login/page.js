'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, ArrowLeft, Sun, Moon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isDark, setIsDark] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      const { auth, db } = await import('@/lib/firebase');
      const { doc, getDoc } = await import('firebase/firestore');
      const uid = auth.currentUser?.uid;
      let userRole = 'brand';
      if (uid) {
        const snap = await getDoc(doc(db, 'users', uid));
        if (snap.exists()) userRole = snap.data().role ?? 'brand';
      }
      const destinations = { admin: '/admin/dashboard', brand: '/brand/dashboard', aggregator: '/aggregator/dashboard' };
      router.push(destinations[userRole] ?? '/brand/dashboard');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ${isDark ? 'bg-[#030014]' : 'bg-slate-50'}`}>
      {/* Ambient glows */}
      {isDark && (
        <div className="pointer-events-none fixed inset-0 overflow-hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-violet-600 opacity-[0.08] blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600 opacity-[0.05] blur-[120px] rounded-full" />
        </div>
      )}

      {/* Nav */}
      <nav className={`relative z-10 flex items-center justify-between px-6 md:px-12 py-5 border-b ${
        isDark ? 'border-white/[0.06]' : 'border-slate-200'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <Zap size={18} fill="currentColor" />
          </div>
          <span className={`text-xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
            Auto<span className="text-violet-400">shipp</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className={`p-2.5 rounded-full border transition-all ${
              isDark ? 'bg-white/5 border-white/10 text-violet-400 hover:bg-white/10' : 'bg-white border-slate-200 text-blue-600 hover:bg-slate-100'
            }`}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <Link
            href="/"
            className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-full border transition-all ${
              isDark ? 'border-white/10 text-slate-300 hover:text-white hover:border-white/20' : 'border-slate-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowLeft size={14} /> Home
          </Link>
        </div>
      </nav>

      {/* Main */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="relative w-full max-w-md">
          {/* Header text */}
          <div className="text-center mb-8">
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-5 text-xs font-black uppercase tracking-widest ${
              isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-blue-50 border-blue-100 text-blue-600'
            }`}>
              Secure Sign-in
            </div>
            <h1 className={`text-3xl md:text-4xl font-black tracking-tighter ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Welcome back
            </h1>
            <p className={`mt-2 text-sm font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Sign in to your Autoshipp portal
            </p>
          </div>

          {/* Card */}
          <div className={`relative rounded-3xl border p-8 transition-all duration-300 ${
            isDark
              ? 'bg-white/[0.03] border-white/10 backdrop-blur-md'
              : 'bg-white border-slate-200 shadow-xl'
          }`}>
            {/* Top gradient line */}
            <div className={`absolute top-0 inset-x-0 h-px rounded-t-3xl ${
              isDark
                ? 'bg-gradient-to-r from-transparent via-violet-500/40 to-transparent'
                : 'bg-gradient-to-r from-transparent via-blue-400/40 to-transparent'
            }`} />

            {error && (
              <div className="mb-5 px-4 py-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium border focus:outline-none focus:ring-2 transition ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-violet-500/60 focus:ring-violet-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-500/20'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-black uppercase tracking-widest mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={`w-full rounded-xl px-4 py-3 text-sm font-medium border focus:outline-none focus:ring-2 transition ${
                    isDark
                      ? 'bg-white/5 border-white/10 text-white placeholder-slate-500 focus:border-violet-500/60 focus:ring-violet-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-blue-500/20'
                  }`}
                />
              </div>

              <div className="flex justify-end">
                <Link
                  href="/forgot-password"
                  className={`text-xs font-bold transition ${isDark ? 'text-violet-400 hover:text-violet-300' : 'text-blue-600 hover:text-blue-500'}`}
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full font-black py-3 rounded-2xl text-sm transition-all active:scale-95 shadow-lg disabled:opacity-60 disabled:cursor-not-allowed ${
                  isDark
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-500/20'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/20'
                }`}
              >
                {loading ? 'Signing in…' : 'Sign in →'}
              </button>
            </form>
          </div>

          <p className={`text-center mt-6 text-xs font-medium ${isDark ? 'text-slate-600' : 'text-slate-400'}`}>
            © {new Date().getFullYear()} Autoshipp Technologies
          </p>
        </div>
      </div>
    </div>
  );
}

function friendlyError(code) {
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Check your connection.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
