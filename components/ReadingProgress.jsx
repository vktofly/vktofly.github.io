'use client';

import { useEffect, useState } from 'react';

export default function ReadingProgress({ targetId = 'article-content' }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = document.getElementById(targetId);
      if (!el) return setProgress(0);
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const passed = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? passed / total : 0);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [targetId]);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-0.5 bg-transparent">
      <div
        className="h-full bg-brand-500 transition-[width] duration-150 ease-out"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
}


