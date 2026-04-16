'use client';

import { createContext, useContext, useEffect, useState } from 'react';

const DashboardContext = createContext({
  isDark: true,
  toggleTheme: () => {},
  sidebarOpen: false,
  setSidebarOpen: () => {},
});

export function DashboardProvider({ children }) {
  const [isDark, setIsDark] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dashboard-theme');
    if (saved !== null) setIsDark(saved === 'dark');
  }, []);

  function toggleTheme() {
    setIsDark((prev) => {
      const next = !prev;
      localStorage.setItem('dashboard-theme', next ? 'dark' : 'light');
      return next;
    });
  }

  return (
    <DashboardContext.Provider value={{ isDark, toggleTheme, sidebarOpen, setSidebarOpen }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}
