"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectPreview({ project, children }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      
      {/* Hover Preview Overlay */}
      {isHovered && (project.longDescription || project.metrics || project.technologies) && (
        <div className="absolute inset-0 z-50 bg-white dark:bg-zinc-900 rounded-xl border-2 border-brand-500 dark:border-brand-600 shadow-soft-lg p-6 overflow-y-auto max-h-[600px] animate-fade-in backdrop-blur-sm">
          <div className="space-y-4">
            {/* Header */}
            <div>
              <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 mb-2">
                {project.title}
              </h3>
              {project.category && (
                <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-brand-500/10 dark:bg-brand-600/20 text-brand-600 dark:text-brand-400">
                  {project.category}
                </span>
              )}
            </div>

            {/* Description */}
            {project.longDescription ? (
              <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                {project.longDescription}
              </p>
            ) : project.description ? (
              <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                {project.description}
              </p>
            ) : null}

            {/* Tags */}
            {project.tags && project.tags.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-palette-primary dark:text-zinc-200 mb-2 uppercase tracking-wide">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 rounded-md text-xs font-medium border border-zinc-200 dark:border-zinc-700 text-palette-secondary dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-palette-primary dark:text-zinc-200 mb-2 uppercase tracking-wide">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Metrics */}
            {project.metrics && (
              <div>
                <h4 className="text-xs font-semibold text-palette-primary dark:text-zinc-200 mb-2 uppercase tracking-wide">
                  Impact
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-xs text-palette-secondary dark:text-zinc-500 uppercase tracking-wide">
                        {key}
                      </div>
                      <div className="text-lg font-bold text-palette-primary dark:text-zinc-100">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800">
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
                  target="_blank"
                  rel="noopener noreferrer"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

