import Link from 'next/link';

export default function BlogPostNavigation({ currentPost, allPosts }) {
  if (!currentPost || !allPosts || allPosts.length === 0) return null;

  // Sort posts by date
  const sortedPosts = [...allPosts].sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date) - new Date(a.date);
  });

  const currentIndex = sortedPosts.findIndex(
    (post) => post.slug === currentPost.slug
  );

  if (currentIndex === -1) return null;

  const prevPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < sortedPosts.length - 1
      ? sortedPosts[currentIndex + 1]
      : null;

  if (!prevPost && !nextPost) return null;

  return (
    <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="grid sm:grid-cols-2 gap-6">
        {prevPost ? (
          <Link
            href={`/blog/${prevPost.slug}/`}
            className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-brand-500 dark:hover:border-brand-500 transition-colors"
          >
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-4 h-4 text-zinc-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                Previous
              </span>
            </div>
            <h4 className="text-base font-semibold text-palette-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {prevPost.title}
            </h4>
          </Link>
        ) : (
          <div></div>
        )}

        {nextPost && (
          <Link
            href={`/blog/${nextPost.slug}/`}
            className="group rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-brand-500 dark:hover:border-brand-500 transition-colors text-right sm:text-left"
          >
            <div className="flex items-center justify-end sm:justify-start gap-2 mb-2">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                Next
              </span>
              <svg
                className="w-4 h-4 text-zinc-500 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors"
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
            </div>
            <h4 className="text-base font-semibold text-palette-primary group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
              {nextPost.title}
            </h4>
          </Link>
        )}
      </div>
    </div>
  );
}

