"use client";

import { useState } from "react";
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

// Badge colors for "Better Explanations" system
const badgeStyles = {
  "Paradigm Shift": "bg-purple-500/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 border-purple-500/20 dark:border-purple-600/30",
  Foundation: "bg-blue-500/10 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border-blue-500/20 dark:border-blue-600/30",
  Compounding: "bg-green-500/10 dark:bg-green-600/20 text-green-700 dark:text-green-400 border-green-500/20 dark:border-green-600/30",
  Questioning: "bg-amber-500/10 dark:bg-amber-600/20 text-amber-700 dark:text-amber-400 border-amber-500/20 dark:border-amber-600/30",
};

// Reading status styles
const readingStatusStyles = {
  "want-to-read": "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
  reading: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  "re-reading": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  mastered: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  read: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400",
};

// Impact visualization
function ImpactIndicator({ impact }) {
  if (!impact) return null;
  
  const impactMap = {
    high: { stars: 5, label: "High Impact" },
    medium: { stars: 3, label: "Medium Impact" },
    low: { stars: 1, label: "Low Impact" },
  };
  
  const { stars, label } = impactMap[impact] || { stars: 0, label: "" };
  
  return (
    <div className="flex items-center gap-1" title={label}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3 h-3 ${
            i < stars
              ? "text-amber-500 dark:text-amber-400 fill-current"
              : "text-zinc-300 dark:text-zinc-700"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function BookCard({ book }) {
  const [expandedWhy, setExpandedWhy] = useState(false);
  const [expandedInsights, setExpandedInsights] = useState(false);

  // Determine badges based on book properties
  const badges = [];
  if (book.paradigmShift) badges.push("Paradigm Shift");
  if (book.impact === "high" && !book.paradigmShift) badges.push("Foundation");
  if (book.knowledgeCompounding) badges.push("Compounding");
  if (book.paradigmShift && book.category === "philosophy") badges.push("Questioning");

  const categoryIcon = categoryIcons[book.category] || categoryIcons.default;
  const readingStatus = readingStatusStyles[book.readingStatus] || readingStatusStyles.read;
  
  // Check if book has a blog post
  const hasBlog = !!book.blog;

  return (
    <article className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg flex flex-col">
      {/* Book Cover Image */}
      {book.coverImage && (
        <div className="relative h-64 overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
          <Image
            src={book.coverImage}
            alt={`${book.title} by ${book.author}`}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            unoptimized={book.coverImage.startsWith("http")}
          />
          {/* Reading Status Badge */}
          {book.readingStatus && (
            <div className="absolute top-3 right-3">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm capitalize ${readingStatus}`}
              >
                {book.readingStatus.replace("-", " ")}
              </span>
            </div>
          )}
          {/* Impact Indicator */}
          {book.impact && (
            <div className="absolute top-3 left-3">
              <div className="px-2.5 py-1 rounded-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700">
                <ImpactIndicator impact={book.impact} />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Title and Author */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-2">
            {book.title}
          </h3>
          <p className="text-base font-medium text-palette-secondary dark:text-zinc-400">
            by {book.author}
          </p>
        </div>

        {/* Quote First (if available and no blog) */}
        {book.keyQuote && !hasBlog && (
          <blockquote className="mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800">
            <p className="text-lg font-medium text-palette-primary dark:text-zinc-200 italic leading-relaxed">
              "{book.keyQuote}"
            </p>
            <p className="mt-2 text-sm text-palette-secondary dark:text-zinc-500">
              — {book.author}
            </p>
          </blockquote>
        )}

        {/* Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Category Badge */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
            <span>{categoryIcon}</span>
            <span className="capitalize">{book.category}</span>
          </span>

          {/* Better Explanations Badges */}
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
            >
              {badge}
            </span>
          ))}

          {/* Knowledge Compounding Symbol */}
          {book.knowledgeCompounding && (
            <span className="px-2 py-1 text-lg" title="Knowledge Compounding">
              ∞
            </span>
          )}
        </div>

        {/* Year Read */}
        {book.yearRead && (
          <p className="text-xs text-palette-secondary dark:text-zinc-500 mb-4">
            Read in {book.yearRead}
          </p>
        )}

        {/* If book has blog, show minimal content */}
        {hasBlog ? (
          <>
            {/* Brief description if available */}
            {book.whyItMatters && (
              <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4 line-clamp-3">
                {book.whyItMatters}
              </p>
            )}
            {/* Link to blog post */}
            <div className="mb-4">
              <Link
                href={`/books/${book.slug}/`}
                className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
              >
                Read full review
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
          </>
        ) : (
          <>
            {/* Expandable "Why This Matters" */}
            {book.whyItMatters && (
              <div className="mb-4">
                <button
                  onClick={() => setExpandedWhy(!expandedWhy)}
                  className="w-full text-left flex items-center justify-between gap-2 text-sm font-semibold text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>Why This Matters</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedWhy ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedWhy && (
                  <p className="mt-2 text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                    {book.whyItMatters}
                  </p>
                )}
              </div>
            )}

            {/* Expandable Key Insights */}
            {book.keyInsights && book.keyInsights.length > 0 && (
              <div className="mb-4">
                <button
                  onClick={() => setExpandedInsights(!expandedInsights)}
                  className="w-full text-left flex items-center justify-between gap-2 text-sm font-semibold text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>Key Insights ({book.keyInsights.length})</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${expandedInsights ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {expandedInsights && (
                  <ul className="mt-2 space-y-2">
                    {book.keyInsights.map((insight, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed flex items-start gap-2"
                      >
                        <span className="text-brand-500 dark:text-brand-400 mt-1.5 flex-shrink-0">—</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Before/After Thinking (for transformative books) */}
            {book.beforeAfter && (
              <div className="mb-4 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                <p className="text-xs font-semibold text-palette-secondary dark:text-zinc-500 uppercase tracking-wide mb-2">
                  Transformation
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium text-palette-primary dark:text-zinc-300">Before: </span>
                    <span className="text-palette-secondary dark:text-zinc-400">{book.beforeAfter.before}</span>
                  </div>
                  <div>
                    <span className="font-medium text-palette-primary dark:text-zinc-300">After: </span>
                    <span className="text-palette-secondary dark:text-zinc-400">{book.beforeAfter.after}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Applied Knowledge Section */}
            {book.influencedProjects && book.influencedProjects.length > 0 && (
              <div className="mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-semibold text-palette-secondary dark:text-zinc-500 uppercase tracking-wide mb-2">
                  Applied Knowledge
                </p>
                <p className="text-sm text-palette-secondary dark:text-zinc-400">
                  Influenced: {book.influencedProjects.join(", ")}
                </p>
              </div>
            )}

            {/* Related Books */}
            {book.relatedBooks && book.relatedBooks.length > 0 && (
              <div className="mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-semibold text-palette-secondary dark:text-zinc-500 uppercase tracking-wide mb-2">
                  Related Books
                </p>
                <p className="text-sm text-palette-secondary dark:text-zinc-400">
                  See also: {book.relatedBooks.join(", ")}
                </p>
              </div>
            )}

            {/* Related Blog Posts */}
            {book.relatedPosts && book.relatedPosts.length > 0 && (
              <div className="mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-semibold text-palette-secondary dark:text-zinc-500 uppercase tracking-wide mb-2">
                  Related Reading
                </p>
                <div className="space-y-2">
                  {book.relatedPosts.map((postSlug) => {
                    const postTitles = {
                      'what-is-a-hero': 'What is a Hero? — On Universal Constructors and the Responsibility of Creation',
                    };
                    const postTitle = postTitles[postSlug] || postSlug;
                    return (
                      <Link
                        key={postSlug}
                        href={`/blog/${postSlug}/`}
                        className="inline-flex items-center gap-1.5 text-sm text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                      >
                        <span>{postTitle}</span>
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
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* Footer with Links */}
        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between gap-4">
          {book.link && (
            <a
              href={book.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              Purchase/Read
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          )}
          {hasBlog && (
            <Link
              href={`/books/${book.slug}/`}
              className="inline-flex items-center gap-2 text-sm font-medium text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Read Review
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
          )}
        </div>
      </div>
    </article>
  );
}

