import Link from 'next/link';

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

export default function RelatedPosts({ currentPost, allPosts, maxPosts = 3 }) {
  if (!currentPost || !allPosts || allPosts.length === 0) return null;

  // Find related posts by shared tags
  const relatedPosts = allPosts
    .filter((post) => {
      // Exclude current post
      if (post.slug === currentPost.slug) return false;
      
      // If current post has tags, find posts with matching tags
      if (currentPost.tags && currentPost.tags.length > 0) {
        const sharedTags = post.tags?.filter((tag) =>
          currentPost.tags.includes(tag)
        );
        return sharedTags && sharedTags.length > 0;
      }
      
      // If no tags, return false
      return false;
    })
    .slice(0, maxPosts);

  // If no related posts by tags, show recent posts
  const postsToShow =
    relatedPosts.length > 0
      ? relatedPosts
      : allPosts
          .filter((post) => post.slug !== currentPost.slug)
          .slice(0, maxPosts);

  if (postsToShow.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <h3 className="text-xl sm:text-2xl font-semibold tracking-tight mb-6 text-palette-primary">
        {relatedPosts.length > 0 ? "Related Essays" : "More Essays"}
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {postsToShow.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
          >
            <div className="mb-2">
              <h4 className="text-lg font-semibold tracking-tight">
                <Link
                  href={`/blog/${post.slug}/`}
                  className="hover:underline text-palette-primary"
                >
                  {post.title}
                </Link>
              </h4>
            </div>
            {post.description && (
              <p className="mt-2 text-sm text-palette-secondary leading-relaxed line-clamp-2">
                {post.description}
              </p>
            )}
            <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
              {post.date && (
                <>
                  <span>{formatDate(post.date)}</span>
                  {post.readingTime && <span>•</span>}
                </>
              )}
              {post.readingTime && <span>{post.readingTime} min read</span>}
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {post.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="rounded border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 text-xs text-zinc-600 dark:text-zinc-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}

