"use client";

import { useEffect, useRef } from "react";
import { trackSectionView } from "../lib/analytics";

/**
 * Section Tracker Component
 * 
 * Tracks when a section comes into view using Intersection Observer.
 * Automatically logs section views to analytics.
 */
export default function SectionTracker({
  sectionId,
  sectionName,
  children,
  threshold = 0.3,
}) {
  const ref = useRef(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView(sectionId, sectionName);
            hasTracked.current = true;
          }
        });
      },
      {
        threshold,
        rootMargin: "-50px 0px", // Start tracking when section is 50px into viewport
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionId, sectionName, threshold]);

  return <section ref={ref}>{children}</section>;
}

