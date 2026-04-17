'use client';

import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete?.(), 300);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#030014] z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-2xl animate-pulse">
            <img src="/images/logo.png" alt="Autoship Logo" className="w-full h-full object-contain" />
          </div>
          <div className="absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 animate-ping opacity-20"></div>
        </div>

        <h1 className="text-3xl font-black text-white mb-4 tracking-tighter">Autoship</h1>

        <div className="w-48 h-1 mx-auto bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-slate-400 mt-4 font-medium">Loading amazing experiences...</p>
      </div>
    </div>
  );
}
