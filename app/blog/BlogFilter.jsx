"use client";

import { useEffect, useState, useMemo } from "react";
import BlogPostCard from "../../components/BlogPostCard";

export default function BlogFilter({ posts, allTags }) {
  const [tag, setTag] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const updateTagFromURL = () => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setTag(params.get("tag"));
    }
  };

  useEffect(() => {
    updateTagFromURL();

    // Listen for browser back/forward navigation
    window.addEventListener("popstate", updateTagFromURL);

    return () => {
      window.removeEventListener("popstate", updateTagFromURL);
    };
  }, []);

  const handleTagClick = (clickedTag) => {
    setTag(clickedTag);
  };

  // Filter posts by tag and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Tag filter
      if (tag && !post.tags?.includes(tag)) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          post.title?.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.summary?.toLowerCase().includes(query) ||
          post.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [posts, tag, searchQuery]);

  return (
    <>
      {/* Search and Filter Section */}
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
            placeholder="Search posts by title, description, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 placeholder-palette-secondary dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
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

        {/* Tag Filters */}
        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
              Filter by tag:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTagClick(null)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  !tag
                    ? "bg-brand-500 text-white dark:bg-brand-600 shadow-soft"
                    : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                All Posts
              </button>
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => handleTagClick(t)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tag === t
                      ? "bg-brand-500 text-white dark:bg-brand-600 shadow-soft"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        {(searchQuery || tag) && (
          <div className="text-sm text-palette-secondary dark:text-zinc-400 flex items-center gap-2">
            <span>
              Showing {filteredPosts.length} of {posts.length} post
              {posts.length !== 1 ? "s" : ""}
            </span>
            {(searchQuery || tag) && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setTag(null);
                }}
                className="text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Posts Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
            No posts found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setTag(null);
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
