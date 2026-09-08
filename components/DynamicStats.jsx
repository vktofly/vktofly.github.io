"use client";
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import AnimatedStat from './AnimatedStat';

export default function DynamicStats() {
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const roleParam = mounted ? (searchParams?.get('role')?.toLowerCase() || '') : '';

  if (roleParam === 'data') {
    return (
      <>
        <AnimatedStat value="5" label="Years Experience" suffix="+" />
        <AnimatedStat value="40" label="% Faster Hiring via AI" suffix="%" />
        <AnimatedStat value="34" label="% Manual Work Reduced" suffix="%" />
        <AnimatedStat value="99" label="% System Uptime" suffix="+" />
      </>
    );
  } else if (roleParam === 'sales') {
    return (
      <>
        <AnimatedStat value="5" label="Years Experience" suffix="+" />
        <AnimatedStat value="23" label="Tech Ventures" suffix="+" />
        <AnimatedStat value="40" label="% Process Efficiency" suffix="%" />
        <AnimatedStat value="100" label="B2B Connections" suffix="+" />
      </>
    );
  } else if (roleParam === 'swe' || roleParam === 'software') {
    return (
      <>
        <AnimatedStat value="5" label="Years Experience" suffix="+" />
        <AnimatedStat value="34" label="% CI/CD Improvement" suffix="%" />
        <AnimatedStat value="99" label="% Uptime Maintained" suffix="+" />
        <AnimatedStat value="23" label="Tech Ventures" suffix="+" />
      </>
    );
  }

  return (
    <>
      <AnimatedStat value="2" label="Companies Founded" suffix="+" />
      <AnimatedStat value="5" label="Years Experience" suffix="+" />
      <AnimatedStat value="23" label="Tech Ventures Built" suffix="+" />
      <AnimatedStat value="99" label="% System Reliability" suffix="+" />
    </>
  );
}
