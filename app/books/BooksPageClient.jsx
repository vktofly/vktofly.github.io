"use client";

import { useState } from "react";
import Section from "../../components/Section";
import Container from "../../components/Container";
import SectionDivider from "../../components/SectionDivider";
import Image from "next/image";
import BookCard from "../../components/BookCard";
import BooksFilter from "./BooksFilter";
import BooksNavigation from "./BooksNavigation";

// Category definitions
const categories = [
  { id: "epistemology", label: "Epistemology", icon: "📚", description: "The theory of how knowledge grows and evolves" },
  { id: "philosophy", label: "Philosophy", icon: "🧠", description: "Deep questions about consciousness, freedom, and meaning" },
  { id: "ai", label: "AI & Technology", icon: "🤖", description: "Artificial intelligence, singularity, and the future of technology" },
  { id: "systems", label: "Systems Thinking", icon: "⚙️", description: "Understanding complexity, leverage points, and system design" },
  { id: "entrepreneurship", label: "Entrepreneurship", icon: "💼", description: "Leverage, wealth creation, and building scalable systems" },
  { id: "physics", label: "Physics", icon: "⚛️", description: "Quantum theory, computation, and the fabric of reality" },
];

export default function BooksPageClient({
  books,
  currentlyReading,
  foundationalBooks,
  highImpact,
  paradigmShifts,
  booksByCategory,
  navigationSections,
  totalBooks,
  highImpactBooks,
  paradigmShiftBooks,
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 leading-tight">
              Books
            </h1>
            <blockquote className="text-xl sm:text-2xl text-palette-primary dark:text-zinc-200 font-light italic leading-relaxed">
              "Knowledge compounds infinitely when we focus on creating better explanations rather than just accumulating facts."
            </blockquote>
            <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              A curated collection of books that have shaped my thinking, philosophy, and work. Each book represents a node in the knowledge compounding system—from epistemology and philosophy to AI, systems thinking, and entrepreneurship.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{totalBooks}</div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">Books Read</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{highImpactBooks}</div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">High Impact</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">{paradigmShiftBooks}</div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">Paradigm Shifts</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Special Sections */}
      {currentlyReading.length > 0 && (
        <>
          <SectionDivider variant="geometric" />
          <Section
            id="currently-reading"
            title="Currently Reading"
            intro="Books I'm actively engaging with right now"
            className="relative overflow-hidden"
          >
            <Container className="relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {currentlyReading.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </Container>
          </Section>
        </>
      )}

      {foundationalBooks.length > 0 && (
        <>
          <SectionDivider variant="geometric" />
          <Section
            id="foundational-books"
            title="Foundational Books"
            intro="Books that form the foundation of my thinking and philosophy"
            className="relative overflow-hidden"
          >
            <Container className="relative z-10">
              <div className="grid sm:grid-cols-2 gap-6">
                {foundationalBooks.map((book) => (
                  <BookCard key={book.slug} book={book} />
                ))}
              </div>
            </Container>
          </Section>
        </>
      )}

      {/* Main Books Section with Navigation */}
      <SectionDivider variant="geometric" />
      <Section
        title="All Books"
        intro="Browse by category or use filters to find specific books"
        className="relative overflow-hidden"
      >
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <div className="relative z-10">
          {/* Two-column layout with collapsible sticky sidebar */}
          <div className={`grid gap-8 transition-all duration-300 ${isSidebarCollapsed ? "md:grid-cols-[0_1fr]" : "md:grid-cols-[240px_1fr]"}`}>
            {/* Sticky Sidebar Navigation */}
            <div
              className={`hidden md:block md:sticky md:top-24 self-start print:hidden transition-all duration-300 ${
                isSidebarCollapsed ? "md:w-0 md:overflow-hidden md:opacity-0 md:pointer-events-none" : "md:w-auto"
              }`}
            >
              <div className="relative pr-2">
                <BooksNavigation
                  sections={navigationSections}
                  currentlyReading={currentlyReading}
                  foundationalBooks={foundationalBooks}
                  highImpactBooks={highImpact}
                  paradigmShifts={paradigmShifts}
                />
                {/* Collapse Button */}
                <button
                  onClick={() => setIsSidebarCollapsed(true)}
                  className="absolute -right-3 top-0 w-6 h-6 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 z-10"
                  aria-label="Collapse sidebar"
                  title="Collapse sidebar"
                >
                  <svg
                    className="w-4 h-4 text-palette-secondary dark:text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Collapsed sidebar button (when sidebar is hidden) */}
            {isSidebarCollapsed && (
              <div className="hidden md:block md:sticky md:top-24 self-start print:hidden">
                <button
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md flex items-center justify-center transition-all duration-200 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                  aria-label="Expand sidebar"
                  title="Expand sidebar"
                >
                  <svg
                    className="w-5 h-5 text-palette-secondary dark:text-zinc-400"
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
                </button>
              </div>
            )}

            {/* Main Content */}
            <div className="min-w-0">
              <BooksFilter books={books} />

              {/* Category Sections */}
              {booksByCategory.map((category) => (
                <div key={category.id} id={`category-${category.id}`} className="mt-16 first:mt-0">
                  <div className="mb-8 pb-4 border-b-2 border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-3xl">{category.icon}</span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-palette-primary dark:text-zinc-100">
                        {category.label}
                      </h2>
                    </div>
                    {category.description && (
                      <p className="text-base text-palette-secondary dark:text-zinc-400 mt-2">
                        {category.description}
                      </p>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {category.books.map((book) => (
                      <BookCard key={book.slug} book={book} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

