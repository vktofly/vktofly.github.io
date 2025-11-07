"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function BlogFilter({ posts, allTags }) {
  const [tag, setTag] = useState(null);

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

  const filtered = tag ? posts.filter((p) => p.tags?.includes(tag)) : posts;

  return (
    <>
      {allTags.length ? (
        <div className="mb-6 flex flex-wrap gap-2 text-sm">
          <Link
            href="/blog/"
            onClick={() => handleTagClick(null)}
            className={`rounded-md border px-2 py-1 ${
              tag ? "" : "bg-white dark:bg-zinc-950"
            }`}
          >
            All
          </Link>
          {allTags.map((t) => (
            <Link
              key={t}
              href={`/blog/?tag=${encodeURIComponent(t)}`}
              onClick={() => handleTagClick(t)}
              className={`rounded-md border px-2 py-1 ${
                tag === t ? "bg-white dark:bg-zinc-950" : ""
              }`}
            >
              {t}
            </Link>
          ))}
        </div>
      ) : null}
      <div className="grid gap-4">
        {filtered.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="text-lg font-semibold tracking-tight">
                <Link href={`/blog/${post.slug}/`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <span className="text-xs text-zinc-500">
                {formatDate(post.date)}
              </span>
            </div>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>
            <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500">
              <span>{post.readingTime} min read</span>
              <span>•</span>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((t) => (
                  <Link
                    key={t}
                    href={`/blog/?tag=${encodeURIComponent(t)}`}
                    onClick={() => handleTagClick(t)}
                    className="rounded border px-1.5 py-0.5 hover:text-brand-600"
                  >
                    {t}
                  </Link>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
