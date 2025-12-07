import Section from "../../components/Section";
import Container from "../../components/Container";
import SectionDivider from "../../components/SectionDivider";
import Image from "next/image";
import ResourcesFilter from "./ResourcesFilter";
import JsonLd from "../../components/JsonLd";
import { generateOgImageMetadata } from "../../lib/og-images";
import books from "../../data/books";
import podcasts from "../../data/podcasts";
import videos from "../../data/videos";
import influentialPeople from "../../data/influentialPeople";

export const metadata = {
  title: "Resources — Vikash",
  description:
    "A curated collection of books, podcasts, videos, and influential people that have shaped my thinking, philosophy, and work. Knowledge compounds infinitely through better explanations.",
  keywords: [
    "resources",
    "books",
    "podcasts",
    "videos",
    "learning",
    "knowledge",
    "curated",
    "epistemology",
    "philosophy",
    "AI",
    "systems thinking",
    "infinite growth",
    "knowledge management",
    "learning resources for founders",
    "autodidact curriculum",
    "intellectual tools",
  ],
  openGraph: {
    title: "Resources — Vikash",
    description:
      "A curated collection of books, podcasts, videos, and influential people that have shaped my thinking and work.",
    url: "https://vktofly.github.io/resources/",
    images: [generateOgImageMetadata("resources", null, "Resources — Vikash")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources — Vikash",
    description: "Curated tools for thought and knowledge creation.",
    creator: "@vktofly1",
    site: "@vktofly1",
    images: [generateOgImageMetadata("resources", null, "Resources — Vikash").url],
  },
  alternates: {
    canonical: "/resources/",
  },
};

export default function ResourcesPage() {
  // Calculate stats
  const totalResources = books.length + podcasts.length + videos.length + influentialPeople.length;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Resources & Tools for Thought",
          "description": "Curated collection of books, podcasts, and influential thinkers.",
          "url": "https://vktofly.github.io/resources/",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "url": "https://vktofly.github.io/books/",
                "name": "Books"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "url": "https://vktofly.github.io/people/",
                "name": "Influential People"
              }
            ]
          }
        }}
      />
      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
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

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 leading-tight">
              Resources
            </h1>
            <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              A curated collection of books, podcasts, videos, and influential people that have shaped my thinking, philosophy, and work. Each resource represents a node in the knowledge compounding system—selected not for popularity, but for their ability to create better explanations and enable further creation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-2 text-sm">
              <a href="/books/" className="text-brand-600 dark:text-brand-400 hover:underline">
                Browse Books →
              </a>
              <span className="text-palette-secondary dark:text-zinc-500">•</span>
              <a href="/people/" className="text-brand-600 dark:text-brand-400 hover:underline">
                Influential People →
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {totalResources}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">
                  Total Resources
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {books.length}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">Books</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {podcasts.length}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">Podcasts</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {videos.length}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">Videos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {influentialPeople.length}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">People</div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section
        title="All Resources"
        intro="Browse by type, category, or search across all resources"
        className="relative overflow-hidden"
      >
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <ResourcesFilter
            books={books}
            podcasts={podcasts}
            videos={videos}
            people={influentialPeople}
          />
        </Container>
      </Section>
    </>
  );
}

