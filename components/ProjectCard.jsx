import Link from 'next/link';

export default function ProjectCard({ project }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-brand-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        {project.slug ? (
          <Link href={`/projects/${project.slug}/`} className="text-sm text-brand-600 hover:underline shrink-0">Read</Link>
        ) : project.href ? (
          <Link
            href={project.href}
            className="text-sm text-brand-600 hover:underline shrink-0"
            target={project.href.startsWith('http') ? '_blank' : undefined}
          >
            View
          </Link>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{project.description}</p>
      {project.tags?.length ? (
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-zinc-500">
          {project.tags.map((t) => (
            <span key={t} className="rounded border border-zinc-300 dark:border-zinc-700 px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}


