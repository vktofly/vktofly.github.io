"use client";
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const ROLES = [
  { id: '', label: 'Polymath & Founder', icon: '✨' },
  { id: 'data', label: 'Data & AI Strategy', icon: '📊' },
  { id: 'swe', label: 'Software Engineering', icon: '⚡' },
  { id: 'sales', label: 'Technical Sales', icon: '💼' },
];

const RESUMES = {
  '': { href: '/my_resume/resume_ai_research_engineer.pdf', label: 'Resume (AI / Founder)' },
  'data': { href: '/my_resume/resume_ai_research_engineer.pdf', label: 'Resume (Data & AI)' },
  'swe': { href: '/my_resume/resume_ai_fullstack.pdf', label: 'Resume (Fullstack & AI)' },
  'sales': { href: '/my_resume/resume_automation_engineer.pdf', label: 'Resume (Tech Sales & Auto)' },
};

export default function DynamicHero({ profile }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  
  useEffect(() => {
    setMounted(true);
    const param = searchParams?.get('role')?.toLowerCase() || '';
    setSelectedRole(param);
  }, [searchParams]);

  const handleSelectRole = (roleId) => {
    setSelectedRole(roleId);
    
    // Update URL without page refresh
    const url = new URL(window.location.href);
    if (roleId) {
      url.searchParams.set('role', roleId);
    } else {
      url.searchParams.delete('role');
    }
    window.history.replaceState(null, '', url.toString());

    // Dispatch event so DynamicStats & other components sync immediately
    window.dispatchEvent(new CustomEvent('role-change', { detail: roleId }));
  };

  const roleParam = mounted ? selectedRole : '';

  let roleTitle = profile.role;
  let roleHeadline = profile.headline;
  let roleSummary = profile.summary;
  let exploringBadge = null;

  if (roleParam === 'data') {
    roleTitle = "Data Analyst & AI Strategist";
    roleHeadline = "Driving business decisions through data, AI, and robust statistical modeling.";
    roleSummary = "I specialize in transforming complex datasets into actionable insights, building predictive models, and deploying AI solutions that deliver measurable ROI.";
    exploringBadge = "Actively exploring Data Analytics & AI Strategy roles";
  } else if (roleParam === 'sales') {
    roleTitle = "Technical Sales & Revenue Strategist";
    roleHeadline = "Accelerating growth through strategic technical sales and relationship building.";
    roleSummary = "I bridge the gap between complex technical products and business needs, driving revenue through deep product knowledge and consultative selling.";
    exploringBadge = "Actively exploring Technical Sales & Account Executive roles";
  } else if (roleParam === 'swe' || roleParam === 'software') {
    roleTitle = "Software Engineer & Architect";
    roleHeadline = "Building scalable, high-performance systems and intelligent applications.";
    roleSummary = "I engineer robust software solutions using modern web technologies, AI integration, and systems design principles.";
    exploringBadge = "Actively exploring Software Engineering roles";
  }

  const activeResume = RESUMES[roleParam] || RESUMES[''];

  return (
    <div className="space-y-6">
      {/* 1-Click Recruiter Lens Switcher */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-palette-secondary dark:text-zinc-400">
          <span className="w-2 h-2 bg-palette-accent animate-pulse" />
          <span>Recruiter Lens:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {ROLES.map((r) => {
            const isActive = roleParam === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectRole(r.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-200 focus:outline-none border-2 ${
                  isActive
                    ? 'border-palette-primary bg-palette-primary text-white dark:border-white dark:bg-white dark:text-palette-primary'
                    : 'border-brand-200 dark:border-brand-800 bg-transparent text-palette-secondary dark:text-zinc-400 hover:border-palette-primary dark:hover:border-white hover:text-palette-primary dark:hover:text-white'
                }`}
              >
                <span>{r.icon}</span>
                <span>{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-3">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          <span className="text-palette-primary dark:text-white">
            {profile.name}
          </span>
        </h1>

        {exploringBadge && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-50/50 dark:bg-brand-900/50 border border-brand-200 dark:border-brand-800 text-palette-primary dark:text-white text-sm font-semibold tracking-wide uppercase animate-fade-in w-max">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full bg-palette-accent opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 bg-palette-accent"></span>
            </span>
            {exploringBadge}
          </div>
        )}

        <h2 className="sr-only">Who is Vikash?</h2>
        <p className="text-xl sm:text-2xl md:text-3xl font-medium text-palette-secondary dark:text-zinc-400 leading-relaxed">
          {roleTitle}
        </p>
      </div>

      <p className="text-lg sm:text-xl md:text-2xl text-palette-primary dark:text-zinc-200 font-light leading-relaxed max-w-2xl transition-all duration-300">
        {roleHeadline}
      </p>

      <div className="prose-summary">
        <p className="text-base sm:text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl transition-all duration-300">
          {roleSummary}
        </p>
      </div>

      {/* Tailored Resume Download Pill */}
      <div className="pt-1">
        <a
          href={activeResume.href}
          download
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold uppercase tracking-wide border-2 border-palette-primary dark:border-white bg-transparent hover:bg-palette-primary hover:text-white dark:hover:bg-white text-palette-primary dark:text-white dark:hover:text-palette-primary transition-colors duration-200"
        >
          <svg className="w-4 h-4 text-palette-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download {activeResume.label}</span>
        </a>
      </div>
    </div>
  );
}
