"use client";

import { useState, useEffect } from "react";

export default function SkillsNavigation({ sections, selectedSection, setSelectedSection }) {
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset for sticky header

      // Find which section is currently in view
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
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleSectionClick = (sectionId) => {
    setSelectedSection(sectionId);
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

  if (selectedSection) {
    // If a section is selected via filter, show only that section
    const selected = sections.find((s) => s.id === selectedSection);
    if (selected) {
      return (
        <nav className="text-sm text-palette-secondary dark:text-zinc-400 print:hidden">
          <div className="font-semibold mb-3 text-palette-primary dark:text-zinc-100">
            Sections
          </div>
          <ul className="space-y-1.5">
            <li>
              <button
                onClick={() => {
                  setSelectedSection(null);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="text-left w-full hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
              >
                All Sections
              </button>
            </li>
            <li>
              <a
                href={`#${selected.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleSectionClick(selected.id);
                }}
                className="block text-brand-600 dark:text-brand-400 font-medium"
              >
                {selected.label}
              </a>
            </li>
          </ul>
        </nav>
      );
    }
  }

  return (
    <nav className="text-sm text-palette-secondary dark:text-zinc-400 print:hidden">
      <div className="font-semibold mb-3 text-palette-primary dark:text-zinc-100">
        Sections
      </div>
      <ul className="space-y-1.5">
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
      </ul>
    </nav>
  );
}

