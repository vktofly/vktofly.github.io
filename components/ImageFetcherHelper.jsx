"use client";

/**
 * Image Fetcher Helper Component
 * 
 * A client-side component to help fetch images when adding new books or people.
 * This can be used in development/admin pages to fetch images interactively.
 */

import { useState } from "react";
import { fetchBookCoverWithFallback, getPersonImagePlaceholder } from "../lib/image-fetcher";

export function BookImageFetcher({ onImageFetched }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleFetch = async () => {
    if (!title.trim()) {
      setError("Please enter a book title");
      return;
    }

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await fetchBookCoverWithFallback(title, author || null, isbn || null);
      if (url) {
        setImageUrl(url);
        if (onImageFetched) {
          onImageFetched(url);
        }
      } else {
        setError("No image found. Try adding ISBN or author name for better results.");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
      <h3 className="text-lg font-semibold text-palette-primary dark:text-zinc-100 mb-4">
        📚 Fetch Book Cover Image
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-1">
            Book Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., The Beginning of Infinity"
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-1">
            Author (optional)
          </label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g., David Deutsch"
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-1">
            ISBN (optional, most accurate)
          </label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="e.g., 9780143121350"
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <button
          onClick={handleFetch}
          disabled={loading || !title.trim()}
          className="w-full px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? "Fetching..." : "Fetch Cover Image"}
        </button>

        {error && (
          <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-400">
            {error}
          </div>
        )}

        {imageUrl && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-palette-primary dark:text-zinc-200">
              Found Image:
            </div>
            <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img
                src={imageUrl}
                alt="Book cover"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-xs font-mono text-palette-secondary dark:text-zinc-400 break-all">
                {imageUrl}
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(imageUrl);
                alert("Image URL copied to clipboard!");
              }}
              className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Copy Image URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function PersonImageFetcher({ onImageFetched }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("philosopher");
  const [imageUrl, setImageUrl] = useState(null);

  const handleFetch = () => {
    if (!name.trim()) {
      alert("Please enter a person's name");
      return;
    }

    const url = getPersonImagePlaceholder(name, category);
    setImageUrl(url);
    
    if (onImageFetched) {
      onImageFetched(url);
    }
  };

  return (
    <div className="p-6 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900">
      <h3 className="text-lg font-semibold text-palette-primary dark:text-zinc-100 mb-4">
        👤 Get Person Image Placeholder
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-1">
            Person Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., David Deutsch"
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-palette-primary dark:text-zinc-200 mb-1">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
          >
            <option value="philosopher">Philosopher</option>
            <option value="technologist">Technologist</option>
            <option value="entrepreneur">Entrepreneur</option>
            <option value="historical">Historical</option>
          </select>
        </div>

        <button
          onClick={handleFetch}
          disabled={!name.trim()}
          className="w-full px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Get Image Placeholder
        </button>

        {imageUrl && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-palette-primary dark:text-zinc-200">
              Image URL:
            </div>
            <div className="relative w-full aspect-square rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800">
              <img
                src={imageUrl}
                alt="Person"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <div className="text-xs font-mono text-palette-secondary dark:text-zinc-400 break-all">
                {imageUrl}
              </div>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(imageUrl);
                alert("Image URL copied to clipboard!");
              }}
              className="w-full px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-200 rounded-lg font-medium hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              Copy Image URL
            </button>
            <p className="text-xs text-palette-secondary dark:text-zinc-500">
              Note: This is a placeholder image. For better results, manually find and add a specific image URL.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

