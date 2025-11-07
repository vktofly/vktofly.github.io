import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import BlogPostCard from "../components/BlogPostCard";
import FeaturedBlogPost from "../components/FeaturedBlogPost";
import TimelinePreview from "../components/TimelinePreview";
import SectionDivider from "../components/SectionDivider";
import ProfilePhoto from "../components/ProfilePhoto";
import JsonLd from "../components/JsonLd";
import Container from "../components/Container";
import AnimatedStat from "../components/AnimatedStat";
import FadeInSection from "../components/FadeInSection";
import { generateOgImageMetadata } from "../lib/og-images";
import { getAllPostsMeta } from "../lib/blog";
import projects from "../data/projects";
import profile from "../data/profile";
import socials from "../data/socials";
import skills from "../data/skills";
import experience from "../data/experience";

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

export default async function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 2);
  const allPosts = await getAllPostsMeta();
  // Featured post: longest/most comprehensive post, or first one
  const featuredPost =
    allPosts.length > 0
      ? allPosts.reduce((prev, current) =>
          (current.words || 0) > (prev.words || 0) ? current : prev
        )
      : null;
  // Latest posts excluding featured
  const latestPosts = allPosts
    .filter((p) => p.slug !== featuredPost?.slug)
    .slice(0, 3);

  return (
    <>
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

      {/* Hero Section */}
      <Section className="pt-12 sm:pt-16 pb-8 sm:pb-12">
        <Container>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto] lg:gap-12">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-tight">
                  <span className="text-palette-primary">{profile.name}</span>
                  <br />
                  <span className="text-palette-secondary text-2xl sm:text-3xl md:text-4xl">
                    {profile.role}
                  </span>
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl text-palette-secondary leading-relaxed max-w-2xl">
                  {profile.headline}
                </p>
              </div>

              <p className="text-base sm:text-lg text-palette-secondary leading-relaxed max-w-2xl">
                {profile.summary}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="/projects/"
                  className="inline-flex items-center justify-center rounded-md bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  View Projects
                </a>
                <a
                  href="/about/"
                  className="inline-flex items-center justify-center rounded-md border-2 border-zinc-300 dark:border-zinc-700 text-palette-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 px-6 py-3 font-medium transition-colors"
                >
                  Learn More
                </a>
                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-md border-2 border-brand-500 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 px-6 py-3 font-medium transition-colors"
                >
                  Contact
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-4 pt-2">
                <span className="text-sm text-palette-secondary">Connect:</span>
                <div className="flex items-center gap-3">
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    aria-label="GitHub"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </a>
                  <a
                    href={socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    aria-label="X (Twitter)"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href={socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${socials.email}`}
                    className="text-palette-secondary hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                    aria-label="Email"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Photo */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <ProfilePhoto
                  size={200}
                  className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[220px] md:h-[220px]"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider variant="infinity" />

      {/* Featured Quote/Philosophy Section */}
      <Section className="py-16 sm:py-20 bg-gradient-to-b from-zinc-50 via-zinc-50/50 to-transparent dark:from-zinc-900/50 dark:via-zinc-900/30 dark:to-transparent relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-light italic text-palette-primary leading-relaxed mb-6">
              "Knowledge is the only infinite resource — and the only one that
              creates every other resource."
            </blockquote>
            <p className="text-base sm:text-lg text-palette-secondary">
              — The Infinite Growth Principle
            </p>
            <div className="mt-8">
              <a
                href="/vision/"
                className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:underline font-medium"
              >
                Explore the philosophy
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <FadeInSection>
        <Section className="py-12 sm:py-16 bg-zinc-50 dark:bg-zinc-900/30 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-50/20 to-transparent dark:via-brand-950/10 pointer-events-none" />
          <Container className="relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              <AnimatedStat value="23+" label="Companies Founded" suffix="+" />
              <AnimatedStat value="20+" label="Years Experience" suffix="+" />
              <AnimatedStat value="5+" label="Domains" suffix="+" />
              <AnimatedStat value="∞" label="Infinite Growth" />
            </div>
          </Container>
        </Section>
      </FadeInSection>

      <SectionDivider variant="geometric" />

      {/* Featured Principle Section */}
      <FadeInSection delay={100}>
        <Section className="py-12 sm:py-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-lg border-2 border-brand-200 dark:border-brand-800 bg-brand-50/50 dark:bg-brand-950/30 p-8 sm:p-10">
                <div className="text-center mb-4">
                  <span className="text-sm font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wide">
                    Core Principle
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-palette-primary text-center mb-4">
                  Truth is the foundation of all progress.
                </h2>
                <p className="text-base sm:text-lg text-palette-secondary text-center leading-relaxed">
                  Illusions may comfort, but only truth compounds.
                </p>
                <div className="mt-6 text-center">
                  <a
                    href="/about/#principles"
                    className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:underline font-medium text-sm"
                  >
                    View all principles
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </FadeInSection>

      <SectionDivider variant="minimal" />

      {/* Domain Expertise Tags */}
      {skills.length > 0 && (
        <FadeInSection delay={200}>
          <Section
            title="Core Domains"
            intro="Areas of deep expertise and exploration"
          >
            <Container>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group rounded-lg border-2 border-zinc-200 dark:border-zinc-800 px-5 py-3 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:shadow-md"
                  >
                    <h3 className="font-semibold text-base group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {skill.name}
                    </h3>
                    {skill.items && skill.items.length > 0 && (
                      <p className="text-xs text-palette-secondary mt-1">
                        {skill.items.slice(0, 2).join(", ")}
                        {skill.items.length > 2 && " +"}
                      </p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <a
                  href="/skills/"
                  className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:underline font-medium text-sm"
                >
                  View all skills
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </Container>
          </Section>
        </FadeInSection>
      )}

      <SectionDivider
        variant="quote"
        quote="Complexity arises from simplicity. The future is built from elegant primitives, not bloated constructs."
      />

      {/* Journey/Timeline Preview */}
      {experience.length > 0 && (
        <FadeInSection delay={300}>
          <Section title="Journey" intro="Key milestones across two decades">
            <Container>
              <TimelinePreview items={experience} maxItems={4} />
            </Container>
          </Section>
        </FadeInSection>
      )}

      <SectionDivider variant="pattern" />

      {/* Current Focus Section */}
      <FadeInSection delay={350}>
        <Section className="py-12 sm:py-16 bg-zinc-50 dark:bg-zinc-900/30 relative overflow-hidden">
          {/* Subtle pattern */}
          <div
            className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px),
                                linear-gradient(-45deg, currentColor 1px, transparent 1px)`,
              backgroundSize: "30px 30px",
            }}
          />
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6 text-center text-palette-primary">
                Current Focus (2025–2030)
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-brand-500 dark:hover:border-brand-500 transition-colors">
                  <h3 className="font-semibold text-base mb-2 text-palette-primary">
                    AI as Civilizational Substrate
                  </h3>
                  <p className="text-sm text-palette-secondary">
                    Designing AI systems as the new infrastructure of knowledge.
                  </p>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-brand-500 dark:hover:border-brand-500 transition-colors">
                  <h3 className="font-semibold text-base mb-2 text-palette-primary">
                    Autonomous Space Colonies
                  </h3>
                  <p className="text-sm text-palette-secondary">
                    Enabling self-replicating robotic systems for off-world
                    expansion.
                  </p>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-brand-500 dark:hover:border-brand-500 transition-colors">
                  <h3 className="font-semibold text-base mb-2 text-palette-primary">
                    Cognitive Architecture of Creativity
                  </h3>
                  <p className="text-sm text-palette-secondary">
                    Mapping how insight emerges in human and synthetic minds.
                  </p>
                </div>
                <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-5 hover:border-brand-500 dark:hover:border-brand-500 transition-colors">
                  <h3 className="font-semibold text-base mb-2 text-palette-primary">
                    Human Agency in the Age of AI
                  </h3>
                  <p className="text-sm text-palette-secondary">
                    Preserving choice and meaning in an automated civilization.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </FadeInSection>

      {/* Quick Navigation */}
      <FadeInSection delay={400}>
        <Section className="py-12 sm:py-16">
          <Container>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <a
                href="/about/"
                className="group rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="font-semibold text-lg mb-2 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  About
                </h3>
                <p className="text-sm text-palette-secondary">
                  Learn about my philosophy, mission, and work
                </p>
              </a>
              <a
                href="/projects/"
                className="group rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="font-semibold text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                  Projects
                </h3>
                <p className="text-sm text-palette-secondary">
                  Explore my technology ventures and research
                </p>
              </a>
              <a
                href="/blog/"
                className="group rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="font-semibold text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                  Blog
                </h3>
                <p className="text-sm text-palette-secondary">
                  Essays on knowledge, systems, and the future
                </p>
              </a>
              <a
                href="/vision/"
                className="group rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 hover:border-brand-500 dark:hover:border-brand-500 transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <h3 className="font-semibold text-lg group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
                  Vision
                </h3>
                <p className="text-sm text-palette-secondary">
                  The Infinite Growth Principle philosophy
                </p>
              </a>
            </div>
          </Container>
        </Section>
      </FadeInSection>

      <SectionDivider variant="minimal" />

      {/* Featured Blog Post */}
      {featuredPost && (
        <FadeInSection delay={500}>
          <Section>
            <Container>
              <FeaturedBlogPost post={featuredPost} />
            </Container>
          </Section>
        </FadeInSection>
      )}

      <SectionDivider variant="geometric" />

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
        <FadeInSection delay={600}>
          <Section title="Latest Writing" intro="Recent essays and thoughts">
            <Container>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {latestPosts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
              {allPosts.length > (featuredPost ? 4 : 3) && (
                <div className="mt-8 text-center">
                  <a
                    href="/blog/"
                    className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:underline font-medium"
                  >
                    View all posts
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </Container>
          </Section>
        </FadeInSection>
      )}

      <SectionDivider
        variant="quote"
        quote="Systems outlive goals. Design the mechanism of growth, not just its milestone."
      />

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <FadeInSection delay={700}>
          <Section title="Featured Projects" intro="Selected work and research">
            <Container>
              <div className="grid sm:grid-cols-2 gap-6">
                {featuredProjects.map((p) => (
                  <ProjectCard key={p.title} project={p} />
                ))}
              </div>
              {projects.length > 2 && (
                <div className="mt-8 text-center">
                  <a
                    href="/projects/"
                    className="inline-flex items-center text-brand-600 dark:text-brand-400 hover:underline font-medium"
                  >
                    View all projects
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </Container>
          </Section>
        </FadeInSection>
      )}

      <SectionDivider variant="infinity" />

      {/* Call-to-Action Section */}
      <FadeInSection delay={800}>
        <Section className="py-16 sm:py-20 bg-gradient-to-b from-transparent via-zinc-50/50 to-zinc-50 dark:via-zinc-900/30 dark:to-zinc-900/30 relative overflow-hidden">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-50/10 via-transparent to-transparent dark:from-brand-950/5 pointer-events-none" />
          <Container className="relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-palette-primary">
                Let's Build the Future Together
              </h2>
              <p className="text-lg sm:text-xl text-palette-secondary mb-8 leading-relaxed">
                Whether you're exploring collaboration, seeking insights on
                systems thinking, or interested in advancing civilization-scale
                technologies, I'd love to connect.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-md bg-brand-500 hover:bg-brand-600 text-white px-8 py-3 font-medium transition-colors shadow-sm hover:shadow-md"
                >
                  Get in Touch
                </a>
                <a
                  href="/about/"
                  className="inline-flex items-center justify-center rounded-md border-2 border-zinc-300 dark:border-zinc-700 text-palette-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 px-8 py-3 font-medium transition-colors"
                >
                  Learn More
                </a>
              </div>
            </div>
          </Container>
        </Section>
      </FadeInSection>
    </>
  );
}
