export default function KeyTakeaways({ items }) {
  if (!items || items.length === 0) return null;
  
  // Ensure items is an array and filter out any non-string values
  const validItems = Array.isArray(items) 
    ? items.filter(item => item != null && typeof item === 'string')
    : [];
  
  if (validItems.length === 0) return null;
  
  return (
    <div className="my-10 rounded-lg border-2 border-brand-500 bg-zinc-50 dark:bg-zinc-900/50 p-6">
      <h3 className="text-lg font-semibold mb-4 text-palette-primary">
        Key Takeaways
      </h3>
      <ul className="space-y-3 list-none pl-0">
        {validItems.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <span className="text-brand-500 font-bold mt-0.5 shrink-0">→</span>
            <span className="text-palette-secondary leading-relaxed">
              {String(item)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
