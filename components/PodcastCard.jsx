"use client";

import { useState } from "react";
import Link from "next/link";

// Category icons
const categoryIcons = {
  epistemology: "📚",
  philosophy: "🧠",
  ai: "🤖",
  systems: "⚙️",
  entrepreneurship: "💼",
  default: "🎙️",
};

function formatDate(date) {
  if (!date) return null;
  const dateObj = new Date(date);
  if (!isNaN(dateObj.getTime())) {
    return dateObj.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return date;
}

export default function PodcastCard({ podcast }) {
  const [expandedWhy, setExpandedWhy] = useState(false);
  const [expandedTakeaways, setExpandedTakeaways] = useState(false);

  const categoryIcon = categoryIcons[podcast.category] || categoryIcons.default;

  return (
    <article className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg flex flex-col">
      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🎙️</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 border border-brand-500/20 dark:border-brand-600/30">
              <span>{categoryIcon}</span>
              <span className="capitalize">{podcast.category}</span>
            </span>
          </div>
          <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-2">
            {podcast.title}
          </h3>
          <p className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
            Host: {podcast.host}
          </p>
          {podcast.date && (
            <p className="text-xs text-palette-secondary dark:text-zinc-500 mt-1">
              {formatDate(podcast.date)}
            </p>
          )}
        </div>

        {/* Description */}
        {podcast.description && (
          <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
            {podcast.description}
          </p>
        )}

        {/* Expandable "Why This Matters" */}
        {podcast.whyItMatters && (
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
                {podcast.whyItMatters}
              </p>
            )}
          </div>
        )}

        {/* Expandable Key Takeaways */}
        {podcast.keyTakeaways && podcast.keyTakeaways.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setExpandedTakeaways(!expandedTakeaways)}
              className="w-full text-left flex items-center justify-between gap-2 text-sm font-semibold text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <span>Key Takeaways ({podcast.keyTakeaways.length})</span>
              <svg
                className={`w-4 h-4 transition-transform ${expandedTakeaways ? "rotate-180" : ""}`}
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
            {expandedTakeaways && (
              <ul className="mt-2 space-y-2">
                {podcast.keyTakeaways.map((takeaway, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-brand-500 dark:text-brand-400 mt-1.5 flex-shrink-0">—</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Tags */}
        {podcast.tags && podcast.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {podcast.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-secondary dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
              >
                {tag}
              </span>
            ))}
            {podcast.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium text-palette-secondary dark:text-zinc-500">
                +{podcast.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer with Link */}
        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {podcast.link && (
            <a
              href={podcast.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              Listen
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
        </div>
      </div>
    </article>
  );
}

