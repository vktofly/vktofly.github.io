export default function Prose({ html }) {
  return (
    <div
      className="prose prose-sm sm:prose-base prose-zinc dark:prose-invert max-w-none
        prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-palette-primary
        prose-h1:text-2xl sm:prose-h1:text-3xl md:prose-h1:text-4xl prose-h1:mb-4 sm:prose-h1:mb-6 prose-h1:mt-8 sm:prose-h1:mt-12 prose-h1:leading-tight
        prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mb-3 sm:prose-h2:mb-4 prose-h2:mt-6 sm:prose-h2:mt-10 prose-h2:pt-2 prose-h2:border-t prose-h2:border-zinc-200 dark:prose-h2:border-zinc-800
        prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mb-2 sm:prose-h3:mb-3 prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:font-semibold
        prose-h4:text-base sm:prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-4 sm:prose-h4:mt-6
        prose-p:leading-relaxed sm:prose-p:leading-[1.75] prose-p:text-palette-secondary prose-p:my-4 sm:prose-p:my-5 prose-p:text-sm sm:prose-p:text-base
        prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-strong:text-palette-primary prose-strong:font-semibold prose-strong:font-sans
        prose-em:text-palette-secondary prose-em:italic
        prose-code:text-xs sm:prose-code:text-sm prose-code:font-mono prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-palette-primary
        prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-lg prose-pre:p-3 sm:prose-pre:p-4 prose-pre:overflow-x-auto prose-pre:text-sm sm:prose-pre:text-base
        prose-blockquote:border-l-4 prose-blockquote:border-brand-500 prose-blockquote:pl-4 sm:prose-blockquote:pl-6 prose-blockquote:pr-3 sm:prose-blockquote:pr-4 prose-blockquote:py-3 sm:prose-blockquote:py-4 prose-blockquote:my-6 sm:prose-blockquote:my-8 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/50 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-palette-secondary prose-blockquote:text-base sm:prose-blockquote:text-lg prose-blockquote:leading-relaxed
        prose-ul:list-disc prose-ul:my-4 sm:prose-ul:my-6 prose-ul:pl-5 sm:prose-ul:pl-6
        prose-ol:list-decimal prose-ol:my-4 sm:prose-ol:my-6 prose-ol:pl-5 sm:prose-ol:pl-6
        prose-li:my-1.5 sm:prose-li:my-2 prose-li:leading-relaxed prose-li:text-palette-secondary prose-li:pl-1 sm:prose-li:pl-2 prose-li:text-sm sm:prose-li:text-base
        prose-img:rounded-lg prose-img:border prose-img:border-zinc-200 dark:prose-img:border-zinc-800 prose-img:my-6 sm:prose-img:my-8 prose-img:shadow-sm prose-img:max-w-full prose-img:h-auto
        prose-hr:border-zinc-200 dark:prose-hr:border-zinc-800 prose-hr:my-8 sm:prose-hr:my-12
        prose-table:my-6 sm:prose-table:my-8 prose-table:w-full prose-table:border-collapse prose-table:text-sm sm:prose-table:text-base prose-table:overflow-x-auto
        prose-th:border prose-th:border-zinc-300 dark:prose-th:border-zinc-700 prose-th:bg-zinc-50 dark:prose-th:bg-zinc-900 prose-th:px-2 sm:prose-th:px-4 prose-th:py-1.5 sm:prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-xs sm:prose-th:text-sm
        prose-td:border prose-td:border-zinc-300 dark:prose-td:border-zinc-700 prose-td:px-2 sm:prose-td:px-4 prose-td:py-1.5 sm:prose-td:py-2 prose-td:text-xs sm:prose-td:text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}


