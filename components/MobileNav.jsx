"use client";

import { useState } from "react";
import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/experience/", label: "Experience" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/skills/", label: "Skills" },
  { href: "/vision/", label: "Vision" },
  { href: "/contact/", label: "Contact" },
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

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
          <nav className="fixed top-16 left-0 right-0 bg-white dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 z-50 md:hidden shadow-lg">
            <div className="px-4 py-4 space-y-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-brand-600"
                >
                  {item.label}
                </Link>
              ))}
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

