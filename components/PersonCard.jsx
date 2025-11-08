"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Category icons and styles
const categoryStyles = {
  philosopher: {
    icon: "🧠",
    badge: "bg-purple-500/10 dark:bg-purple-600/20 text-purple-700 dark:text-purple-400 border-purple-500/20 dark:border-purple-600/30",
  },
  technologist: {
    icon: "🤖",
    badge: "bg-blue-500/10 dark:bg-blue-600/20 text-blue-700 dark:text-blue-400 border-blue-500/20 dark:border-blue-600/30",
  },
  entrepreneur: {
    icon: "💼",
    badge: "bg-green-500/10 dark:bg-green-600/20 text-green-700 dark:text-green-400 border-green-500/20 dark:border-green-600/30",
  },
  historical: {
    icon: "📜",
    badge: "bg-amber-500/10 dark:bg-amber-600/20 text-amber-700 dark:text-amber-400 border-amber-500/20 dark:border-amber-600/30",
  },
};

export default function PersonCard({ person }) {
  const [expandedWhy, setExpandedWhy] = useState(false);
  const [expandedHow, setExpandedHow] = useState(false);
  const [expandedIdeas, setExpandedIdeas] = useState(false);

  const categoryStyle = categoryStyles[person.category] || categoryStyles.philosopher;

  return (
    <article className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg flex flex-col">
      {/* Person Image/Header */}
      <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-800">
        {person.image && (
          <Image
            src={person.image}
            alt={person.name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            unoptimized={person.image.startsWith("http")}
          />
        )}
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border backdrop-blur-sm ${categoryStyle.badge}`}
          >
            <span>{categoryStyle.icon}</span>
            <span className="capitalize">{person.category}</span>
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Name */}
        <h3 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-3">
          {person.name}
        </h3>

        {/* Description */}
        {person.description && (
          <p className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
            {person.description}
          </p>
        )}

        {/* Expandable Key Ideas */}
        {person.keyIdeas && person.keyIdeas.length > 0 && (
          <div className="mb-4">
            <button
              onClick={() => setExpandedIdeas(!expandedIdeas)}
              className="w-full text-left flex items-center justify-between gap-2 text-sm font-semibold text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <span>Key Ideas ({person.keyIdeas.length})</span>
              <svg
                className={`w-4 h-4 transition-transform ${expandedIdeas ? "rotate-180" : ""}`}
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
            {expandedIdeas && (
              <ul className="mt-2 space-y-2">
                {person.keyIdeas.map((idea, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed flex items-start gap-2"
                  >
                    <span className="text-brand-500 dark:text-brand-400 mt-1.5 flex-shrink-0">—</span>
                    <span>{idea}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Expandable "Why They Matter" */}
        {person.whyTheyMatter && (
          <div className="mb-4">
            <button
              onClick={() => setExpandedWhy(!expandedWhy)}
              className="w-full text-left flex items-center justify-between gap-2 text-sm font-semibold text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <span>Why They Matter</span>
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
                {person.whyTheyMatter}
              </p>
            )}
          </div>
        )}

        {/* Expandable "How They Shaped My Thinking" */}
        {person.howTheyShapedYou && (
          <div className="mb-4">
            <button
              onClick={() => setExpandedHow(!expandedHow)}
              className="w-full text-left flex items-center justify-between gap-2 text-sm font-semibold text-palette-primary dark:text-zinc-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              <span>How They Shaped My Thinking</span>
              <svg
                className={`w-4 h-4 transition-transform ${expandedHow ? "rotate-180" : ""}`}
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
            {expandedHow && (
              <p className="mt-2 text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                {person.howTheyShapedYou}
              </p>
            )}
          </div>
        )}

        {/* Related Blog Posts */}
        {person.relatedPosts && person.relatedPosts.length > 0 && (
          <div className="mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <p className="text-xs font-semibold text-palette-secondary dark:text-zinc-500 uppercase tracking-wide mb-2">
              Related Reading
            </p>
            <div className="space-y-2">
              {person.relatedPosts.map((postSlug) => {
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

        {/* Links Section */}
        {person.links && (
          <div className="mt-auto pt-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-wrap items-center gap-3">
              {person.links.books && person.links.books.length > 0 && (
                <>
                  {person.links.books.map((bookLink, idx) => (
                    <Link
                      key={idx}
                      href={bookLink}
                      className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1"
                    >
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
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                      Books
                    </Link>
                  ))}
                </>
              )}
              {person.links.website && (
                <a
                  href={person.links.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1"
                >
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
                  Website
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

