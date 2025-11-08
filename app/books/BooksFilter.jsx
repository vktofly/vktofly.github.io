"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import BookCard from "../../components/BookCard";

// Category definitions
const categories = [
  { id: "epistemology", label: "Epistemology" },
  { id: "philosophy", label: "Philosophy" },
  { id: "ai", label: "AI" },
  { id: "systems", label: "Systems" },
  { id: "entrepreneurship", label: "Entrepreneurship" },
  { id: "physics", label: "Physics" },
];

// Category icons mapping (for timeline view only)
const categoryIcons = {
  epistemology: "📚",
  philosophy: "🧠",
  ai: "🤖",
  systems: "⚙️",
  entrepreneurship: "💼",
  physics: "⚛️",
  default: "📖",
};

export default function BooksFilter({ books }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedImpact, setSelectedImpact] = useState(null);
  const [selectedReadingStatus, setSelectedReadingStatus] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // "grid" | "list" | "timeline"

  // Extract all unique tags, impacts, and reading statuses
  const allTags = useMemo(() => {
    const tags = new Set();
    books.forEach((book) => {
      book.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [books]);

  const allImpacts = useMemo(() => {
    const impacts = new Set();
    books.forEach((book) => {
      if (book.impact) impacts.add(book.impact);
      if (book.paradigmShift) impacts.add("paradigm-shift");
    });
    return Array.from(impacts);
  }, [books]);

  const allReadingStatuses = useMemo(() => {
    const statuses = new Set();
    books.forEach((book) => {
      if (book.readingStatus) statuses.add(book.readingStatus);
    });
    return Array.from(statuses).sort();
  }, [books]);

  // Filter books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          book.title?.toLowerCase().includes(query) ||
          book.author?.toLowerCase().includes(query) ||
          book.whyItMatters?.toLowerCase().includes(query) ||
          book.keyQuote?.toLowerCase().includes(query) ||
          book.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          book.keyInsights?.some((insight) =>
            insight.toLowerCase().includes(query)
          );
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && book.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !book.tags?.includes(selectedTag)) {
        return false;
      }

      // Impact filter
      if (selectedImpact) {
        if (selectedImpact === "paradigm-shift" && !book.paradigmShift) {
          return false;
        }
        if (selectedImpact === "high" && book.impact !== "high") {
          return false;
        }
        if (
          selectedImpact === "foundation" &&
          book.impact === "high" &&
          !book.paradigmShift
        ) {
          // Foundation books are high impact but not paradigm shifts
          return true;
        }
        if (
          selectedImpact !== "paradigm-shift" &&
          selectedImpact !== "foundation" &&
          book.impact !== selectedImpact
        ) {
          return false;
        }
      }

      // Reading status filter
      if (
        selectedReadingStatus &&
        book.readingStatus !== selectedReadingStatus
      ) {
        return false;
      }

      return true;
    });
  }, [
    books,
    searchQuery,
    selectedCategory,
    selectedTag,
    selectedImpact,
    selectedReadingStatus,
  ]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleImpactClick = (impact) => {
    setSelectedImpact(selectedImpact === impact ? null : impact);
  };

  const handleReadingStatusClick = (status) => {
    setSelectedReadingStatus(selectedReadingStatus === status ? null : status);
  };

  return (
    <>
      {/* Filters Section */}
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
            placeholder="Search books, authors, insights..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 placeholder-palette-secondary dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400"
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

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-4">
          {/* Category Filter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
              Category:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedCategory === null
                    ? "bg-brand-500 text-white dark:bg-brand-600"
                    : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                All
              </button>
              {categories.map((category) => {
                const categoryBooks = books.filter(
                  (b) => b.category === category.id
                );
                if (categoryBooks.length === 0) return null;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                      selectedCategory === category.id
                        ? "bg-brand-500 text-white dark:bg-brand-600"
                        : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Impact Filter */}
          {allImpacts.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
                Impact:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedImpact(null)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedImpact === null
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleImpactClick("paradigm-shift")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedImpact === "paradigm-shift"
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  Paradigm Shifts
                </button>
                <button
                  onClick={() => handleImpactClick("high")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedImpact === "high"
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  High Impact
                </button>
                <button
                  onClick={() => handleImpactClick("foundation")}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedImpact === "foundation"
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  Foundations
                </button>
              </div>
            </div>
          )}

          {/* Reading Status Filter */}
          {allReadingStatuses.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
                Status:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedReadingStatus(null)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedReadingStatus === null
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  All
                </button>
                {allReadingStatuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => handleReadingStatusClick(status)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
                      selectedReadingStatus === status
                        ? "bg-brand-500 text-white dark:bg-brand-600"
                        : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {status.replace("-", " ")}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
                Tags:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                    selectedTag === null
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  All
                </button>
                {allTags.slice(0, 10).map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                      selectedTag === tag
                        ? "bg-brand-500 text-white dark:bg-brand-600"
                        : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Toggle and Results Count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-palette-secondary dark:text-zinc-400">
            Showing {filteredBooks.length} of {books.length} book
            {books.length !== 1 ? "s" : ""}
            {(selectedCategory ||
              selectedTag ||
              selectedImpact ||
              selectedReadingStatus ||
              searchQuery) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                  setSelectedTag(null);
                  setSelectedImpact(null);
                  setSelectedReadingStatus(null);
                }}
                className="ml-2 text-brand-600 dark:text-brand-400 hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-palette-secondary dark:text-zinc-400">
              View:
            </span>
            <div className="flex gap-1 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === "grid"
                    ? "bg-brand-500 text-white dark:bg-brand-600"
                    : "text-palette-secondary dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                title="Grid view"
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === "list"
                    ? "bg-brand-500 text-white dark:bg-brand-600"
                    : "text-palette-secondary dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                title="List view"
              >
                List
              </button>
              <button
                onClick={() => setViewMode("timeline")}
                className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                  viewMode === "timeline"
                    ? "bg-brand-500 text-white dark:bg-brand-600"
                    : "text-palette-secondary dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
                title="Timeline view"
              >
                Timeline
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Books Grid/List/Timeline */}
      {filteredBooks.length > 0 ? (
        <>
          {viewMode === "timeline" ? (
            <div className="relative">
              {/* Timeline line */}
              <div
                className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-500/30 via-brand-500/20 to-transparent dark:from-brand-400/30 dark:via-brand-400/20 hidden sm:block"
                aria-hidden
              />

              {/* Timeline items */}
              <div className="space-y-8">
                {filteredBooks
                  .sort((a, b) => (b.yearRead || 0) - (a.yearRead || 0))
                  .map((book, idx) => (
                    <div key={book.slug} className="relative">
                      {/* Timeline dot */}
                      <div className="absolute left-0 sm:left-8 -translate-x-1/2 sm:translate-x-0 top-6 z-10">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 shadow-soft flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white dark:bg-zinc-900" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="ml-10 sm:ml-16">
                        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg">
                          <div className="flex flex-col sm:flex-row gap-4">
                            {/* Book Cover */}
                            {book.coverImage && (
                              <div className="flex-shrink-0 w-32 h-48 sm:w-24 sm:h-36 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                                <Image
                                  src={book.coverImage}
                                  alt={`${book.title} by ${book.author}`}
                                  width={128}
                                  height={192}
                                  className="w-full h-full object-cover"
                                  unoptimized={book.coverImage.startsWith(
                                    "http"
                                  )}
                                />
                              </div>
                            )}

                            {/* Book Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-3 mb-2">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 mb-1">
                                    {book.title}
                                  </h3>
                                  <p className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
                                    by {book.author}
                                  </p>
                                </div>
                                {book.yearRead && (
                                  <span className="flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400 border border-brand-500/20 dark:border-brand-600/30">
                                    {book.yearRead}
                                  </span>
                                )}
                              </div>

                              {book.keyQuote && (
                                <blockquote className="mt-3 mb-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                                  <p className="text-sm text-palette-primary dark:text-zinc-200 italic leading-relaxed">
                                    "{book.keyQuote}"
                                  </p>
                                </blockquote>
                              )}

                              {book.whyItMatters && (
                                <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed line-clamp-3">
                                  {book.whyItMatters}
                                </p>
                              )}

                              {/* Badges */}
                              <div className="flex flex-wrap items-center gap-2 mt-3">
                                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                  <span className="capitalize">
                                    {book.category}
                                  </span>
                                </span>
                                {book.paradigmShift && (
                                  <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                    Paradigm Shift
                                  </span>
                                )}
                                {book.impact === "high" &&
                                  !book.paradigmShift && (
                                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                                      Foundation
                                    </span>
                                  )}
                              </div>

                              {book.link && (
                                <a
                                  href={book.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors mt-3"
                                >
                                  Purchase/Read
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
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div
              className={
                viewMode === "grid" ? "grid sm:grid-cols-2 gap-6" : "space-y-6"
              }
            >
              {filteredBooks.map((book) => (
                <BookCard key={book.slug} book={book} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
            No books found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
              setSelectedTag(null);
              setSelectedImpact(null);
              setSelectedReadingStatus(null);
            }}
            className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </>
  );
}
