import Link from 'next/link';
import Image from 'next/image';
import { getOgImage } from '../lib/og-images';
import fs from 'fs/promises';
import path from 'path';

async function ogImageExists(slug) {
  try {
    const imagePath = path.join(process.cwd(), 'public', 'og', 'blog', `${slug}.png`);
    await fs.access(imagePath);
    return true;
  } catch {
    return false;
  }
}

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

export default async function FeaturedBlogPost({ post }) {
  if (!post) return null;

  const ogImage = getOgImage("blog", post.slug);
  const hasOgImage = await ogImageExists(post.slug);

  return (
    <article className="rounded-lg border-2 border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-950/30 dark:to-transparent p-8 sm:p-10 hover:border-brand-500 dark:hover:border-brand-500 transition-colors">
      <div className="mb-4">
        <span className="text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
          Featured Essay
        </span>
      </div>
      {hasOgImage && (
        <div className="mb-6">
          <Link href={`/blog/${post.slug}/`} className="block relative w-full aspect-[1200/630] overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <Image
              src={ogImage.url}
              alt={ogImage.alt}
              fill
              className="object-cover transition-transform hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            />
          </Link>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-3 text-palette-primary">
        <Link href={`/blog/${post.slug}/`} className="hover:underline">
          {post.title}
        </Link>
      </h2>
      {post.description && (
        <p className="text-base sm:text-lg text-palette-secondary leading-relaxed mb-4">
          {post.description}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-4 text-sm text-palette-secondary">
        {post.date && (
          <span>{formatDate(post.date)}</span>
        )}
        {post.readingTime && (
          <>
            {post.date && <span>•</span>}
            <span>{post.readingTime} min read</span>
          </>
        )}
        {post.tags && post.tags.length > 0 && (
          <>
            <span>•</span>
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6">
        <Link
          href={`/blog/${post.slug}/`}
          className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:underline font-medium"
        >
          Read essay
          <svg
            className="w-4 h-4 ml-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}

