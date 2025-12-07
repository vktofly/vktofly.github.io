'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals tracking
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Cumulative Layout Shift
        getCLS((metric) => {
          console.log('CLS:', metric);
          // Send to analytics
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'CLS',
              value: Math.round(metric.value * 1000),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // First Input Delay
        getFID((metric) => {
          console.log('FID:', metric);
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FID',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // First Contentful Paint
        getFCP((metric) => {
          console.log('FCP:', metric);
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'FCP',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // Largest Contentful Paint
        getLCP((metric) => {
          console.log('LCP:', metric);
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'LCP',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });

        // Time to First Byte
        getTTFB((metric) => {
          console.log('TTFB:', metric);
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              event_category: 'Web Vitals',
              event_label: 'TTFB',
              value: Math.round(metric.value),
              custom_map: { metric_value: metric.value }
            });
          }
        });
      });
    }

    // Resource loading performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 1000) { // Log slow resources
          console.warn('Slow resource:', entry.name, entry.duration + 'ms');
        }
      }
    });

    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  return null; // This component doesn't render anything
}
