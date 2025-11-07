import Link from 'next/link';

export default function BlogPostCTA() {
  return (
    <div className="mt-16 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="rounded-lg border-2 border-brand-200 dark:border-brand-800 bg-gradient-to-br from-brand-50/50 to-transparent dark:from-brand-950/30 dark:to-transparent p-8 sm:p-10 text-center">
        <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-4 text-palette-primary">
          Let's Build the Future Together
        </h3>
        <p className="text-base sm:text-lg text-palette-secondary mb-8 leading-relaxed max-w-2xl mx-auto">
          Whether you're exploring collaboration, seeking insights on systems thinking, 
          or interested in advancing civilization-scale technologies, I'd love to connect.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/contact/"
            className="inline-flex items-center justify-center rounded-md bg-brand-500 hover:bg-brand-600 text-white px-6 sm:px-8 py-3 font-medium transition-colors shadow-sm hover:shadow-md"
          >
            Get in Touch
          </Link>
          <Link
            href="/about/"
            className="inline-flex items-center justify-center rounded-md border-2 border-zinc-300 dark:border-zinc-700 text-palette-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 sm:px-8 py-3 font-medium transition-colors"
          >
            Learn More About Me
          </Link>
          <Link
            href="/blog/"
            className="inline-flex items-center justify-center rounded-md border-2 border-zinc-300 dark:border-zinc-700 text-palette-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 sm:px-8 py-3 font-medium transition-colors"
          >
            Explore More Essays
          </Link>
        </div>
      </div>
    </div>
  );
}

