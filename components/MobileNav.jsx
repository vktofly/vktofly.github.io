"use client";

import { useState } from "react";
import Link from "next/link";
import { UserIcon, BriefcaseIcon, RocketIcon, LightningIcon, BookIcon, UsersIcon, LibraryIcon } from "./Icons";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog/", label: "Blog" },
  { href: "/vision/", label: "Vision" },
  { href: "/contact/", label: "Contact" },
];

// Dropdown sections for mobile
const aboutItems = [
  { href: "/about/", label: "About Me", icon: <UserIcon /> },
  { href: "/experience/", label: "Experience", icon: <BriefcaseIcon /> },
];

const workItems = [
  { href: "/projects/", label: "Projects", icon: <RocketIcon /> },
  { href: "/skills/", label: "Skills", icon: <LightningIcon /> },
];

const resourcesItems = [
  { href: "/books/", label: "Books", icon: <BookIcon /> },
  { href: "/people/", label: "People", icon: <UsersIcon /> },
  { href: "/resources/", label: "All Resources", icon: <LibraryIcon /> },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-2 -mr-2 text-zinc-700 dark:text-zinc-300 hover:text-brand-600"
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <nav className="fixed top-16 left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-50 md:hidden shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto">
            <div className="px-4 py-4 space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* About Dropdown Section */}
              <div className="border-t border-zinc-200 dark:border-zinc-800 mt-2 pt-2">
                <button
                  onClick={() => setAboutOpen(!aboutOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>About</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${aboutOpen ? "rotate-180" : ""}`}
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
                </button>
                {aboutOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setAboutOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        <span className="text-palette-secondary dark:text-zinc-400">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Work Dropdown Section */}
              <div>
                <button
                  onClick={() => setWorkOpen(!workOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>Work</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${workOpen ? "rotate-180" : ""}`}
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
                </button>
                {workOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {workItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setWorkOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        <span className="text-palette-secondary dark:text-zinc-400">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Resources Dropdown Section */}
              <div>
                <button
                  onClick={() => setResourcesOpen(!resourcesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  <span>Resources</span>
                  <svg
                    className={`w-4 h-4 transition-transform ${resourcesOpen ? "rotate-180" : ""}`}
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
                </button>
                {resourcesOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setIsOpen(false);
                          setResourcesOpen(false);
                        }}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                      >
                        <span className="text-palette-secondary dark:text-zinc-400">
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="/resume.pdf"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 border-t border-zinc-200 dark:border-zinc-800 mt-2 pt-2"
              >
                Resume
              </a>
            </div>
          </nav>
        </>
      )}
    </>
  );
}

