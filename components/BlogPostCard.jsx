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

export default function BlogPostCard({ post }) {
  return (
    <article className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-zinc-950 hover:border-brand-600 transition-colors">
      <div className="flex items-baseline justify-between gap-4 mb-2">
        <h3 className="text-lg font-semibold tracking-tight">
          <Link href={`/blog/${post.slug}/`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        {post.date && (
          <span className="text-xs text-zinc-500 shrink-0">
            {formatDate(post.date)}
          </span>
        )}
      </div>
      {post.description && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {post.description}
        </p>
      )}
      <div className="mt-4 flex items-center gap-3 text-xs text-zinc-500">
        {post.readingTime && (
          <>
            <span>{post.readingTime} min read</span>
            {post.tags?.length > 0 && <span>•</span>}
          </>
        )}
        {post.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded border border-zinc-300 dark:border-zinc-700 px-2 py-0.5"
              >
                {tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-zinc-400">+{post.tags.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

