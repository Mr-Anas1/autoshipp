'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

export default function ForgotPasswordPage() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await resetPassword(email);
      setSent(true);
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        // Still show success to avoid user enumeration
        setSent(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#030014] flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold text-white tracking-tight">
            Auto<span className="text-violet-400">shipp</span>
          </span>
          <p className="mt-2 text-slate-400 text-sm">Reset your password</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white font-medium mb-1">Check your inbox</p>
              <p className="text-slate-400 text-sm">
                If an account exists for <strong className="text-slate-300">{email}</strong>, you&apos;ll
                receive a reset link shortly.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-block text-sm text-violet-400 hover:text-violet-300 transition"
              >
                Back to sign in
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}
              <p className="text-slate-400 text-sm mb-5">
                Enter your email and we&apos;ll send you a link to reset your password.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm text-slate-300 mb-1.5" htmlFor="email">
                    Email address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/60 focus:ring-1 focus:ring-violet-500/40 transition"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 rounded-xl text-sm transition-colors"
                >
                  {loading ? 'Sending…' : 'Send reset link'}
                </button>
                <p className="text-center text-sm text-slate-500">
                  Remember your password?{' '}
                  <Link href="/login" className="text-violet-400 hover:text-violet-300 transition">
                    Sign in
                  </Link>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
