import Section from "../../components/Section";
import Container from "../../components/Container";
import Image from "next/image";
import { generateOgImageMetadata } from "../../lib/og-images";
import JsonLd from "../../components/JsonLd";
import { getAllPostsMeta } from "../../lib/blog";
import { generateMetaDescription } from "../../lib/meta-generator";
import BlogFilter from "./BlogFilter";

// Generate dynamic meta description for blog index
async function getBlogMetaDescription() {
  const posts = await getAllPostsMeta();
  const latestPost = posts[0];

  if (latestPost) {
    const fullPost = await import("../../lib/blog").then((m) =>
      m.getPostBySlug(latestPost.slug)
    );
    if (fullPost) {
      return await generateMetaDescription(fullPost, {
        useAI: false, // Use template-based for index page
        enhanceExisting: true,
      });
    }
  }

  return "Public notebook of ideas about knowledge, systems, and the future. Essays on AI, philosophy, civilization design, and the evolution of intelligence.";
}

export async function generateMetadata() {
  const description = await getBlogMetaDescription();

  return {
    title: "Blog — Vikash",
    description,
    keywords: [
      "blog",
      "essays",
      "philosophy",
      "AI",
      "systems thinking",
      "knowledge creation",
      "civilization",
      "writing",
      "tech essays",
      "founder insights",
      "scientific research",
      "engineering philosophy",
      "future of humanity",
    ],
    openGraph: {
      title: "Blog — Vikash",
      description: description,
      url: "https://vktofly.github.io/blog/",
      images: [generateOgImageMetadata("blog", null, "Blog — Vikash")],
    },
    alternates: {
      canonical: "/blog/",
    },
  };
}

export default async function BlogIndex() {
  const posts = await getAllPostsMeta();
  const allTags = Array.from(
    new Set(posts.flatMap((p) => p.tags || []))
  ).sort();

  // Generate structured data for blog
  const blogStructuredData = [
    // Blog Schema
    {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Vikash Blog",
      description:
        "Public notebook of ideas about knowledge, systems, and the future. Essays on AI, philosophy, civilization design, and the evolution of intelligence.",
      url: "https://vktofly.github.io/blog/",
      author: {
        "@type": "Person",
        name: "Vikash",
        url: "https://vktofly.github.io",
      },
      publisher: {
        "@type": "Person",
        name: "Vikash",
        url: "https://vktofly.github.io",
      },
      blogPost: posts.slice(0, 10).map((post) => ({
        // Include latest 10 posts
        "@type": "BlogPosting",
        headline: post.title,
        url: `https://vktofly.github.io/blog/${post.slug}/`,
        datePublished: post.date,
        author: {
          "@type": "Person",
          name: "Vikash",
        },
      })),
    },
    // ItemList for blog posts
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Blog Posts",
      description: "Complete list of blog posts by Vikash",
      numberOfItems: posts.length,
      itemListElement: posts.slice(0, 20).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "BlogPosting",
          headline: post.title,
          url: `https://vktofly.github.io/blog/${post.slug}/`,
          datePublished: post.date,
          author: {
            "@type": "Person",
            name: "Vikash",
          },
        },
      })),
    },
  ];

  return (
    <>
      <div className="fixed inset-0 z-0 bg-stars pointer-events-none" />
      <div className="fixed inset-0 z-0 bg-nebula opacity-30 pointer-events-none" />
      {blogStructuredData.map((data, index) => (
        <JsonLd key={`blog-${index}`} data={data} />
      ))}
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
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 leading-tight">
              Blog
            </h1>
            <p className="text-lg sm:text-xl text-palette-secondary dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              Public notebook of ideas about knowledge, systems, and the future.
              Essays on AI, philosophy, civilization design, and the evolution
              of intelligence.
            </p>
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="relative overflow-hidden">
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
          <BlogFilter posts={posts} allTags={allTags} />
        </Container>
      </Section>
    </>
  );
}
