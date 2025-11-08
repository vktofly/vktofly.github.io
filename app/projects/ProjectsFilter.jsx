"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";

function formatDate(date) {
  if (!date) return "";
  if (typeof date === "string") {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    }
    return date;
  }
  return String(date);
}

// Category definitions
const categories = [
  { id: 'ai', label: 'AI', icon: '🤖' },
  { id: 'quantum', label: 'Quantum', icon: '⚛️' },
  { id: 'robotics', label: 'Robotics', icon: '🤖' },
  { id: 'space', label: 'Space', icon: '🚀' },
  { id: 'philosophy', label: 'Philosophy', icon: '📚' },
  { id: 'systems', label: 'Systems', icon: '⚙️' },
];

export default function ProjectsFilter({ projects }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Extract all unique tags, statuses, and categories
  const allTags = useMemo(() => {
    const tags = new Set();
    projects.forEach((p) => {
      p.tags?.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  const allStatuses = useMemo(() => {
    const statuses = new Set();
    projects.forEach((p) => {
      if (p.status) statuses.add(p.status);
    });
    return Array.from(statuses).sort();
  }, [projects]);

  const allCategories = useMemo(() => {
    const cats = new Set();
    projects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats).sort();
  }, [projects]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch =
          project.title?.toLowerCase().includes(query) ||
          project.description?.toLowerCase().includes(query) ||
          project.tags?.some((tag) => tag.toLowerCase().includes(query)) ||
          project.technologies?.some((tech) =>
            tech.toLowerCase().includes(query)
          ) ||
          project.category?.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedCategory && project.category !== selectedCategory) {
        return false;
      }

      // Tag filter
      if (selectedTag && !project.tags?.includes(selectedTag)) {
        return false;
      }

      // Status filter
      if (selectedStatus && project.status !== selectedStatus) {
        return false;
      }

      return true;
    });
  }, [projects, searchQuery, selectedCategory, selectedTag, selectedStatus]);

  const handleTagClick = (tag) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const handleStatusClick = (status) => {
    setSelectedStatus(selectedStatus === status ? null : status);
  };

  return (
    <>
      {/* Filters Section */}
      <div className="mb-10 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-md">
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
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 placeholder-palette-secondary dark:placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-500 dark:focus:ring-brand-600 focus:border-transparent transition-all"
          />
        </div>

      {/* Category, Tag and Status Filters */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        {allCategories.length > 0 && (
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
              {allCategories.map((category) => {
                const catInfo = categories.find(c => c.id === category) || { label: category, icon: '📁' };
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-1.5 ${
                      selectedCategory === category
                        ? "bg-brand-500 text-white dark:bg-brand-600"
                        : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  >
                    <span>{catInfo.icon}</span>
                    <span>{catInfo.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Status Filter */}
        {allStatuses.length > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-palette-secondary dark:text-zinc-400">
              Status:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStatus(null)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedStatus === null
                    ? "bg-brand-500 text-white dark:bg-brand-600"
                    : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                All
              </button>
              {allStatuses.map((status) => (
                <button
                  key={status}
                  onClick={() => setSelectedStatus(selectedStatus === status ? null : status)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${
                    selectedStatus === status
                      ? "bg-brand-500 text-white dark:bg-brand-600"
                      : "bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {status}
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
                {allTags.map((tag) => (
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
          Showing {filteredProjects.length} of {projects.length} project
          {projects.length !== 1 ? "s" : ""}
          {(selectedCategory || selectedTag || selectedStatus || searchQuery) && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
                setSelectedTag(null);
                setSelectedStatus(null);
              }}
              className="ml-2 text-brand-600 dark:text-brand-400 hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title || project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-palette-secondary dark:text-zinc-400 mb-4">
            No projects found matching your filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
              setSelectedTag(null);
              setSelectedStatus(null);
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

