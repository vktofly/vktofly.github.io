"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DynamicHero({ profile }) {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const roleParam = mounted ? (searchParams?.get('role')?.toLowerCase() || '') : '';

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

  return (
    <>
      <div className="space-y-5">
        <div className="space-y-3">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-palette-primary dark:text-white">
              {profile.name}
            </span>
          </h1>

          {exploringBadge && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-50/50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 text-brand-700 dark:text-brand-300 text-sm font-medium mt-4 animate-fade-in w-max">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-500"></span>
              </span>
              {exploringBadge}
            </div>
          )}

          <h2 className="sr-only">Who is Vikash?</h2>
          <p className="text-xl sm:text-2xl md:text-3xl font-medium text-palette-secondary dark:text-zinc-400 leading-relaxed mt-3">
            {roleTitle}
          </p>
        </div>
        <p className="text-lg sm:text-xl md:text-2xl text-palette-primary dark:text-zinc-200 font-light leading-relaxed max-w-2xl">
          {roleHeadline}
        </p>
      </div>

      <div className="prose-summary">
        <p className="text-base sm:text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl">
          {roleSummary}
        </p>
      </div>
    </>
  );
}
