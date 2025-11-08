/**
 * Analytics Utility
 * 
 * Tracks section views and user interactions.
 * Can be extended to integrate with analytics services like Google Analytics, Plausible, etc.
 */

// Track section views
export function trackSectionView(sectionId, sectionName) {
  if (typeof window === "undefined") return;

  // Store in localStorage for simple tracking
  const views = JSON.parse(localStorage.getItem("sectionViews") || "{}");
  views[sectionId] = (views[sectionId] || 0) + 1;
  localStorage.setItem("sectionViews", JSON.stringify(views));

  // Track timestamp
  const timestamps = JSON.parse(localStorage.getItem("sectionViewTimestamps") || "{}");
  if (!timestamps[sectionId]) {
    timestamps[sectionId] = [];
  }
  timestamps[sectionId].push(new Date().toISOString());
  localStorage.setItem("sectionViewTimestamps", JSON.stringify(timestamps));

  // Send to analytics service (if configured)
  if (typeof window.gtag !== "undefined") {
    // Google Analytics 4
    window.gtag("event", "section_view", {
      section_id: sectionId,
      section_name: sectionName,
    });
  }

  if (typeof window.plausible !== "undefined") {
    // Plausible Analytics
    window.plausible("Section View", {
      props: { section: sectionName },
    });
  }

  // Custom analytics endpoint (if you have one)
  if (process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "section_view",
        sectionId,
        sectionName,
        timestamp: new Date().toISOString(),
      }),
    }).catch(() => {
      // Silently fail if analytics endpoint is unavailable
    });
  }
}

// Get section view statistics
export function getSectionViewStats() {
  if (typeof window === "undefined") return {};

  const views = JSON.parse(localStorage.getItem("sectionViews") || "{}");
  const timestamps = JSON.parse(localStorage.getItem("sectionViewTimestamps") || "{}");

  const stats = Object.keys(views).map((sectionId) => ({
    sectionId,
    viewCount: views[sectionId],
    lastViewed: timestamps[sectionId]?.[timestamps[sectionId].length - 1],
    totalViews: timestamps[sectionId]?.length || 0,
  }));

  // Sort by view count (most viewed first)
  return stats.sort((a, b) => b.viewCount - a.viewCount);
}

// Track page view
export function trackPageView(path) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID, {
      page_path: path,
    });
  }

  if (typeof window.plausible !== "undefined") {
    window.plausible("pageview");
  }
}

// Track custom event
export function trackEvent(eventName, eventData = {}) {
  if (typeof window === "undefined") return;

  if (typeof window.gtag !== "undefined") {
    window.gtag("event", eventName, eventData);
  }

  if (typeof window.plausible !== "undefined") {
    window.plausible(eventName, { props: eventData });
  }
}

// Clear analytics data (for privacy/testing)
export function clearAnalyticsData() {
  if (typeof window === "undefined") return;

  localStorage.removeItem("sectionViews");
  localStorage.removeItem("sectionViewTimestamps");
}

