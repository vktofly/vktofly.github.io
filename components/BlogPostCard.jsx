'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getOgImage } from '../lib/og-images';

function formatDate(date) {
  if (!date) return "";
  if (date instanceof Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  if (typeof date === "string") {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return date;
  }
  return String(date);
}

// Generate fallback Unsplash image based on first tag or default
function getFallbackImage(tags) {
  const tag = tags?.[0]?.toLowerCase() || "writing";
  const imageMap = {
    philosophy: "photo-1481627834876-b7833e8f5570",
    ai: "photo-1677442136019-21780ecad995",
    systems: "photo-1557682250-33bd709cbe85",
    knowledge: "photo-1519389950473-47ba0277781c",
    writing: "photo-1455390582262-044cdead277a",
    default: "photo-1455390582262-044cdead277a",
  };
  const imageId = imageMap[tag] || imageMap[tag.split(" ")[0]] || imageMap.default;
  return `https://images.unsplash.com/${imageId}?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3`;
}

export default function BlogPostCard({ post }) {
  // Only show image if explicitly provided in post.image or if OG image exists
  // Check for explicit image first, then try OG image path
  const ogImage = getOgImage("blog", post.slug);
  const hasExplicitImage = post.image && (post.image.startsWith("/") || post.image.startsWith("http"));
  
  // Determine image URL - prefer explicit image, then OG image path
  // Only use OG image if it's a valid path (starts with /og/blog/)
  const imageUrl = hasExplicitImage 
    ? post.image 
    : (ogImage.url && ogImage.url.startsWith("/og/blog/") ? ogImage.url : null);
  
  // Only show image if we have a valid image URL
  const shouldShowImage = !!imageUrl;
  const isExternalImage = imageUrl && imageUrl.startsWith("http");

  return (
    <article className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg flex flex-col">
      {/* Blog Post Image - Only show if image exists */}
      {shouldShowImage && (
        <Link href={`/blog/${post.slug}/`} className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
            unoptimized={isExternalImage}
            onError={(e) => {
              // Hide image container if image fails to load
              const container = e.target.closest('a');
              if (container) {
                container.style.display = 'none';
              }
            }}
          />
        </Link>
      )}

      {/* Content */}
      <div className="p-6 sm:p-8 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4">
          {post.date && (
            <div className="text-xs font-medium text-palette-secondary dark:text-zinc-500 mb-3">
              {formatDate(post.date)}
            </div>
          )}
          <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight mb-3">
            <Link href={`/blog/${post.slug}/`} className="hover:underline">
              {post.title}
            </Link>
          </h3>
        </div>

        {/* Description */}
        {post.description && (
          <p className="text-base text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4 flex-1">
            {post.description}
          </p>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            {/* Reading time and tags */}
            <div className="flex items-center gap-3 flex-wrap">
              {post.readingTime && (
                <span className="text-xs font-medium text-palette-secondary dark:text-zinc-500 flex items-center gap-1.5">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {post.readingTime} min
                </span>
              )}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-secondary dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="px-2 py-1 rounded-md text-xs font-medium text-palette-secondary dark:text-zinc-500">
                      +{post.tags.length - 2}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Read more link */}
            <Link
              href={`/blog/${post.slug}/`}
              className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1 group/link"
            >
              Read more
              <svg
                className="w-4 h-4 transition-transform group-hover/link:translate-x-1"
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
          </div>
        </div>
      </div>
    </article>
  );
}

