'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm">
        <span className="opacity-0">Dark</span>
      </div>
    );
  }

  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDark = (resolvedTheme || theme) === 'dark';

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="inline-flex items-center justify-center rounded-md border border-zinc-300 dark:border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
    >
      {isDark ? 'Light' : 'Dark'}
    </button>
  );
}


