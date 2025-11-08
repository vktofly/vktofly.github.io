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

function getTypeIcon(type) {
  const icons = {
    essay: "📝",
    paper: "📄",
    article: "📰",
    book: "📚",
    blog: "✍️",
  };
  return icons[type] || "📄";
}

export default function PublicationCard({ publication }) {
  return (
    <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg">
      <div className="flex items-start gap-4 mb-4">
        <div className="text-3xl flex-shrink-0">{getTypeIcon(publication.type)}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 uppercase tracking-wide">
              {publication.type}
            </span>
            {publication.publication && (
              <span className="text-sm text-palette-secondary dark:text-zinc-500">
                {publication.publication}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
            {publication.title}
          </h3>
          <div className="text-sm text-palette-secondary dark:text-zinc-500">
            {formatDate(publication.date)}
          </div>
        </div>
      </div>

      {publication.description && (
        <p className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
          {publication.description}
        </p>
      )}

      {publication.tags && publication.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {publication.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-secondary dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {publication.url && (
        <div className="flex items-center gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href={publication.url}
            target={publication.url.startsWith("http") ? "_blank" : undefined}
            rel={
              publication.url.startsWith("http")
                ? "noopener noreferrer"
                : undefined
            }
            className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1"
          >
            Read {publication.type === "book" ? "book" : publication.type === "paper" ? "paper" : "article"}
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

