import Image from "next/image";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-8 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg">
      {/* Quote */}
      <div className="mb-6">
        <svg
          className="w-8 h-8 text-brand-500/30 dark:text-brand-400/30 mb-4"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 9.57-9.57 1.853 0 3.698.397 4.43.931v-8.065h-4.934v6.937c0 1.003-.396 1.99-1.103 2.707-.707.717-1.704 1.103-2.707 1.103-.396 0-.79-.04-1.184-.118v4.126c.396.04.79.059 1.184.059 1.003 0 1.99-.396 2.707-1.103.717-.707 1.103-1.704 1.103-2.707v-6.937h4.934v8.065c0 1.853-.397 3.698-1.103 4.43-.707.732-1.704 1.103-2.707 1.103-.396 0-.79-.04-1.184-.118v7.391h-4.934zm-14.017 0v-7.391c0-5.704 3.731-9.57 9.57-9.57 1.853 0 3.698.397 4.43.931v-8.065h-4.934v6.937c0 1.003-.396 1.99-1.103 2.707-.707.717-1.704 1.103-2.707 1.103-.396 0-.79-.04-1.184-.118v4.126c.396.04.79.059 1.184.059 1.003 0 1.99-.396 2.707-1.103.717-.707 1.103-1.704 1.103-2.707v-6.937h4.934v8.065c0 1.853-.397 3.698-1.103 4.43-.707.732-1.704 1.103-2.707 1.103-.396 0-.79-.04-1.184-.118v7.391h-4.934z" />
        </svg>
        <blockquote className="text-base sm:text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed italic">
          {testimonial.quote}
        </blockquote>
      </div>

      {/* Author */}
      <div className="flex items-center gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        {testimonial.avatar ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <Image
              src={testimonial.avatar}
              alt={testimonial.author}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/20 dark:from-brand-600/30 dark:to-brand-700/30 flex items-center justify-center flex-shrink-0 border border-brand-500/30 dark:border-brand-600/40">
            <span className="text-xl font-semibold text-brand-600 dark:text-brand-400">
              {testimonial.author.charAt(0)}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-palette-primary dark:text-zinc-100">
            {testimonial.author}
          </div>
          <div className="text-sm text-palette-secondary dark:text-zinc-400">
            {testimonial.role}
            {testimonial.company && `, ${testimonial.company}`}
          </div>
        </div>
        {testimonial.linkedin && (
          <a
            href={testimonial.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex-shrink-0"
            aria-label="LinkedIn"
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}

