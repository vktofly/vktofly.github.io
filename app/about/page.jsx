import Section from "../../components/Section";
import Prose from "../../components/Prose";
import ProfilePhoto from "../../components/ProfilePhoto";
import JsonLd from "../../components/JsonLd";
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
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 mb-8 sm:mb-10">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 bg-white dark:bg-zinc-950">
          <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
            TL;DR
          </h3>
          <p className="text-sm sm:text-base text-palette-secondary leading-relaxed">
            I believe civilization is a self-evolving system of explanations —
            and progress is the acceleration of that evolution. Knowledge, not
            capital, is the only resource that compounds infinitely, and every
            company, algorithm, or philosophy that deepens understanding becomes
            part of civilization's codebase. My work explores how technology —
            especially AI, quantum computation, and cognitive systems — can be
            designed to make knowledge create more knowledge, enabling human and
            machine intelligence to co-evolve toward open-ended growth. The
            ultimate goal: to make civilization self-improving, self-correcting,
            and self-aware.
          </p>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-4 sm:p-5 bg-white dark:bg-zinc-950">
          <h3 className="font-semibold mb-2 sm:mb-3 text-base sm:text-lg">
            Now
          </h3>
          <ul className="list-disc list-inside text-sm sm:text-base text-palette-secondary space-y-1.5 sm:space-y-2 leading-relaxed">
            <li>
              AI as Civilizational Infrastructure: Designing autonomous
              cognitive systems that learn, reason, and explain — not just
              predict.
            </li>
            <li>
              Quantum Epistemology: Exploring how computation, probability, and
              explanation intersect at the quantum scale.
            </li>
            <li>
              Cognitive Architecture & Flow Systems: Developing MyPrinciple, a
              recursive framework for aligning human creativity with systems
              thinking and knowledge creation.
            </li>
            <li>
              Autonomous Space Systems: Engineering self-replicating robotic and
              AI ecosystems for off-world industry and exploration.
            </li>
            <li>
              Integrative Civilization Design: Synthesizing philosophy, systems
              theory, and engineering into a unified science of progress.
            </li>
          </ul>
        </div>
      </div>
      <div className="mb-6 sm:mb-8 flex justify-center">
        <ProfilePhoto
          size={140}
          className="sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px]"
        />
      </div>
      <Prose html={html} />
    </Section>
  );
}
