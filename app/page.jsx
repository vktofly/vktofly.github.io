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
  // Featured post: explicit featured flag, or longest/most comprehensive post
  const featuredPost =
    allPosts.length > 0
      ? allPosts.find((p) => p.featured) ||
        allPosts.reduce((prev, current) =>
          (current.words || 0) > (prev.words || 0) ? current : prev
        )
      : null;
  // Latest posts excluding featured
  const latestPosts = allPosts
    .filter((p) => p.slug !== featuredPost?.slug)
    .slice(0, 3);

  return (
    <>


      <div className="fixed inset-0 z-0 bg-stars pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-nebula opacity-30 pointer-events-none" />

      {/* Hero Section */}
      <Section className="pt-16 sm:pt-20 pb-12 sm:pb-16 relative overflow-hidden">
        {/* Subtle background gradient - adjusted for cosmic visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-50/50 dark:from-transparent dark:via-transparent dark:to-transparent pointer-events-none" />
        <Container className="relative z-10">
          <div className="grid items-center gap-12 md:grid-cols-[1fr_auto] lg:gap-16">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-5">
                <div className="space-y-3">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                    <span className="text-palette-primary dark:text-white">
                      {profile.name}
                    </span>
                  </h1>
                  <p className="text-xl sm:text-2xl md:text-3xl font-medium text-palette-secondary dark:text-zinc-400 leading-relaxed">
                    {profile.role}
                  </p>
                </div>
                <p className="text-lg sm:text-xl md:text-2xl text-palette-primary dark:text-zinc-200 font-light leading-relaxed max-w-2xl">
                  {profile.headline}
                </p>
              </div>

              <p className="text-base sm:text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl">
                {profile.summary}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="/projects/"
                  className="group inline-flex items-center justify-center rounded-lg bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white px-7 py-3.5 font-medium transition-all duration-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
                >
                  View Projects
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
                <a
                  href="/about/"
                  className="inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-7 py-3.5 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Learn More
                </a>
                <a
                  href="/contact/"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-brand-500 dark:border-brand-600 text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950/30 px-7 py-3.5 font-medium transition-all duration-200"
                >
                  Contact
                </a>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-5 pt-4">
                <span className="text-sm font-medium text-palette-secondary dark:text-zinc-500">
                  Connect:
                </span>
                <div className="flex items-center gap-4">
                  <a
                    href={socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
                    className="text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
                    className="text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
                    className="text-palette-secondary dark:text-zinc-500 hover:text-brand-600 dark:hover:text-brand-400 transition-colors duration-200 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-transparent rounded-full blur-2xl" />
                <ProfilePhoto
                  size={200}
                  className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] md:w-[240px] md:h-[240px] border-2 border-zinc-200 dark:border-zinc-800 shadow-soft-lg"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <SectionDivider variant="infinity" />

      {/* Featured Quote/Philosophy Section */}
      <Section className="py-20 sm:py-24 bg-gradient-to-b from-zinc-50/80 via-white to-transparent dark:from-transparent dark:via-white/5 dark:to-transparent relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-3xl sm:text-4xl md:text-5xl font-light italic text-palette-primary dark:text-zinc-100 leading-relaxed mb-8 px-4">
              &ldquo;Knowledge is the only infinite resource — and the only one that
              creates every other resource.&rdquo;
            </blockquote>
            <p className="text-base sm:text-lg text-palette-secondary dark:text-zinc-400 font-medium mb-10">
              — The Infinite Growth Principle
            </p>
            <div className="mt-10">
              <a
                href="/vision/"
                className="group inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium transition-colors duration-200"
              >
                Explore the philosophy
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
      <Section className="py-16 sm:py-20 bg-gradient-to-b from-white via-zinc-50/50 to-white dark:from-transparent dark:via-white/5 dark:to-transparent relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-50/30 to-transparent dark:via-brand-500/10 pointer-events-none" />
        <Container className="relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12">
            <AnimatedStat value="2" label="Companies Founded" suffix="+" />
            <AnimatedStat value="5+" label="Years Experience" suffix="+" />
            <AnimatedStat value="6+" label="Domains" suffix="+" />
            <AnimatedStat value="∞" label="Infinite Growth" />
          </div>
        </Container>
      </Section>

      <SectionDivider variant="geometric" />

      {/* Featured Principle Section */}
      <Section className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white to-zinc-50/50 dark:from-zinc-950 dark:to-zinc-900/50 p-10 sm:p-12 shadow-soft hover:shadow-soft-lg transition-shadow duration-300">
              <div className="text-center mb-6">
                <span className="inline-block text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider px-3 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50">
                  Core Principle
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-palette-primary dark:text-zinc-100 text-center mb-5 leading-tight">
                Truth is the foundation of all progress.
              </h2>
              <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 text-center leading-relaxed font-light">
                Illusions may comfort, but only truth compounds.
              </p>
              <div className="mt-8 text-center">
                <a
                  href="/about/#principles"
                  className="group inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium text-sm transition-colors duration-200"
                >
                  View all principles
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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

      <SectionDivider variant="minimal" />

      {/* Domain Expertise Tags */}
      {skills.length > 0 && (
        <Section
          title="Core Domains"
          intro="Areas of deep expertise and exploration"
        >
          <Container>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-5">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 py-4 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft hover:-translate-y-1"
                >
                  <h3 className="font-semibold text-base text-palette-primary dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {skill.name}
                  </h3>
                  {skill.items && skill.items.length > 0 && (
                    <p className="text-xs text-palette-secondary dark:text-zinc-500 mt-1.5">
                      {skill.items.slice(0, 2).join(", ")}
                      {skill.items.length > 2 && " +"}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <a
                href="/skills/"
                className="group inline-flex items-center text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 font-medium text-sm transition-colors duration-200"
              >
                View all skills
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
      )}

      <SectionDivider
        variant="quote"
        quote="Complexity arises from simplicity. The future is built from elegant primitives, not bloated constructs."
      />

      {/* Journey/Timeline Preview */}
      {experience.length > 0 && (
        <Section title="Journey" intro="Key milestones across two decades">
          <Container>
            <TimelinePreview items={experience} maxItems={4} />
          </Container>
        </Section>
      )}

      <SectionDivider variant="pattern" />

      {/* Current Focus Section */}
      <Section className="py-16 sm:py-20 bg-gradient-to-b from-white via-zinc-50/30 to-white dark:from-transparent dark:via-white/5 dark:to-transparent relative overflow-hidden">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(45deg, currentColor 1px, transparent 1px),
                                linear-gradient(-45deg, currentColor 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />
        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-palette-primary dark:text-zinc-100">
                Current Focus (2025–2030)
              </h2>
              <p className="text-palette-secondary dark:text-zinc-400 text-lg">
                Strategic initiatives shaping the next phase of growth
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft hover:-translate-y-0.5">
                <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200">
                  Building Intelligent Companies
                </h3>
                <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                  Building intelligent, scalable companies grounded in
                  innovation and long-term value.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft hover:-translate-y-0.5">
                <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200">
                  MyPrinciple Framework
                </h3>
                <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                  Synthesizing philosophy, science, and engineering into a
                  personal framework (MyPrinciple).
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft hover:-translate-y-0.5">
                <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200">
                  Inner Freedom & Clarity
                </h3>
                <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                  Cultivating inner freedom and psychological clarity for
                  sustained creative flow.
                </p>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft hover:-translate-y-0.5">
                <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200">
                  Civilization-Scale Systems
                </h3>
                <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                  Designing civilization-scale systems that integrate AI,
                  ethics, and human evolution.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Quick Navigation */}
      <Section className="py-16 sm:py-20">
        <Container>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            <a
              href="/about/"
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                About
              </h3>
              <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                Learn about my philosophy, mission, and work
              </p>
            </a>
            <a
              href="/projects/"
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Projects
              </h3>
              <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                Explore my technology ventures and research
              </p>
            </a>
            <a
              href="/blog/"
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Blog
              </h3>
              <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                Essays on knowledge, systems, and the future
              </p>
            </a>
            <a
              href="/vision/"
              className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-brand-500 dark:hover:border-brand-600 transition-all duration-200 hover:shadow-soft-lg hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2.5 text-palette-primary dark:text-zinc-200 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                Vision
              </h3>
              <p className="text-sm text-palette-secondary dark:text-zinc-400 leading-relaxed">
                The Infinite Growth Principle philosophy
              </p>
            </a>
          </div>
        </Container>
      </Section>

      <SectionDivider variant="minimal" />

      {/* Featured Blog Post */}
      {featuredPost && (
        <Section>
          <Container>
            <FeaturedBlogPost post={featuredPost} />
          </Container>
        </Section>
      )}

      <SectionDivider variant="geometric" />

      {/* Latest Blog Posts */}
      {latestPosts.length > 0 && (
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
      )}

      <SectionDivider
        variant="quote"
        quote="Systems outlive goals. Design the mechanism of growth, not just its milestone."
      />

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
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
      )}

      <SectionDivider variant="geometric" />

      {/* Call-to-Action Section */}
      <Section className="py-20 sm:py-24 bg-gradient-to-b from-transparent via-zinc-50/80 to-zinc-50 dark:via-zinc-950/50 dark:to-zinc-950/80 relative overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50/20 via-transparent to-transparent dark:from-brand-950/10 pointer-events-none" />
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6 text-palette-primary dark:text-zinc-100">
              Let&apos;s Build the Future Together
            </h2>
            <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 mb-10 leading-relaxed px-4">
              Whether you&apos;re exploring collaboration, seeking insights on
              systems thinking, or interested in advancing civilization-scale
              technologies, I&apos;d love to connect.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="/contact/"
                className="group inline-flex items-center justify-center rounded-lg bg-brand-500 hover:bg-brand-600 dark:bg-brand-600 dark:hover:bg-brand-700 text-white px-8 py-3.5 font-medium transition-all duration-200 shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5"
              >
                Get in Touch
                <svg
                  className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
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
              <a
                href="/about/"
                className="inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-palette-primary dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800 px-8 py-3.5 font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Learn More
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
