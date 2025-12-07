'use client';

import { useState, useEffect } from 'react';

// SEO monitoring and reporting component
export default function SEOMonitor() {
  const [seoMetrics, setSeoMetrics] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development or with debug parameter
    const shouldShow = process.env.NODE_ENV === 'development' ||
                      new URLSearchParams(window.location.search).get('seo_debug') === 'true';

    if (!shouldShow) return;

    setIsVisible(true);

    // Collect SEO metrics
    const collectMetrics = () => {
      const metrics = {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        title: document.title,
        metaDescription: document.querySelector('meta[name="description"]')?.content || '',
        canonical: document.querySelector('link[rel="canonical"]')?.href || '',
        ogTitle: document.querySelector('meta[property="og:title"]')?.content || '',
        ogDescription: document.querySelector('meta[property="og:description"]')?.content || '',
        ogImage: document.querySelector('meta[property="og:image"]')?.content || '',
        twitterCard: document.querySelector('meta[name="twitter:card"]')?.content || '',
        structuredData: [],
        headings: {
          h1: document.querySelectorAll('h1').length,
          h2: document.querySelectorAll('h2').length,
          h3: document.querySelectorAll('h3').length,
          total: document.querySelectorAll('h1, h2, h3, h4, h5, h6').length
        },
        images: {
          total: document.querySelectorAll('img').length,
          withAlt: document.querySelectorAll('img[alt]').length,
          withoutAlt: document.querySelectorAll('img:not([alt])').length
        },
        links: {
          internal: document.querySelectorAll('a[href^="/"]').length,
          external: document.querySelectorAll('a[href^="http"]:not([href*="' + window.location.origin + '"])').length,
          total: document.querySelectorAll('a').length
        },
        performance: {
          loadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,
          domContentLoaded: performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart,
          firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
          largestContentfulPaint: performance.getEntriesByType('largest-contentful-paint')[0]?.startTime || 0
        }
      };

      // Collect structured data
      document.querySelectorAll('script[type="application/ld+json"]').forEach(script => {
        try {
          const data = JSON.parse(script.textContent);
          metrics.structuredData.push({
            type: data['@type'] || 'Unknown',
            name: data.name || data.headline || 'Unnamed'
          });
        } catch (e) {
          // Invalid JSON-LD
        }
      });

      setSeoMetrics(metrics);
    };

    // Collect metrics after page load
    if (document.readyState === 'complete') {
      collectMetrics();
    } else {
      window.addEventListener('load', collectMetrics);
    }

    // Keyboard shortcut to toggle visibility (Ctrl+Shift+S)
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-black text-green-400 font-mono text-xs p-4 rounded-lg border border-green-400 shadow-lg max-h-96 overflow-auto">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-green-300 font-bold">SEO Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-green-600 hover:text-green-300"
        >
          ✕
        </button>
      </div>

      {seoMetrics && (
        <div className="space-y-2">
          <div>
            <strong>URL:</strong> {seoMetrics.url}
          </div>
          <div>
            <strong>Title:</strong> {seoMetrics.title?.substring(0, 50)}...
          </div>
          <div>
            <strong>Meta Desc:</strong> {seoMetrics.metaDescription?.substring(0, 50)}...
          </div>
          <div>
            <strong>Headings:</strong> H1:{seoMetrics.headings.h1} H2:{seoMetrics.headings.h2} H3:{seoMetrics.headings.h3}
          </div>
          <div>
            <strong>Images:</strong> {seoMetrics.images.withAlt}/{seoMetrics.images.total} with alt
          </div>
          <div>
            <strong>Links:</strong> {seoMetrics.links.internal} internal, {seoMetrics.links.external} external
          </div>
          <div>
            <strong>Structured Data:</strong> {seoMetrics.structuredData.length} schemas
            {seoMetrics.structuredData.map((sd, i) => (
              <div key={i} className="ml-2">• {sd.type}: {sd.name}</div>
            ))}
          </div>
          <div>
            <strong>Performance:</strong>
            <div className="ml-2">
              Load: {seoMetrics.performance.loadTime}ms<br/>
              LCP: {Math.round(seoMetrics.performance.largestContentfulPaint)}ms
            </div>
          </div>
        </div>
      )}

      <div className="mt-2 pt-2 border-t border-green-600">
        <div className="text-green-600">Ctrl+Shift+S to toggle</div>
      </div>
    </div>
  );
}

// Export SEO validation utilities
export const validateSEO = (content) => {
  const issues = [];

  // Check title length
  if (!content.title || content.title.length < 30) {
    issues.push('Title too short (< 30 chars)');
  }
  if (content.title && content.title.length > 60) {
    issues.push('Title too long (> 60 chars)');
  }

  // Check meta description
  if (!content.description || content.description.length < 120) {
    issues.push('Meta description too short (< 120 chars)');
  }
  if (content.description && content.description.length > 160) {
    issues.push('Meta description too long (> 160 chars)');
  }

  // Check for H1
  if (!content.h1 || content.h1 === 0) {
    issues.push('Missing H1 tag');
  }

  // Check images
  if (content.imagesWithoutAlt > 0) {
    issues.push(`${content.imagesWithoutAlt} images missing alt text`);
  }

  return issues;
};
