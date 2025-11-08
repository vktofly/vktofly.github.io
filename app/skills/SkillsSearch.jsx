"use client";

import { useState, useMemo } from "react";

export default function SkillsSearch({
  searchQuery,
  setSearchQuery,
  selectedSection,
  setSelectedSection,
  sections,
  totalResults,
}) {
  return (
    <div className="mb-10 space-y-6">
      {/* Search Bar */}
      <div className="relative max-w-2xl">
        <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
          <svg
            className="w-5 h-5 text-palette-secondary dark:text-zinc-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search skills, methodologies, frameworks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 placeholder-palette-secondary dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-palette-secondary dark:text-zinc-500 hover:text-palette-primary dark:hover:text-zinc-300 transition-colors"
            aria-label="Clear search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Section Filter */}
      <div className="flex flex-wrap items-center gap-4">
        <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
          Filter by section:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSection(null)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              selectedSection === null
                ? "bg-brand-500 text-white dark:bg-brand-600 shadow-soft"
                : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
            }`}
          >
            All Sections
          </button>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() =>
                setSelectedSection(
                  selectedSection === section.id ? null : section.id
                )
              }
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                selectedSection === section.id
                  ? "bg-brand-500 text-white dark:bg-brand-600 shadow-soft"
                  : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      {(searchQuery || selectedSection) && (
        <div className="text-sm text-palette-secondary dark:text-zinc-400 flex items-center gap-2">
          <span>
            Found {totalResults} result{totalResults !== 1 ? "s" : ""}
          </span>
          {(searchQuery || selectedSection) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedSection(null);
              }}
              className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function to highlight matching text
export function highlightText(text, query) {
  if (!query || !text) return text;

  const regex = new RegExp(`(${query})`, "gi");
  const parts = text.split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark
        key={index}
        className="bg-brand-200 dark:bg-brand-900/50 text-brand-900 dark:text-brand-100 px-1 rounded"
      >
        {part}
      </mark>
    ) : (
      part
    )
  );
}

