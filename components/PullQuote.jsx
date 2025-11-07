export default function PullQuote({ children, author }) {
  return (
    <aside className="my-10 py-6 border-y-2 border-brand-500">
      <blockquote className="text-2xl font-light italic text-palette-primary text-center leading-relaxed max-w-2xl mx-auto">
        {children}
      </blockquote>
      {author && (
        <cite className="block text-center mt-4 text-sm text-palette-secondary not-italic">
          — {author}
        </cite>
      )}
    </aside>
  );
}

