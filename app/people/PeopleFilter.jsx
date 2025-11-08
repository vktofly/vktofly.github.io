"use client";

import { useState, useMemo } from "react";
import PersonCard from "../../components/PersonCard";

// Category definitions
const categories = [
  { id: 'philosopher', label: 'Philosophers', icon: '🧠' },
  { id: 'technologist', label: 'Technologists', icon: '🤖' },
  { id: 'entrepreneur', label: 'Entrepreneurs', icon: '💼' },
  { id: 'historical', label: 'Historical', icon: '📜' },
];

export default function PeopleFilter({ people }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Filter people
  const filteredPeople = useMemo(() => {
    return people.filter((person) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          person.name?.toLowerCase().includes(query) ||
          person.description?.toLowerCase().includes(query) ||
          person.whyTheyMatter?.toLowerCase().includes(query) ||
          person.howTheyShapedYou?.toLowerCase().includes(query) ||
          person.keyIdeas?.some((idea) => idea.toLowerCase().includes(query));
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && person.category !== selectedCategory) {
        return false;
      }

      return true;
    });
  }, [people, searchQuery, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
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
            placeholder="Search people, ideas, influences..."
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

        {/* Category Filters */}
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
              const categoryPeople = people.filter((p) => p.category === category.id);
              if (categoryPeople.length === 0) return null;
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

        {/* Results Count */}
        <div className="text-sm text-palette-secondary dark:text-zinc-400">
          Showing {filteredPeople.length} of {people.length} person{people.length !== 1 ? "s" : ""}
          {(selectedCategory || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="ml-2 text-brand-600 dark:text-brand-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* People Grid */}
      {filteredPeople.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPeople.map((person) => (
            <PersonCard key={person.slug} person={person} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
            No people found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
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

