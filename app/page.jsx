import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import ProfilePhoto from "../components/ProfilePhoto";
import JsonLd from "../components/JsonLd";
import { generateOgImageMetadata } from "../lib/og-images";
import projects from "../data/projects";
import profile from "../data/profile";
import socials from "../data/socials";

export const metadata = {
  title: "Vikash — Polymath, Futurist & Founder",
  description:
    "Polymath entrepreneur, physicist, and AI researcher. Building systems of infinite growth through knowledge creation, AI, quantum computing, and civilization-scale thinking.",
  openGraph: {
    title: "Vikash — Polymath, Futurist & Founder",
    description: "Building Systems of Infinite Growth",
    url: "https://vktofly.github.io",
    images: [
      generateOgImageMetadata(
        "default",
        null,
        "Vikash — Polymath, Futurist & Founder"
      ),
    ],
  },
};

export default function HomePage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.role,
          description: profile.summary,
          url: "https://vktofly.github.io",
          email: profile.email,
          image: "https://vktofly.github.io/proflephoto/profile%20photo.jpg",
          sameAs: [socials.github, socials.twitter, socials.linkedin],
          knowsAbout: [
            "Artificial Intelligence",
            "Quantum Computing",
            "Robotics",
            "Space Systems",
            "Epistemology",
            "Systems Thinking",
            "Entrepreneurship",
            "Physics",
          ],
          alumniOf: "Multiple ventures and research institutions",
          founder: "23+ technology companies",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vikash",
          url: "https://vktofly.github.io",
          description: profile.summary,
          author: {
            "@type": "Person",
            name: profile.name,
          },
        }}
      />
      <div className="grid items-center gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
            {profile.name} — {profile.role}
          </h1>
          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8">
            {profile.headline}
          </p>
          <div className="flex items-center gap-3">
            <a
              href="/projects/"
              className="inline-flex items-center rounded-md bg-brand-500 hover:bg-brand-600 text-white px-4 py-2"
            >
              View Projects
            </a>
            <a
              href="/contact/"
              className="inline-flex items-center rounded-md border border-brand-500 text-brand-600 hover:bg-brand-50 dark:hover:bg-zinc-900 px-4 py-2"
            >
              Contact
            </a>
          </div>
        </div>
        <div className="flex md:justify-end justify-center">
          <ProfilePhoto size={180} />
        </div>
      </div>

      <Section title="Featured Projects" className="pt-8">
        <div className="grid sm:grid-cols-2 gap-6">
          {projects.slice(0, 2).map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </Section>
    </div>
  );
}
