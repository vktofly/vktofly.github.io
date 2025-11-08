"use client";

import { useState, useEffect } from "react";
import SkeletonLoader from "./SkeletonLoader";

/**
 * Loading Wrapper Component
 * 
 * Shows skeleton loaders while content is loading.
 * Useful for async data fetching or route transitions.
 */
export default function LoadingWrapper({
  children,
  fallback,
  skeletonType = "card",
  skeletonCount = 3,
  delay = 300,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    // Minimum delay to prevent flash of skeleton
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Keep skeleton visible a bit longer for smooth transition
      setTimeout(() => setShowSkeleton(false), 200);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (showSkeleton) {
    return (
      fallback || (
        <SkeletonLoader type={skeletonType} count={skeletonCount} />
      )
    );
  }

  return <>{children}</>;
}

