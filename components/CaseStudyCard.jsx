import Link from "next/link";

function formatDate(date) {
  if (!date) return "";
  if (typeof date === "string") {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    }
    return date;
  }
  return String(date);
}

export default function CaseStudyCard({ caseStudy }) {
  return (
    <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg">
      <div className="mb-4">
        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 uppercase tracking-wide">
          Case Study
        </span>
      </div>

      <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {caseStudy.title}
      </h3>

      <div className="text-sm text-palette-secondary dark:text-zinc-500 mb-4">
        {caseStudy.client} • {formatDate(caseStudy.date)}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <h4 className="text-sm font-semibold text-palette-primary dark:text-zinc-200 mb-1">
            Challenge
          </h4>
          <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
            {caseStudy.challenge}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-palette-primary dark:text-zinc-200 mb-1">
            Solution
          </h4>
          <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
            {caseStudy.solution}
          </p>
        </div>
      </div>

      {caseStudy.results && caseStudy.results.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-palette-primary dark:text-zinc-200 mb-2">
            Results
          </h4>
          <ul className="space-y-1.5">
            {caseStudy.results.map((result, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-sm text-palette-secondary dark:text-zinc-400"
              >
                <span className="text-brand-500 dark:text-brand-400 mt-1 flex-shrink-0">
                  ✓
                </span>
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {caseStudy.metrics && (
        <div className="mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Object.entries(caseStudy.metrics).map(([key, value]) => (
              <div key={key} className="text-center sm:text-left">
                <div className="text-xs font-medium text-palette-secondary dark:text-zinc-500 uppercase tracking-wide mb-1">
                  {key}
                </div>
                <div className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {caseStudy.url && (
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href={caseStudy.url}
            className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1"
          >
            View case study
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}

