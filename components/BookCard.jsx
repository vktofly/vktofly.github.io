"use client";

import Link from "next/link";
import Image from "next/image";

// Badge icons mapping
const categoryIcons = {
  epistemology: "📚",
  philosophy: "🧠",
  ai: "🤖",
  systems: "⚙️",
  entrepreneurship: "💼",
  physics: "⚛️",
  default: "📖",
};

// Reading status styles - Refined for a more professional look
const readingStatusStyles = {
  "want-to-read":
    "bg-zinc-100/90 text-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
  reading:
    "bg-blue-50/90 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "re-reading":
    "bg-purple-50/90 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  mastered:
    "bg-emerald-50/90 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
  read: "bg-zinc-50/90 text-zinc-600 dark:bg-zinc-800/90 dark:text-zinc-400 border-zinc-200 dark:border-zinc-700",
};

// Impact visualization - cleaner dots style
function ImpactIndicator({ impact }) {
  if (!impact) return null;

  const impactMap = {
    high: { count: 3, label: "High Impact" },
    medium: { count: 2, label: "Medium Impact" },
    low: { count: 1, label: "Low Impact" },
  };

  const { count, label } = impactMap[impact] || { count: 0, label: "" };

  return (
    <div className="flex flex-col gap-0.5" title={label}>
      <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500 dark:text-zinc-400">
        Impact
      </span>
      <div className="flex gap-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              i < count
                ? "bg-brand-500 dark:bg-brand-400"
                : "bg-zinc-200 dark:bg-zinc-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function BookCard({ book }) {
  // Determine badges based on book properties
  const badges = [];
  if (book.paradigmShift)
    badges.push({ label: "Paradigm Shift", color: "purple" });
  if (book.impact === "high" && !book.paradigmShift)
    badges.push({ label: "Foundation", color: "blue" });
  if (book.knowledgeCompounding)
    badges.push({ label: "Compounding", color: "green" });
  if (book.paradigmShift && book.category === "philosophy")
    badges.push({ label: "Questioning", color: "amber" });

  const categoryIcon = categoryIcons[book.category] || categoryIcons.default;
  const readingStatus =
    readingStatusStyles[book.readingStatus] || readingStatusStyles.read;
  const hasBlog = !!book.blog;

  // Badge color helper
  const getBadgeStyle = (color) => {
    const styles = {
      purple:
        "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800",
      blue: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800",
      green:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-300 dark:border-emerald-800",
      amber:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800",
    };
    return styles[color] || styles.blue;
  };

  return (
    <article className="group h-full flex flex-col bg-white dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-brand-500/50 dark:hover:border-brand-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-brand-500/5 dark:hover:shadow-brand-900/10">
      {/* Header Section: Cover + Meta */}
      <div className="relative flex gap-4 sm:gap-5 border-b border-zinc-100 dark:border-zinc-800/50 p-4 sm:p-5">
        {/* Book Cover - Proper Book Cover Aspect Ratio (2:3 width:height) with Rounded Corners */}
        <div className="relative w-24 sm:w-32 flex-shrink-0 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden shadow-md">
          <div className="relative w-full pb-[150%]">
            <div className="absolute inset-0">
              {book.coverImage ? (
                <Image
                  src={book.coverImage}
                  alt={`${book.title} by ${book.author}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
                  unoptimized={book.coverImage.startsWith("http")}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl rounded-xl">
                  {categoryIcon}
                </div>
              )}
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent dark:from-black/20 pointer-events-none rounded-xl" />
            </div>
          </div>
        </div>

        {/* Header Content */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Top Row: Status */}
          <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
              {categoryIcon} {book.category}
            </span>
            {book.readingStatus && (
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold border backdrop-blur-md whitespace-nowrap ${readingStatus}`}
              >
                {book.readingStatus.replace("-", " ")}
              </span>
            )}
          </div>

          {/* Title & Author */}
          <div className="mb-3 flex-shrink-0">
            <h3 className="text-lg sm:text-xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-1.5 line-clamp-2">
              {book.title}
            </h3>
            <p className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
              by{" "}
              <span className="text-palette-primary dark:text-zinc-300 font-semibold">
                {book.author}
              </span>
            </p>
          </div>

          {/* Impact & Badges */}
          <div className="mt-auto pt-3 border-t border-zinc-200/50 dark:border-zinc-700/50 flex flex-wrap items-center justify-between gap-3">
            <ImpactIndicator impact={book.impact} />

            <div className="flex flex-wrap gap-1.5 justify-end">
              {badges.map((badge) => (
                <span
                  key={badge.label}
                  className={`px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border whitespace-nowrap ${getBadgeStyle(
                    badge.color
                  )}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body Content - Mini Summary */}
      {book.whyItMatters && (
        <div className="px-4 sm:px-5 pt-4 pb-3 flex flex-col flex-1">
          <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed line-clamp-3">
            {book.whyItMatters}
          </p>
        </div>
      )}

      {/* Footer Actions */}
      <div
        className={`${
          book.whyItMatters ? "pt-3" : "pt-4"
        } border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between gap-3 px-4 sm:px-5 pb-4 sm:pb-5`}
      >
        {book.yearRead && (
          <span className="text-xs font-medium text-zinc-400 dark:text-zinc-500 whitespace-nowrap">
            Read in {book.yearRead}
          </span>
        )}

        <div className="flex items-center gap-3 flex-shrink-0">
          {book.link && (
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-zinc-500 hover:text-brand-600 dark:text-zinc-400 dark:hover:text-brand-400 transition-colors whitespace-nowrap"
              title="View on Amazon/Source"
            >
              Source ↗
            </a>
          )}
          {hasBlog && (
            <Link
              href={`/books/${book.slug}/`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-50 dark:bg-brand-900/20 text-brand-600 dark:text-brand-400 text-xs font-semibold hover:bg-brand-100 dark:hover:bg-brand-900/30 transition-colors whitespace-nowrap"
            >
              Read Analysis
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
