import Link from 'next/link';

function formatPeriod(period) {
  if (!period) return '';
  // Extract years from period like "2005 — Present" or "2020 — 2023"
  const match = period.match(/(\d{4})/);
  return match ? match[1] : period;
}

export default function TimelinePreview({ items, maxItems = 4 }) {
  const displayItems = items.slice(0, maxItems);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
      
      <div className="space-y-6">
        {displayItems.map((item, index) => (
          <div key={index} className="relative flex gap-4 sm:gap-6">
            {/* Timeline dot */}
            <div className="hidden sm:block relative z-10">
              <div className="w-8 h-8 rounded-full bg-brand-500 border-4 border-white dark:border-zinc-950 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white" />
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 pt-1">
              <div className="text-xs font-semibold text-brand-600 dark:text-brand-400 mb-1">
                {formatPeriod(item.period)}
              </div>
              <h3 className="font-semibold text-base text-palette-primary mb-1">
                {item.role}
              </h3>
              <p className="text-sm text-palette-secondary mb-2">
                {item.company}
              </p>
              {item.summary && (
                <p className="text-sm text-palette-secondary leading-relaxed">
                  {item.summary}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {items.length > maxItems && (
        <div className="mt-8 text-center">
          <Link
            href="/experience/"
            className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:underline font-medium text-sm"
          >
            View full timeline
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

