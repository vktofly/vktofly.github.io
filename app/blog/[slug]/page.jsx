import Section from "../../../components/Section";
import BlogProse from "../../../components/BlogProse";
import ReadingProgress from "../../../components/ReadingProgress";
import Toc from "../../../components/Toc";
import KeyTakeaways from "../../../components/KeyTakeaways";
import BlogPostCTA from "../../../components/BlogPostCTA";
import RelatedPosts from "../../../components/RelatedPosts";
import BlogPostNavigation from "../../../components/BlogPostNavigation";
import JsonLd from "../../../components/JsonLd";
import Image from "next/image";
import { generateOgImageMetadata, getOgImage } from "../../../lib/og-images";
import { getAllPostsMeta, getPostBySlug } from "../../../lib/blog";
import fs from "fs/promises";
import path from "path";

function formatDate(date) {
  if (!date) return "";
  if (date instanceof Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }
  if (typeof date === "string") {
    const dateObj = new Date(date);
    if (!isNaN(dateObj.getTime())) {
      return dateObj.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return date;
  }
  return String(date);
}

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};

  const publishedTime = post.date
    ? new Date(post.date).toISOString()
    : undefined;
  const url = `https://vktofly.github.io/blog/${post.slug}/`;

  return {
    title: `${post.title} — Vikash`,
    description: post.description || post.summary,
    keywords: post.tags || [],
    authors: [{ name: "Vikash" }],
    openGraph: {
      title: post.title,
      description: post.description || post.summary,
      type: "article",
      url,
      publishedTime,
      authors: ["Vikash"],
      tags: post.tags || [],
      images: [generateOgImageMetadata("blog", post.slug, post.title)],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || post.summary,
      creator: "@vktofly1",
      images: [generateOgImageMetadata("blog", post.slug, post.title).url],
    },
    alternates: {
      canonical: `/blog/${post.slug}/`,
    },
  };
}

async function ogImageExists(slug) {
  try {
    const imagePath = path.join(
      process.cwd(),
      "public",
      "og",
      "blog",
      `${slug}.png`
    );
    await fs.access(imagePath);
    return true;
  } catch {
    return false;
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <Section title="Post" intro="Not found">
        <div className="text-zinc-600 dark:text-zinc-400">
          This article does not exist.
        </div>
      </Section>
    );
  }
  const showToc = post.words > 1000;
  const publishedTime = post.date
    ? new Date(post.date).toISOString()
    : undefined;
  const url = `https://vktofly.github.io/blog/${post.slug}/`;
  const ogImage = getOgImage("blog", post.slug);
  const hasOgImage = await ogImageExists(post.slug);
  const allPosts = await getAllPostsMeta();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description || post.summary,
          author: {
            "@type": "Person",
            name: "Vikash",
            url: "https://vktofly.github.io/about/",
          },
          publisher: {
            "@type": "Person",
            name: "Vikash",
            url: "https://vktofly.github.io",
          },
          datePublished: publishedTime,
          dateModified: publishedTime,
          url,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
          image: ogImage.url,
          keywords: post.tags?.join(", ") || "",
          wordCount: post.words,
          timeRequired: `PT${post.readingTime}M`,
        }}
      />
      <ReadingProgress targetId="article-content" />
      <Section
        title={post.title}
        intro={`${formatDate(post.date)} • ${
          post.readingTime
        } min read • ${post.words.toLocaleString()} words`}
      >
        {/* OG Image Display */}
        {hasOgImage && (
          <div className="mb-10">
            <div className="relative w-full aspect-[1200/630] overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              <Image
                src={ogImage.url}
                alt={ogImage.alt}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          </div>
        )}
        {post.summary && (
          <div className="mb-10 rounded-lg border-2 border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6">
            <h3 className="text-base font-semibold mb-3 text-palette-primary">
              Summary
            </h3>
            <p className="text-base text-palette-secondary leading-relaxed">
              {post.summary}
            </p>
          </div>
        )}
        {post.takeaways && post.takeaways.length > 0 && (
          <div className="mb-10">
            <KeyTakeaways items={post.takeaways} />
          </div>
        )}
        <div className={showToc ? "grid gap-8 md:grid-cols-[240px_1fr]" : ""}>
          {showToc && (
            <div className="hidden md:block md:sticky md:top-24 self-start">
              <Toc rootId="article-content" />
            </div>
          )}
          <div
            id="article-content"
            className={showToc ? "" : "max-w-3xl mx-auto"}
          >
            <BlogProse html={post.html} />

            {/* Blog Post Navigation */}
            <BlogPostNavigation currentPost={post} allPosts={allPosts} />

            {/* CTA Section */}
            <BlogPostCTA />

            {/* Related Posts */}
            <RelatedPosts currentPost={post} allPosts={allPosts} />
          </div>
        </div>
      </Section>
    </>
  );
}
