'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Analytics() {
  // Use hooks unconditionally (React rules)
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Early return if we don't have the necessary context
    if (typeof window === 'undefined') return;
    // Google Analytics 4
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (GA_MEASUREMENT_ID && typeof window !== 'undefined') {
      // Load Google Analytics script if not already loaded
      if (!window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer.push(arguments);
        };

        window.gtag('js', new Date());
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_title: document.title,
          page_location: window.location.href,
          send_page_view: false, // We'll handle page views manually
        });
      }

      // Track page views
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: pathname + (searchParams.toString() ? `?${searchParams.toString()}` : ''),
      });
    }

    // Advanced tracking: Scroll depth
    const trackScrollDepth = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      // Track milestones
      const milestones = [25, 50, 75, 90];
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !window[`scroll_${milestone}`]) {
          window[`scroll_${milestone}`] = true;

          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${milestone}%`,
              value: milestone
            });
          }
        }
      });
    };

    // Track time on page
    let startTime = Date.now();
    const trackTimeOnPage = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      // Track time milestones (30s, 1m, 2m, 5m)
      const timeMilestones = [30, 60, 120, 300];
      timeMilestones.forEach(milestone => {
        if (timeSpent >= milestone && !window[`time_${milestone}`]) {
          window[`time_${milestone}`] = true;

          if (window.gtag) {
            window.gtag('event', 'time_on_page', {
              event_category: 'engagement',
              event_label: `${milestone}s`,
              value: milestone
            });
          }
        }
      });
    };

    // Add event listeners
    window.addEventListener('scroll', trackScrollDepth);
    const timeInterval = setInterval(trackTimeOnPage, 10000); // Check every 10 seconds

    // Track outbound links
    const trackOutboundLink = (url) => {
      if (window.gtag) {
        window.gtag('event', 'click', {
          event_category: 'outbound',
          event_label: url,
          transport_type: 'beacon'
        });
      }
    };

    // Add click tracking for external links
    const handleLinkClick = (e) => {
      const link = e.target.closest('a');
      if (link && link.href && !link.href.includes(window.location.origin)) {
        trackOutboundLink(link.href);
      }
    };

    document.addEventListener('click', handleLinkClick);

    // Track search queries (if on search page)
    if (pathname.includes('/search') || searchParams.get('search')) {
      const query = searchParams.get('search') || searchParams.get('q');
      if (query && window.gtag) {
        window.gtag('event', 'search', {
          search_term: query
        });
      }
    }

    // Cleanup
    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      clearInterval(timeInterval);
      document.removeEventListener('click', handleLinkClick);
    };
  }, [pathname, searchParams]);

  return null;
}

// SEO-focused event tracking utilities
export const trackEvent = (action, category, label = '', value = null) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
};

export const trackBlogInteraction = (postSlug, action, details = {}) => {
  trackEvent(action, 'blog_engagement', postSlug, null);

  // Additional structured tracking for blog posts
  if (window.gtag) {
    window.gtag('event', 'blog_interaction', {
      custom_map: {
        post_slug: postSlug,
        interaction_type: action,
        ...details
      }
    });
  }
};

export const trackContentEngagement = (contentType, contentId, engagementType) => {
  trackEvent(engagementType, 'content_engagement', `${contentType}:${contentId}`);
};
