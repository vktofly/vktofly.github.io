'use client';

import { useState } from 'react';

export default function CollapsibleSection({ 
  title, 
  icon, 
  children, 
  defaultOpen = false,
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors text-left"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl sm:text-2xl">{icon}</span>}
          <h3 className="font-semibold text-base sm:text-lg text-palette-primary">
            {title}
          </h3>
        </div>
        <svg
          className={`w-5 h-5 text-palette-secondary transition-transform duration-200 flex-shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-4 sm:p-5 bg-white dark:bg-zinc-950">
          {children}
        </div>
      </div>
    </div>
  );
}

