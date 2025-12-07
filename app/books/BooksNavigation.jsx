"use client";

import { useState, useEffect, useMemo } from "react";

export default function BooksNavigation({ 
  sections, 
  currentlyReading,
  foundationalBooks,
  highImpactBooks,
  paradigmShifts 
}) {
  const [activeSection, setActiveSection] = useState(null);

  // Combine all sections into one unified list
  const allSections = useMemo(() => {
    const unifiedSections = [];
    
    if (currentlyReading && currentlyReading.length > 0) {
      unifiedSections.push({ id: "currently-reading", label: "Currently Reading" });
    }
    if (foundationalBooks && foundationalBooks.length > 0) {
      unifiedSections.push({ id: "foundational-books", label: "Foundational Books" });
    }
    if (highImpactBooks && highImpactBooks.length > 0) {
      unifiedSections.push({ id: "high-impact", label: "High Impact" });
    }
    if (paradigmShifts && paradigmShifts.length > 0) {
      unifiedSections.push({ id: "paradigm-shifts", label: "Paradigm Shifts" });
    }
    
    // Add category sections
    if (sections && sections.length > 0) {
      unifiedSections.push(...sections);
    }
    
    return unifiedSections;
  }, [sections, currentlyReading, foundationalBooks, highImpactBooks, paradigmShifts]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = allSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(allSections[i].id);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(allSections[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [allSections]);

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
        Sections
      </div>
      <ul className="space-y-1.5">
        {allSections.map((section) => {
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
      </ul>
    </nav>
  );
}

