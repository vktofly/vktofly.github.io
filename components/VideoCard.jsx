"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Type icons and styles
const typeStyles = {
  TED: {
    icon: "🎤",
    badge: "bg-red-500/10 dark:bg-red-600/20 text-red-700 dark:text-red-400 border-red-500/20 dark:border-red-600/30",
  },
  Lecture: {
    icon: "📚",
    badge: "bg-blue-500/10 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border-blue-500/20 dark:border-blue-600/30",
  },
  Documentary: {
    icon: "🎬",
    badge: "bg-purple-500/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 border-purple-500/20 dark:border-purple-600/30",
  },
  default: {
    icon: "▶️",
    badge: "bg-zinc-500/10 dark:bg-zinc-600/20 text-zinc-700 dark:text-zinc-400 border-zinc-500/20 dark:border-zinc-600/30",
  },
};

// Category icons
const categoryIcons = {
  epistemology: "📚",
  philosophy: "🧠",
  ai: "🤖",
  systems: "⚙️",
  entrepreneurship: "💼",
  default: "🎥",
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

export default function VideoCard({ video }) {
  const [expandedWhy, setExpandedWhy] = useState(false);
  const [expandedInsights, setExpandedInsights] = useState(false);

  const typeStyle = typeStyles[video.type] || typeStyles.default;
  const categoryIcon = categoryIcons[video.category] || categoryIcons.default;

  return (
    <article className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg flex flex-col">
      {/* Video Thumbnail */}
      {video.thumbnail && (
        <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
          <Image
            src={video.thumbnail}
            alt={video.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            unoptimized={video.thumbnail.startsWith("http")}
          />
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border backdrop-blur-sm ${typeStyle.badge}`}>
              <span>{typeStyle.icon}</span>
              <span>{video.type}</span>
            </span>
          </div>
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-white/90 dark:bg-zinc-900/90 flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-brand-600 dark:text-brand-400 ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 border border-brand-500/20 dark:border-brand-600/30">
              <span>{categoryIcon}</span>
              <span className="capitalize">{video.category}</span>
            </span>
          </div>
          <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-2">
            {video.title}
          </h3>
          <p className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
            {video.speaker}
          </p>
          {video.date && (
            <p className="text-xs text-palette-secondary dark:text-zinc-500 mt-1">
              {formatDate(video.date)}
            </p>
          )}
        </div>

        {/* Description */}
        {video.description && (
          <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
            {video.description}
          </p>
        )}

        {/* Expandable "Why This Matters" */}
        {video.whyItMatters && (
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
                {video.whyItMatters}
              </p>
            )}
          </div>
        )}

        {/* Expandable Key Insights */}
        {video.keyInsights && video.keyInsights.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setExpandedInsights(!expandedInsights)}
              className="w-full text-left flex items-center justify-between gap-2 text-sm font-semibold text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <span>Key Insights ({video.keyInsights.length})</span>
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
                {video.keyInsights.map((insight, idx) => (
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

        {/* Tags */}
        {video.tags && video.tags.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-1.5">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-secondary dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
              >
                {tag}
              </span>
            ))}
            {video.tags.length > 3 && (
              <span className="px-2 py-0.5 rounded-md text-xs font-medium text-palette-secondary dark:text-zinc-500">
                +{video.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Footer with Link */}
        <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {video.link && (
            <a
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              Watch
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

