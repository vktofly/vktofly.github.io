import { getAllPostsMeta, getPostBySlug } from "../../../../lib/blog";
import { convertToAMP, generateAMPCSS } from "../../../../lib/amp-converter";
import { generateOgImageMetadata } from "../../../../lib/og-images";
import fs from "fs/promises";
import path from "path";

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
  const ampUrl = `https://vktofly.github.io/blog/${post.slug}/amp/`;

  return {
    title: `${post.title} — Vikash`,
    description: post.description || post.summary,
    alternates: {
      canonical: `/blog/${post.slug}/`,
      amp: ampUrl,
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

export default async function AMPBlogPostPage({ params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return (
      <html>
        <head>
          <title>Post Not Found</title>
        </head>
        <body>
          <h1>This article does not exist.</h1>
        </body>
      </html>
    );
  }

  const publishedTime = post.date
    ? new Date(post.date).toISOString()
    : undefined;
  const url = `https://vktofly.github.io/blog/${post.slug}/`;
  const ampUrl = `https://vktofly.github.io/blog/${post.slug}/amp/`;
  const ogImage = generateOgImageMetadata("blog", post.slug, post.title);
  const hasOgImage = await ogImageExists(post.slug);

  // Convert HTML to AMP-compliant format
  const ampHtml = convertToAMP(post.html);
  const ampCSS = generateAMPCSS();

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

  return (
    <html amp lang="en">
      <head>
        <meta charSet="utf-8" />
        <script
          async
          src="https://cdn.ampproject.org/v0.js"
        ></script>
        <title>{post.title} — Vikash</title>
        <link rel="canonical" href={url} />
        <meta
          name="viewport"
          content="width=device-width,minimum-scale=1,initial-scale=1"
        />
        <meta name="description" content={post.description || post.summary} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.description || post.summary}
        />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        {hasOgImage && (
          <meta property="og:image" content={ogImage.url} />
        )}
        {publishedTime && (
          <meta property="article:published_time" content={publishedTime} />
        )}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.description || post.summary}
        />
        {hasOgImage && (
          <meta name="twitter:image" content={ogImage.url} />
        )}

        {/* AMP Boilerplate */}
        <style amp-boilerplate>
          {`body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}`}
        </style>
        <noscript>
          <style amp-boilerplate>
            {`body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}`}
          </style>
        </noscript>

        {/* Custom AMP CSS */}
        <style amp-custom dangerouslySetInnerHTML={{ __html: ampCSS }} />
      </head>
      <body>
        <article>
          <header className="article-header">
            <h1>{post.title}</h1>
            <div className="article-meta">
              {formatDate(post.date)} • {post.readingTime} min read •{" "}
              {post.words.toLocaleString()} words
            </div>
            {post.tags && post.tags.length > 0 && (
              <div className="article-meta">
                Tags: {post.tags.join(", ")}
              </div>
            )}
          </header>

          {hasOgImage && (
            <amp-img
              src={ogImage.url}
              alt={post.title}
              width="1200"
              height="630"
              layout="responsive"
            />
          )}

          {post.summary && (
            <div style={{ marginBottom: "2em", padding: "1em", background: "#f5f5f5", borderRadius: "5px" }}>
              <h3>Summary</h3>
              <p>{post.summary}</p>
            </div>
          )}

          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: ampHtml }}
          />

          <footer style={{ marginTop: "3em", paddingTop: "2em", borderTop: "1px solid #eee" }}>
            <p>
              <a href={url}>View full version</a> |{" "}
              <a href="https://vktofly.github.io/blog/">More articles</a>
            </p>
          </footer>
        </article>
      </body>
    </html>
  );
}

