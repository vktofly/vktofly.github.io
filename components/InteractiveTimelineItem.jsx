"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function InteractiveTimelineItem({ item, index, allSkills }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <li className="relative group">
      {/* Timeline dot - clickable */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute left-0 sm:left-8 -translate-x-1/2 sm:translate-x-0 top-6 z-10 focus:outline-none focus:ring-2 focus:ring-brand-500 rounded-full transition-all"
        aria-label={isExpanded ? "Collapse details" : "Expand details"}
        aria-expanded={isExpanded}
      >
        <div className={`w-4 h-4 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 flex items-center justify-center shadow-soft transition-all duration-200 ${
          isExpanded ? 'scale-150' : 'group-hover:scale-125'
        }`}>
          <div className={`w-2 h-2 rounded-full bg-white dark:bg-zinc-900 transition-transform duration-200 ${
            isExpanded ? 'scale-75' : ''
          }`} />
        </div>
      </button>

      {/* Content card */}
      <div className="ml-10 sm:ml-16">
        <div 
          className={`rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 transition-all duration-200 ${
            isExpanded 
              ? 'border-brand-500 dark:border-brand-600 shadow-soft-lg bg-zinc-50 dark:bg-zinc-800/50' 
              : 'hover:border-brand-500 dark:hover:border-brand-600 hover:shadow-soft-lg group-hover:bg-zinc-50/50 dark:group-hover:bg-zinc-800/50'
          }`}
        >
          {/* Header with Logo */}
          <div className="flex items-start gap-4 mb-4">
            {/* Company Logo */}
            {item.logo && (
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                  {item.logo.startsWith('http') || item.logo.startsWith('/') ? (
                    <Image
                      src={item.logo}
                      alt={item.company}
                      width={48}
                      height={48}
                      className="object-contain"
                      unoptimized
                    />
                  ) : (
                    <span className="text-lg font-bold text-brand-600 dark:text-brand-400">
                      {item.company.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-palette-primary dark:text-zinc-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors leading-tight">
                    {item.role}
                  </h3>
                  <p className="text-base font-medium text-palette-secondary dark:text-zinc-400 mt-1">
                    {item.company}
                  </p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 dark:bg-brand-600/20 text-brand-700 dark:text-brand-400 border border-brand-500/20 dark:border-brand-600/30">
                    {item.period}
                  </span>
                  {item.location && (
                    <span className="inline-flex items-center gap-1.5 text-xs text-palette-secondary dark:text-zinc-500">
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {item.location}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Achievement Badges */}
          {item.achievements && item.achievements.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {item.achievements.map((achievement, aIdx) => (
                <span
                  key={aIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-600/20 dark:to-emerald-600/20 text-green-700 dark:text-green-400 border border-green-500/20 dark:border-green-600/30"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {achievement}
                </span>
              ))}
            </div>
          )}

          {/* Summary - always visible */}
          {item.summary && (
            <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed mb-4">
              {item.summary}
            </p>
          )}

          {/* Expanded Details */}
          {isExpanded && (
            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 space-y-4 animate-fade-in">
              {/* Detailed Description */}
              {item.description && (
                <div>
                  <h4 className="text-sm font-semibold text-palette-primary dark:text-zinc-200 mb-2">
                    Details
                  </h4>
                  <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Key Achievements List */}
              {item.keyAchievements && item.keyAchievements.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-palette-primary dark:text-zinc-200 mb-2">
                    Key Achievements
                  </h4>
                  <ul className="space-y-2">
                    {item.keyAchievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-palette-secondary dark:text-zinc-400">
                        <span className="text-brand-500 dark:text-brand-400 mt-1 flex-shrink-0">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technologies Used */}
              {item.technologies && item.technologies.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-palette-primary dark:text-zinc-200 mb-2">
                    Technologies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {item.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Skills Integration */}
          {item.skills && item.skills.length > 0 && (
            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-palette-secondary dark:text-zinc-500 uppercase tracking-wide">
                  Related Skills
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.skills.map((skill, sIdx) => {
                  const skillExists = allSkills.some(s => 
                    s.toLowerCase().includes(skill.toLowerCase()) || 
                    skill.toLowerCase().includes(s.toLowerCase())
                  );
                  return skillExists ? (
                    <Link
                      key={sIdx}
                      href="/skills/"
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 hover:border-brand-500 dark:hover:border-brand-600 hover:text-brand-600 dark:hover:text-brand-400 transition-all duration-200"
                    >
                      {skill}
                      <svg
                        className="w-3 h-3 ml-1.5"
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
                  ) : (
                    <span
                      key={sIdx}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-palette-primary dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Expand/Collapse Indicator */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 text-xs font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors flex items-center gap-1"
          >
            {isExpanded ? (
              <>
                Show less
                <svg
                  className="w-3 h-3 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              </>
            ) : (
              <>
                Show more details
                <svg
                  className="w-3 h-3 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>
    </li>
  );
}

