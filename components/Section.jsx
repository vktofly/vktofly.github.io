"use client";

import { useEffect, useRef } from "react";
import Container from "./Container";
import { trackSectionView } from "../lib/analytics";

export default function Section({
  id,
  title,
  intro,
  children,
  className = "",
  trackViews = true,
}) {
  const ref = useRef(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    if (!trackViews || !id || !title || hasTracked.current) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            trackSectionView(id, title);
            hasTracked.current = true;
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [id, title, trackViews]);

  return (
    <section ref={ref} id={id} className={`py-16 sm:py-20 print:py-8 ${className}`}>
      <Container>
        {title && (
          <div className="mb-10 sm:mb-12 print:mb-6">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 print:text-2xl print:page-break-after-avoid">
              {title}
            </h2>
            {intro && (
              <p className="mt-3 text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed print:text-base print:mt-2 print:page-break-after-avoid">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}


