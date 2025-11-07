export default function ExperienceItem({ item }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">{item.role}</h3>
        <span className="text-xs text-zinc-500">{item.period}</span>
      </div>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.company}</p>
      {item.summary && <p className="mt-2 text-sm">{item.summary}</p>}
    </div>
  );
}


