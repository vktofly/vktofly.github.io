'use client';

import { useEffect, useState, useRef } from 'react';

export default function AnimatedStat({ value, label, suffix = '' }) {
  const [displayValue, setDisplayValue] = useState(value === '∞' ? '∞' : 0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            animateValue();
            setHasAnimated(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasAnimated]);

  const animateValue = () => {
    // Handle infinity symbol - no animation needed
    if (value === '∞') {
      setDisplayValue('∞');
      return;
    }

    // Extract numeric value
    const numericValue = parseInt(value.replace(/\D/g, '')) || 0;
    if (numericValue === 0) {
      setDisplayValue(value);
      return;
    }

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = numericValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);
  };

  // Handle special cases like infinity symbol
  const displayText = value === '∞' || displayValue === '∞' ? '∞' : `${displayValue}${suffix}`;

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-brand-600 dark:text-brand-400 mb-2">
        {displayText}
      </div>
      <div className="text-sm sm:text-base text-palette-secondary">{label}</div>
    </div>
  );
}

