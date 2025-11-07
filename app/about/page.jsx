import Section from "../../components/Section";
import Prose from "../../components/Prose";
import ProfilePhoto from "../../components/ProfilePhoto";
import JsonLd from "../../components/JsonLd";
import ReadingProgress from "../../components/ReadingProgress";
import Toc from "../../components/Toc";
import BackToTop from "../../components/BackToTop";
import { generateOgImageMetadata } from "../../lib/og-images";
import profile from "../../data/profile";
import { loadMarkdownAsHtml } from "../../lib/markdown";

export const metadata = {
  title: "About — Vikash",
  description:
    "Polymath entrepreneur, physicist, and AI researcher. Across two decades, I've founded 23+ technology ventures across AI, quantum computing, robotics, and space systems. Exploring how knowledge evolves and how humanity can evolve with it.",
  keywords: [
    "Vikash",
    "about",
    "polymath",
    "entrepreneur",
    "physicist",
    "AI researcher",
    "founder",
    "quantum computing",
    "robotics",
    "space systems",
    "epistemology",
    "infinite growth",
  ],
  openGraph: {
    title: "About — Vikash",
    description:
      "Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth.",
    url: "https://vktofly.github.io/about/",
    type: "profile",
    images: [generateOgImageMetadata("about", null, "About — Vikash")],
  },
  alternates: {
    canonical: "/about/",
  },
};

export default async function AboutPage() {
  const html = await loadMarkdownAsHtml("aboutme");
  return (
    <>
      <ReadingProgress targetId="about-content" />
      <BackToTop />
      <Section title="About" intro="Polymath, Founder">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: profile.name,
            jobTitle: profile.role,
            description: profile.summary,
            url: "https://vktofly.github.io/about/",
            email: profile.email,
            image: "https://vktofly.github.io/proflephoto/profile%20photo.jpg",
            sameAs: [
              "https://github.com/vktofly",
              "https://x.com/vktofly1",
              "https://linkedin.com/in/vktofly",
            ],
            knowsAbout: [
              "Artificial Intelligence",
              "Quantum Computing",
              "Robotics",
              "Space Systems",
              "Epistemology",
              "Systems Thinking",
              "Entrepreneurship",
              "Physics",
              "Cognitive Science",
            ],
            alumniOf: "Multiple ventures and research institutions",
            founder: "23+ technology companies",
          }}
        />

        {/* Quick Summary Cards */}
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-8 sm:mb-10">
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg text-palette-primary">
              TL;DR
            </h3>
            <p className="text-sm sm:text-base text-palette-secondary leading-relaxed">
              I believe civilization is a self-evolving system of explanations —
              and progress is the acceleration of that evolution. Knowledge, not
              capital, is the only resource that compounds infinitely, and every
              company, algorithm, or philosophy that deepens understanding
              becomes part of civilization's codebase. My work explores how
              technology — especially AI, quantum computation, and cognitive
              systems — can be designed to make knowledge create more knowledge,
              enabling human and machine intelligence to co-evolve toward
              open-ended growth. The ultimate goal: to make civilization
              self-improving, self-correcting, and self-aware.
            </p>
          </div>
          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 bg-white dark:bg-zinc-950">
            <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg text-palette-primary">
              Now
            </h3>
            <ul className="list-disc list-inside text-sm sm:text-base text-palette-secondary space-y-1.5 sm:space-y-2 leading-relaxed">
              <li>
                AI as Civilizational Infrastructure: Designing autonomous
                cognitive systems that learn, reason, and explain — not just
                predict.
              </li>
              <li>
                Quantum Epistemology: Exploring how computation, probability,
                and explanation intersect at the quantum scale.
              </li>
              <li>
                Cognitive Architecture & Flow Systems: Developing MyPrinciple, a
                recursive framework for aligning human creativity with systems
                thinking and knowledge creation.
              </li>
              <li>
                Autonomous Space Systems: Engineering self-replicating robotic
                and AI ecosystems for off-world industry and exploration.
              </li>
              <li>
                Integrative Civilization Design: Synthesizing philosophy,
                systems theory, and engineering into a unified science of
                progress.
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="mb-8 sm:mb-10 flex justify-center">
          <ProfilePhoto
            size={140}
            className="sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px]"
          />
        </div>

        {/* Connect Section - Extracted and Prominent */}
        <div className="mb-8 sm:mb-10 rounded-lg border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/30 p-5 sm:p-6">
          <h3 className="font-semibold mb-4 text-lg sm:text-xl text-palette-primary">
            Connect
          </h3>
          <div className="flex flex-wrap gap-4 sm:gap-6">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 text-sm sm:text-base text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
              aria-label="Email"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email
            </a>
            <a
              href="https://github.com/vktofly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://x.com/vktofly1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
              aria-label="X (Twitter)"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              X (Twitter)
            </a>
            <a
              href="https://linkedin.com/in/vktofly"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm sm:text-base text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors font-medium"
              aria-label="LinkedIn"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        {/* Main Content with TOC */}
        <div className="grid gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block md:sticky md:top-24 self-start print:hidden">
            <Toc rootId="about-content" />
          </div>
          <div id="about-content" className="max-w-3xl">
            <Prose html={html} />
          </div>
        </div>
      </Section>
    </>
  );
}
