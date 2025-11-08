/**
 * Skeleton Loader Components
 * 
 * Provides skeleton loaders for different content types to improve perceived performance.
 */

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 animate-pulse">
      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-4" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full mb-2" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
    </div>
  );
}

export function SkeletonProjectCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-zinc-200 dark:bg-zinc-800" />
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full" />
        <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
        <div className="flex gap-2 mt-4">
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
          <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-14" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 animate-pulse">
      <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-24 mb-4" />
      <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-3/4 mb-3" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full mb-2" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6 mb-4" />
      <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-20" />
    </div>
  );
}

export function SkeletonTimelineItem() {
  return (
    <div className="relative animate-pulse">
      {/* Timeline dot skeleton */}
      <div className="absolute left-0 sm:left-8 -translate-x-1/2 sm:translate-x-0 top-6 z-10">
        <div className="w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-800" />
      </div>
      {/* Content skeleton */}
      <div className="ml-10 sm:ml-16">
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex-1 space-y-2">
              <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded w-2/3" />
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2" />
            </div>
          </div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-full mb-2" />
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 3, CardComponent = SkeletonCard }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <CardComponent key={index} />
      ))}
    </div>
  );
}

export function SkeletonText({ lines = 3, className = "" }) {
  return (
    <div className={`space-y-2 animate-pulse ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`h-4 bg-zinc-200 dark:bg-zinc-800 rounded ${
            index === lines - 1 ? "w-5/6" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

export default function SkeletonLoader({ type = "card", count = 1, ...props }) {
  const components = {
    card: SkeletonCard,
    project: SkeletonProjectCard,
    blog: SkeletonBlogCard,
    timeline: SkeletonTimelineItem,
    text: SkeletonText,
  };

  const Component = components[type] || SkeletonCard;

  if (count > 1) {
    return <SkeletonGrid count={count} CardComponent={Component} />;
  }

  return <Component {...props} />;
}

