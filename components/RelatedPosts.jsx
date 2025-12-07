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

  // Advanced related posts algorithm
  const findRelatedPosts = (current, posts) => {
    const related = posts
      .filter((post) => post.slug !== current.slug)
      .map((post) => {
        let score = 0;

        // Tag matching (highest weight)
        if (current.tags && post.tags) {
          const sharedTags = current.tags.filter(tag => post.tags.includes(tag));
          score += sharedTags.length * 10;
        }

        // Category matching (medium weight)
        if (current.category && post.category && current.category === post.category) {
          score += 5;
        }

        // Title keyword matching (lower weight)
        if (current.title && post.title) {
          const currentWords = current.title.toLowerCase().split(/\s+/);
          const postWords = post.title.toLowerCase().split(/\s+/);
          const sharedWords = currentWords.filter(word =>
            word.length > 3 && postWords.includes(word)
          );
          score += sharedWords.length * 2;
        }

        // Recency boost (slight preference for recent content)
        if (post.date) {
          const postDate = new Date(post.date);
          const now = new Date();
          const daysSince = (now - postDate) / (1000 * 60 * 60 * 24);
          if (daysSince < 365) {
            score += Math.max(0, (365 - daysSince) / 365); // Boost recent posts
          }
        }

        return { ...post, relevanceScore: score };
      })
      .filter((post) => post.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, maxPosts);

    return related;
  };

  const relatedPosts = findRelatedPosts(currentPost, allPosts);

  // If no highly related posts, show recent posts as fallback
  const postsToShow =
    relatedPosts.length >= 2
      ? relatedPosts
      : [
          ...relatedPosts,
          ...allPosts
            .filter((post) =>
              post.slug !== currentPost.slug &&
              !relatedPosts.some((rp) => rp.slug === post.slug)
            )
            .slice(0, maxPosts - relatedPosts.length)
        ];

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

