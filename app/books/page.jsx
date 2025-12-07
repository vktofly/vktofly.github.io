import BooksPageClient from "./BooksPageClient";
import { generateOgImageMetadata } from "../../lib/og-images";
import JsonLd from "../../components/JsonLd";
import books from "../../data/books";

export const metadata = {
  title: "Books — Vikash",
  description:
    "A curated collection of books that have shaped my thinking, philosophy, and work. Each book represents a node in the knowledge compounding system—from epistemology and philosophy to AI, systems thinking, and entrepreneurship.",
  keywords: [
    "books",
    "reading",
    "epistemology",
    "philosophy",
    "knowledge",
    "learning",
    "David Deutsch",
    "Krishnamurti",
    "Nietzsche",
    "Naval Ravikant",
    "infinite growth",
    "knowledge compounding",
    "intellectual curriculum",
    "founder reading list",
    "polymath library",
    "autodidact resources",
    "mental models",
  ],
  openGraph: {
    title: "Books — Vikash",
    description:
      "A curated collection of books that have shaped thinking, philosophy, and work. Knowledge compounds infinitely.",
    url: "https://vktofly.github.io/books/",
    images: [generateOgImageMetadata("books", null, "Books — Vikash")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Books — Vikash",
    description: "A curated library for the infinite learner.",
    creator: "@vktofly1",
    site: "@vktofly1",
    images: [generateOgImageMetadata("books", null, "Books — Vikash").url],
  },
  alternates: {
    canonical: "/books/",
  },
};

// Category definitions
const categories = [
  { id: "epistemology", label: "Epistemology", icon: "📚", description: "The theory of how knowledge grows and evolves" },
  { id: "philosophy", label: "Philosophy", icon: "🧠", description: "Deep questions about consciousness, freedom, and meaning" },
  { id: "ai", label: "AI & Technology", icon: "🤖", description: "Artificial intelligence, singularity, and the future of technology" },
  { id: "systems", label: "Systems Thinking", icon: "⚙️", description: "Understanding complexity, leverage points, and system design" },
  { id: "entrepreneurship", label: "Entrepreneurship", icon: "💼", description: "Leverage, wealth creation, and building scalable systems" },
  { id: "physics", label: "Physics", icon: "⚛️", description: "Quantum theory, computation, and the fabric of reality" },
];

// Category background images
const categoryBackgrounds = {
  epistemology: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3",
  philosophy: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3",
  ai: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3",
  systems: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3",
  entrepreneurship: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3",
  physics: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3",
};

export default function BooksPage() {
  // Calculate stats
  const totalBooks = books.length;
  const highImpactBooks = books.filter((b) => b.impact === "high").length;
  const paradigmShiftBooks = books.filter((b) => b.paradigmShift).length;
  const currentlyReading = books.filter((b) => b.readingStatus === "reading");
  // Foundational books: The Beginning of Infinity and The Rational Optimist
  const foundationalBooks = books.filter((b) => 
    b.slug === "the-beginning-of-infinity" || 
    b.slug === "the-rational-optimist" ||
    (b.impact === "high" && !b.paradigmShift && b.slug !== "the-beginning-of-infinity" && b.slug !== "the-rational-optimist")
  );
  const highImpact = books.filter((b) => b.impact === "high");
  const paradigmShifts = books.filter((b) => b.paradigmShift);

  // Group books by category
  const booksByCategory = categories.map((category) => ({
    ...category,
    books: books.filter((b) => b.category === category.id),
  })).filter((cat) => cat.books.length > 0);

  // Navigation sections
  const navigationSections = booksByCategory.map((cat) => ({
    id: `category-${cat.id}`,
    label: cat.label,
  }));

  // Generate structured data for books
  const booksStructuredData = books.map((book) => ({
    "@context": "https://schema.org",
    "@type": "Book",
    "name": book.title,
    "author": {
      "@type": "Person",
      "name": book.author
    },
    "datePublished": book.year?.toString(),
    "description": book.whyItMatters,
    "genre": book.category,
    "image": book.coverImage,
    "url": `https://vktofly.github.io/books/${book.slug}/`,
    "publisher": book.publisher || undefined,
    "isbn": book.isbn || undefined,
    "inLanguage": "en",
    "about": book.tags,
    "review": {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Vikash"
      },
      "reviewBody": book.whyItMatters,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": book.impact === "high" ? "5" : "4",
        "bestRating": "5"
      }
    }
  }));

  return (
    <BooksPageClient
      books={books}
      currentlyReading={currentlyReading}
      foundationalBooks={foundationalBooks}
      highImpact={highImpact}
      paradigmShifts={paradigmShifts}
      booksByCategory={booksByCategory}
      navigationSections={navigationSections}
      totalBooks={totalBooks}
      highImpactBooks={highImpactBooks}
      paradigmShiftBooks={paradigmShiftBooks}
    />
  );
}


