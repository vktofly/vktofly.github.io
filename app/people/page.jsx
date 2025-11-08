import Section from "../../components/Section";
import Container from "../../components/Container";
import SectionDivider from "../../components/SectionDivider";
import Image from "next/image";
import PeopleFilter from "./PeopleFilter";
import { generateOgImageMetadata } from "../../lib/og-images";
import influentialPeople from "../../data/influentialPeople";

export const metadata = {
  title: "Influential People — Vikash",
  description:
    "People whose ideas, work, and philosophy have shaped my thinking and approach. From David Deutsch's epistemology to Krishnamurti's freedom from the known, these thinkers form the intellectual network that informs my work.",
  keywords: [
    "influential people",
    "philosophers",
    "technologists",
    "entrepreneurs",
    "David Deutsch",
    "Krishnamurti",
    "Nietzsche",
    "Naval Ravikant",
    "Ray Kurzweil",
    "Leonardo da Vinci",
    "influences",
    "intellectual network",
  ],
  openGraph: {
    title: "Influential People — Vikash",
    description:
      "People whose ideas, work, and philosophy have shaped my thinking and approach.",
    url: "https://vktofly.github.io/people/",
    images: [generateOgImageMetadata("people", null, "Influential People — Vikash")],
  },
  alternates: {
    canonical: "/people/",
  },
};

export default function PeoplePage() {
  // Group people by category
  const peopleByCategory = {
    philosopher: influentialPeople.filter((p) => p.category === "philosopher"),
    technologist: influentialPeople.filter((p) => p.category === "technologist"),
    entrepreneur: influentialPeople.filter((p) => p.category === "entrepreneur"),
    historical: influentialPeople.filter((p) => p.category === "historical"),
  };

  return (
    <>
      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 leading-tight">
              Influential People
            </h1>
            <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              People whose ideas, work, and philosophy have shaped my thinking and approach. Each person represents a node in the intellectual network that informs my work—from epistemology and philosophy to technology and entrepreneurship.
            </p>
            <div className="flex flex-wrap justify-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {influentialPeople.length}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">
                  Influential Thinkers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {peopleByCategory.philosopher.length}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">
                  Philosophers
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-brand-600 dark:text-brand-400">
                  {peopleByCategory.technologist.length + peopleByCategory.entrepreneur.length}
                </div>
                <div className="text-sm text-palette-secondary dark:text-zinc-500">
                  Builders
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section
        title="All People"
        intro="Browse by category or use search to find specific people and their ideas"
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

        <Container className="relative z-10">
          <PeopleFilter people={influentialPeople} />
        </Container>
      </Section>
    </>
  );
}

