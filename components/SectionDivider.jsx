export default function SectionDivider({ 
  variant = 'minimal',
  quote = null,
  symbol = null 
}) {
  const variants = {
    minimal: (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="flex items-center gap-3 w-full max-w-md">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-brand-500/30 dark:bg-brand-400/20" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent" />
        </div>
      </div>
    ),
    geometric: (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="flex items-center gap-4 w-full max-w-lg">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
            <div className="w-3 h-3 rounded-full border-2 border-brand-500/50 dark:border-brand-400/50" />
            <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
          </div>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    ),
    infinity: (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-zinc-300 dark:to-zinc-700" />
          <div className="text-2xl text-brand-500/40 dark:text-brand-400/40 font-light">∞</div>
          <div className="flex-1 h-px bg-gradient-to-r from-zinc-300 dark:from-zinc-700 via-zinc-300 dark:via-zinc-700 to-transparent" />
        </div>
      </div>
    ),
    quote: quote ? (
      <div className="py-12 sm:py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="text-brand-500 dark:text-brand-400 text-2xl">&ldquo;</div>
            <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <p className="text-sm sm:text-base text-palette-secondary italic leading-relaxed">
            {quote}
          </p>
        </div>
      </div>
    ) : null,
    symbol: symbol ? (
      <div className="flex items-center justify-center py-8 sm:py-12">
        <div className="flex items-center gap-4 w-full max-w-md">
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
          <div className="text-xl text-brand-500/50 dark:text-brand-400/50">
            {symbol}
          </div>
          <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    ) : null,
    pattern: (
      <div className="py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        </div>
        <div className="relative flex justify-center">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 rounded-full bg-brand-500/20 dark:bg-brand-400/20"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return variants[variant] || variants.minimal;
}

