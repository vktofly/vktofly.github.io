import Section from "../../../components/Section";
import Container from "../../../components/Container";
import Prose from "../../../components/Prose";
import Toc from "../../../components/Toc";
import BackToTop from "../../../components/BackToTop";
import ReadingProgress from "../../../components/ReadingProgress";
import Image from "next/image";
import Link from "next/link";
import { generateOgImageMetadata } from "../../../lib/og-images";
import { getBookBlogBySlug, getAllBookBlogsMeta } from "../../../lib/book-blog";
import books from "../../../data/books";
import BookCard from "../../../components/BookCard";

export async function generateStaticParams() {
  const blogs = await getAllBookBlogsMeta();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const blog = await getBookBlogBySlug(params.slug);
  if (!blog) {
    return {
      title: "Book Review Not Found",
    };
  }

  const book = books.find((b) => b.slug === blog.bookSlug);

  return {
    title: `${blog.title} — Book Review`,
    description: blog.description || `A review and reflection on ${book?.title || 'this book'}`,
    keywords: [...(blog.tags || []), 'book review', 'reading', book?.author || ''],
    openGraph: {
      title: `${blog.title} — Book Review`,
      description: blog.description || `A review and reflection on ${book?.title || 'this book'}`,
      url: `https://vktofly.github.io/books/${params.slug}/`,
      images: [generateOgImageMetadata("blog", params.slug, blog.title)],
    },
    alternates: {
      canonical: `/books/${params.slug}/`,
    },
  };
}

export default async function BookBlogPage({ params }) {
  const blog = await getBookBlogBySlug(params.slug);
  if (!blog) {
    return (
      <Section>
        <Container>
          <div className="text-center py-16">
            <h1 className="text-3xl font-bold mb-4">Book Review Not Found</h1>
            <Link href="/books/" className="text-brand-600 dark:text-brand-400 hover:underline">
              Return to Books
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  const book = books.find((b) => b.slug === blog.bookSlug);
  const recommendedBooks = blog.recommendedBooks
    .map((slug) => books.find((b) => b.slug === slug))
    .filter(Boolean);

  return (
    <>
      <ReadingProgress targetId="book-blog-content" />
      <BackToTop />

      {/* Hero Section */}
      <Section className="pt-20 sm:pt-24 pb-12 sm:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.015] pointer-events-none print:hidden">
          <Image
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=1920&q=80&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt=""
            fill
            className="object-cover grayscale"
            unoptimized
          />
        </div>

        <Container className="relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-palette-secondary dark:text-zinc-400">
              <Link href="/books/" className="hover:text-brand-600 dark:hover:text-brand-400">
                Books
              </Link>
              <span className="mx-2">/</span>
              <span>{blog.title}</span>
            </nav>

            {/* Book Info */}
            {book && (
              <div className="mb-8 flex flex-col sm:flex-row gap-6">
                {book.coverImage && (
                  <div className="flex-shrink-0 w-32 h-48 sm:w-40 sm:h-60 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                    <Image
                      src={book.coverImage}
                      alt={`${book.title} by ${book.author}`}
                      width={160}
                      height={240}
                      className="w-full h-full object-cover"
                      unoptimized={book.coverImage.startsWith("http")}
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-palette-primary dark:text-zinc-100 mb-3">
                    {blog.title}
                  </h1>
                  <p className="text-xl font-medium text-palette-secondary dark:text-zinc-400 mb-2">
                    {book.title}
                  </p>
                  <p className="text-base text-palette-secondary dark:text-zinc-500 mb-4">
                    by {book.author}
                  </p>
                  {blog.date && (
                    <p className="text-sm text-palette-secondary dark:text-zinc-500">
                      {new Date(blog.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  )}
                </div>
              </div>
            )}

            {blog.description && (
              <p className="text-lg text-palette-secondary dark:text-zinc-400 leading-relaxed">
                {blog.description}
              </p>
            )}
          </div>
        </Container>
      </Section>

      {/* Main Content */}
      <Section className="relative overflow-hidden">
        <Container className="relative z-10">
          <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
            {/* Table of Contents Sidebar */}
            <div className="hidden lg:block lg:sticky lg:top-24 self-start print:hidden">
              <Toc contentId="book-blog-content" />
            </div>

            {/* Blog Content */}
            <div id="book-blog-content" className="min-w-0">
              <Prose html={blog.html || ''} />

              {/* Recommended Books Section */}
              {recommendedBooks.length > 0 && (
                <div className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                  <h2 className="text-2xl font-bold text-palette-primary dark:text-zinc-100 mb-6">
                    Recommended Books
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {recommendedBooks.map((recBook) => (
                      <BookCard key={recBook.slug} book={recBook} />
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                <Link
                  href="/books/"
                  className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back to Books
                </Link>
                {book?.link && (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                  >
                    Purchase Book
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

