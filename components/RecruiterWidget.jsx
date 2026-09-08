"use client";
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function RecruiterWidgetContent() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const role = mounted ? (searchParams?.get('role')?.toLowerCase() || '') : '';

  // Default content
  let bullets = [
    "23+ technology ventures built and scaled.",
    "Led engineering & operations with 99% uptime.",
    "Deep expertise in AI, Systems Architecture, and Data."
  ];
  let resumeLink = "#"; 
  
  if (role === 'data') {
    bullets = [
      "Reduced manual data workflows by 34% using agentic pipelines.",
      "Decreased time-to-hire by 40% with AI automation models.",
      "Architected scalable, self-hosted LLM solutions."
    ];
  } else if (role === 'sales') {
    bullets = [
      "Accelerated growth through strategic technical sales.",
      "Consistently achieved 40%+ process efficiency gains.",
      "Bridged complex tech and business needs for enterprise clients."
    ];
  } else if (role === 'swe' || role === 'software') {
    bullets = [
      "Engineered full-stack features from ideation to production.",
      "Architected self-hosted agentic workflows using LangChain.",
      "Maintained 99%+ system uptime across infrastructure."
    ];
  }

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-5 py-3 rounded-full shadow-lg shadow-brand-500/30 transition-transform hover:scale-105"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
        </span>
        <span className="font-semibold text-sm">Recruiter TL;DR</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-zinc-950/40 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Panel */}
      <div 
        className={`fixed inset-y-0 right-0 z-[70] w-full sm:w-96 bg-white dark:bg-zinc-900 shadow-2xl border-l border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100">
              Why hire Vikash?
            </h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-2 rounded-full"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="space-y-8">
              <div>
                <h3 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Impact & Highlights
                </h3>
                <ul className="space-y-4">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-palette-secondary dark:text-zinc-300 leading-relaxed font-medium">
                      <svg className="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold text-brand-600 dark:text-brand-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <a 
                    href={resumeLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-palette-primary dark:text-zinc-200 px-4 py-3.5 rounded-lg font-semibold transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Resume
                  </a>
                  <a 
                    href="mailto:vktofly@gmail.com" 
                    className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-4 py-3.5 rounded-lg font-semibold transition-colors shadow-sm"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book an Intro Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function RecruiterWidget() {
  return (
    <Suspense fallback={null}>
      <RecruiterWidgetContent />
    </Suspense>
  );
}
