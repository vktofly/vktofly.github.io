import Link from "next/link";
import Image from "next/image";
import ProjectPreview from "./ProjectPreview";

function formatDate(date) {
  if (!date) return "";
  if (typeof date === "string") {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
      });
    }
    return date;
  }
  return String(date);
}

export default function ProjectCard({ project }) {
  // Generate Unsplash image URL based on project tags or use default
  const getImageUrl = () => {
    if (project.image && !project.image.startsWith("http")) {
      return project.image; // Local image
    }
    if (project.image && project.image.startsWith("http")) {
      return project.image; // External image
    }
    // Fallback to Unsplash based on first tag or default
    const tag = project.tags?.[0]?.toLowerCase() || "technology";
    const imageMap = {
      ai: "photo-1677442136019-21780ecad995",
      quantum: "photo-1635070041078-e363dbe005cb",
      robotics: "photo-1485827404703-89b55fcc595e",
      space: "photo-1446776653964-20c1d3a81b06",
      philosophy: "photo-1481627834876-b7833e8f5570",
      systems: "photo-1557682250-33bd709cbe85",
      default: "photo-1518770660439-4636190af475",
    };
    const imageId =
      imageMap[tag] ||
      imageMap[tag.split(" ")[0]] ||
      imageMap.default;
    return `https://images.unsplash.com/${imageId}?w=800&q=80&auto=format&fit=crop&ixlib=rb-4.0.3`;
  };

  const imageUrl = getImageUrl();

  return (
    <ProjectPreview project={project}>
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg flex flex-col">
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={project.title || "Project"}
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
            unoptimized
            priority={project.featured}
          />
        )}
        {/* Category Badge */}
        {project.category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white/90 dark:bg-zinc-900/90 text-palette-primary dark:text-zinc-200 backdrop-blur-sm border border-zinc-200 dark:border-zinc-700">
              {project.category}
            </span>
          </div>
        )}
        {/* Status Badge */}
        {project.status && (
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                project.status === "active"
                  ? "bg-green-500/90 text-white"
                  : project.status === "completed"
                  ? "bg-brand-500/90 text-white"
                  : "bg-zinc-500/90 text-white"
              }`}
            >
              {project.status}
            </span>
          </div>
        )}
        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-500/90 text-white backdrop-blur-sm">
              Featured
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-6 flex flex-col">
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Technologies */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-0.5 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-palette-secondary dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Metrics */}
          {project.metrics && (
            <div className="mb-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.metrics.users && (
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                      <svg
                        className="w-4 h-4 text-brand-500 dark:text-brand-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                      <div className="text-xs font-medium text-palette-secondary dark:text-zinc-500 uppercase tracking-wide">
                        Users
                      </div>
                    </div>
                    <div className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                      {project.metrics.users}
                    </div>
                  </div>
                )}
                {project.metrics.revenue && (
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                      <svg
                        className="w-4 h-4 text-brand-500 dark:text-brand-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div className="text-xs font-medium text-palette-secondary dark:text-zinc-500 uppercase tracking-wide">
                        Revenue
                      </div>
                    </div>
                    <div className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                      {project.metrics.revenue}
                    </div>
                  </div>
                )}
                {project.metrics.impact && (
                  <div className="text-center sm:text-left col-span-2 sm:col-span-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                      <svg
                        className="w-4 h-4 text-brand-500 dark:text-brand-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <div className="text-xs font-medium text-palette-secondary dark:text-zinc-500 uppercase tracking-wide">
                        Impact
                      </div>
                    </div>
                    <div className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                      {project.metrics.impact}
                    </div>
                  </div>
                )}
                {project.metrics.companies && (
                  <div className="text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
                      <svg
                        className="w-4 h-4 text-brand-500 dark:text-brand-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <div className="text-xs font-medium text-palette-secondary dark:text-zinc-500 uppercase tracking-wide">
                        Companies
                      </div>
                    </div>
                    <div className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                      {project.metrics.companies}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
          {project.date && (
            <span className="text-xs text-palette-secondary dark:text-zinc-500">
              {formatDate(project.date)}
            </span>
          )}
          <div className="flex items-center gap-3">
            {project.slug ? (
              <Link
                href={`/projects/${project.slug}/`}
                className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1"
              >
                Read more
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ) : project.href ? (
              <Link
                href={project.href}
                target={project.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  project.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1"
              >
                View project
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            ) : null}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
    </ProjectPreview>
  );
}



