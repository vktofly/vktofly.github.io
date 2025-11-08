"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function BooksNavigation({ 
  sections, 
  currentlyReading,
  foundationalBooks,
  highImpactBooks,
  paradigmShifts 
}) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleSectionClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="text-sm text-palette-secondary dark:text-zinc-400 print:hidden">
      <div className="font-semibold mb-3 text-palette-primary dark:text-zinc-100">
        Explore Books
      </div>
      <ul className="space-y-2">
        {/* Quick Links */}
        {currentlyReading && currentlyReading.length > 0 && (
          <li>
            <a
              href="#currently-reading"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick("currently-reading");
              }}
              className="block hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Currently Reading
            </a>
          </li>
        )}
        {foundationalBooks && foundationalBooks.length > 0 && (
          <li>
            <a
              href="#foundational-books"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick("foundational-books");
              }}
              className="block hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Foundational Books
            </a>
          </li>
        )}
        {highImpactBooks && highImpactBooks.length > 0 && (
          <li>
            <a
              href="#high-impact"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick("high-impact");
              }}
              className="block hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              High Impact
            </a>
          </li>
        )}
        {paradigmShifts && paradigmShifts.length > 0 && (
          <li>
            <a
              href="#paradigm-shifts"
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick("paradigm-shifts");
              }}
              className="block hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
            >
              Paradigm Shifts
            </a>
          </li>
        )}

        {/* Category Sections */}
        {sections.length > 0 && (
          <>
            <li className="pt-2 mt-2 border-t border-zinc-200 dark:border-zinc-800">
              <span className="text-xs font-semibold text-palette-secondary dark:text-zinc-500 uppercase tracking-wide">
                Categories
              </span>
            </li>
            {sections.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSectionClick(section.id);
                    }}
                    className={`block transition-colors ${
                      isActive
                        ? "text-brand-600 dark:text-brand-400 font-medium"
                        : "hover:text-brand-600 dark:hover:text-brand-400"
                    }`}
                  >
                    {section.label}
                  </a>
                </li>
              );
            })}
          </>
        )}
      </ul>
    </nav>
  );
}

