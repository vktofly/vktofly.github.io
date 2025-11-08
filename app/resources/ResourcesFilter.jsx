"use client";

import { useState, useMemo } from "react";
import BookCard from "../../components/BookCard";
import PersonCard from "../../components/PersonCard";
import PodcastCard from "../../components/PodcastCard";
import VideoCard from "../../components/VideoCard";

// Resource type definitions
const resourceTypes = [
  { id: "all", label: "All Resources", icon: "📚" },
  { id: "books", label: "Books", icon: "📖" },
  { id: "podcasts", label: "Podcasts", icon: "🎙️" },
  { id: "videos", label: "Videos", icon: "🎥" },
  { id: "people", label: "People", icon: "👤" },
];

// Category definitions
const categories = [
  { id: "epistemology", label: "Epistemology", icon: "📚" },
  { id: "philosophy", label: "Philosophy", icon: "🧠" },
  { id: "ai", label: "AI", icon: "🤖" },
  { id: "systems", label: "Systems", icon: "⚙️" },
  { id: "entrepreneurship", label: "Entrepreneurship", icon: "💼" },
];

export default function ResourcesFilter({
  books,
  podcasts,
  videos,
  people,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);

  // Combine all resources for unified search
  const allResources = useMemo(() => {
    const resources = [];
    books?.forEach((book) => {
      resources.push({ ...book, resourceType: "books" });
    });
    podcasts?.forEach((podcast) => {
      resources.push({ ...podcast, resourceType: "podcasts" });
    });
    videos?.forEach((video) => {
      resources.push({ ...video, resourceType: "videos" });
    });
    people?.forEach((person) => {
      resources.push({ ...person, resourceType: "people" });
    });
    return resources;
  }, [books, podcasts, videos, people]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    allResources.forEach((resource) => {
      resource.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allResources]);

  // Filter resources
  const filteredResources = useMemo(() => {
    return allResources.filter((resource) => {
      // Type filter
      if (selectedType !== "all" && resource.resourceType !== selectedType) {
        return false;
      }

      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          resource.title?.toLowerCase().includes(query) ||
          resource.name?.toLowerCase().includes(query) ||
          resource.author?.toLowerCase().includes(query) ||
          resource.speaker?.toLowerCase().includes(query) ||
          resource.host?.toLowerCase().includes(query) ||
          resource.description?.toLowerCase().includes(query) ||
          resource.whyItMatters?.toLowerCase().includes(query) ||
          resource.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          resource.keyIdeas?.some((idea) => idea.toLowerCase().includes(query)) ||
          resource.keyTakeaways?.some((takeaway) => takeaway.toLowerCase().includes(query)) ||
          resource.keyInsights?.some((insight) => insight.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && resource.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !resource.tags?.includes(selectedTag)) {
        return false;
      }

      return true;
    });
  }, [allResources, searchQuery, selectedType, selectedCategory, selectedTag]);

  // Group filtered resources by type
  const resourcesByType = useMemo(() => {
    return {
      books: filteredResources.filter((r) => r.resourceType === "books"),
      podcasts: filteredResources.filter((r) => r.resourceType === "podcasts"),
      videos: filteredResources.filter((r) => r.resourceType === "videos"),
      people: filteredResources.filter((r) => r.resourceType === "people"),
    };
  }, [filteredResources]);

  const handleTypeClick = (type) => {
    setSelectedType(type);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
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
            placeholder="Search across all resources..."
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
          {/* Type Filter */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
              Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {resourceTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeClick(type.id)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                    selectedType === type.id
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  <span>{type.icon}</span>
                  <span>{type.label}</span>
                </button>
              ))}
            </div>
          </div>

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
                const hasResources = allResources.some((r) => r.category === category.id);
                if (!hasResources) return null;
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
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

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

        {/* Results Count */}
        <div className="text-sm text-palette-secondary dark:text-zinc-400">
          Showing {filteredResources.length} result{filteredResources.length !== 1 ? "s" : ""}
          {(selectedType !== "all" || selectedCategory || selectedTag || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("all");
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className="ml-2 text-brand-600 dark:text-brand-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Resources by Type */}
      {filteredResources.length > 0 ? (
        <div className="space-y-12">
          {/* Books Section */}
          {resourcesByType.books.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-6 flex items-center gap-2">
                <span>📖</span>
                <span>Books ({resourcesByType.books.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesByType.books.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </div>
          )}

          {/* Podcasts Section */}
          {resourcesByType.podcasts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-6 flex items-center gap-2">
                <span>🎙️</span>
                <span>Podcasts ({resourcesByType.podcasts.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesByType.podcasts.map((podcast) => (
                  <PodcastCard key={podcast.id} podcast={podcast} />
                ))}
              </div>
            </div>
          )}

          {/* Videos Section */}
          {resourcesByType.videos.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-6 flex items-center gap-2">
                <span>🎥</span>
                <span>Videos ({resourcesByType.videos.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesByType.videos.map((video) => (
                  <VideoCard key={video.id} video={video} />
                ))}
              </div>
            </div>
          )}

          {/* People Section */}
          {resourcesByType.people.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-6 flex items-center gap-2">
                <span>👤</span>
                <span>People ({resourcesByType.people.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourcesByType.people.map((person) => (
                  <PersonCard key={person.slug} person={person} />
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
            No resources found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedType("all");
              setSelectedCategory(null);
              setSelectedTag(null);
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

