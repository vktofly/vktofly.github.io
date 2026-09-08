/**
 * Open Graph image utilities
 * 
 * This module provides helpers for generating and managing OG images
 * across different pages. Place custom OG images in public/og/ directory.
 * 
 * Naming convention:
 * - Default: /og.png (root)
 * - Page-specific: /og/{page-name}.png (e.g., /og/about.png, /og/blog.png)
 * - Blog posts: /og/blog/{slug}.png (e.g., /og/blog/infinite-growth-machine.png)
 */

function checkDiskFileExists(relativePublicPath) {
  if (typeof window !== 'undefined') {
    return false;
  }
  try {
    // Dynamic require to prevent bundling fs into client components
    const fs = eval('require')('fs');
    const path = eval('require')('path');
    const fullPath = path.join(process.cwd(), 'public', relativePublicPath.replace(/^\//, ''));
    return fs.existsSync(fullPath);
  } catch {
    return false;
  }
}

/**
 * Get OG image URL for a blog post
 * Checks if custom OG image exists on disk, falling back to /og/blog.png or /og.png
 * @param {string} slug - Blog post slug
 * @returns {string} Image path
 */
export function getBlogOgImage(slug) {
  if (slug && checkDiskFileExists(`/og/blog/${slug}.png`)) {
    return `/og/blog/${slug}.png`;
  }
  if (checkDiskFileExists('/og/blog.png')) {
    return '/og/blog.png';
  }
  return '/og.png';
}

/**
 * Get OG image URL for a book review
 * Checks if custom OG image exists on disk, falling back to /og/blog.png or /og.png
 * @param {string} slug - Book review slug
 * @returns {string} Image path
 */
export function getBookOgImage(slug) {
  if (slug && checkDiskFileExists(`/og/books/${slug}.png`)) {
    return `/og/books/${slug}.png`;
  }
  if (slug && checkDiskFileExists(`/og/blog/${slug}.png`)) {
    return `/og/blog/${slug}.png`;
  }
  if (checkDiskFileExists('/og/books.png')) {
    return '/og/books.png';
  }
  if (checkDiskFileExists('/og/blog.png')) {
    return '/og/blog.png';
  }
  return '/og.png';
}

/**
 * Get OG image URL for a specific page
 * @param {string} page - Page identifier (e.g., 'about', 'blog', 'projects')
 * @param {string} slug - Optional slug for blog posts or project pages
 * @param {boolean} absolute - Whether to return absolute URL (default: false, uses relative for Next.js metadataBase)
 * @returns {Object} OG image configuration
 */
export function getOgImage(page = 'default', slug = null, absolute = false) {
  let imagePath = '/og.png';
  
  if (page === 'blog' && slug) {
    imagePath = getBlogOgImage(slug);
  } else if (page === 'books' && slug) {
    imagePath = getBookOgImage(slug);
  } else if (slug && checkDiskFileExists(`/og/${page}/${slug}.png`)) {
    imagePath = `/og/${page}/${slug}.png`;
  } else if (page !== 'default' && checkDiskFileExists(`/og/${page}.png`)) {
    imagePath = `/og/${page}.png`;
  } else if ((page === 'blog' || page === 'books') && checkDiskFileExists('/og/blog.png')) {
    imagePath = '/og/blog.png';
  } else if (checkDiskFileExists('/og.png')) {
    imagePath = '/og.png';
  } else {
    imagePath = '/og.png';
  }
  
  // Return relative URL - Next.js metadataBase will convert to absolute
  // This works for both localhost and production
  return {
    url: imagePath,
    width: 1200,
    height: 630,
    alt: getOgImageAlt(page, slug),
  };
}

/**
 * Get alt text for OG image
 */
function getOgImageAlt(page, slug) {
  const altTexts = {
    default: 'Vikash — Polymath, Futurist & Founder',
    about: 'About Vikash — Polymath, Futurist & Founder',
    blog: slug ? `Blog: ${slug}` : 'Blog — Vikash',
    projects: 'Projects — Vikash',
    experience: 'Experience — Vikash',
    vision: 'Vision — The Infinite Growth Principle',
    skills: 'Skills — Vikash',
    contact: 'Contact — Vikash',
    books: 'Books — Vikash',
    people: 'Influential People — Vikash',
    resources: 'Resources — Vikash',
  };
  
  return altTexts[page] || altTexts.default;
}

/**
 * Generate full OG image metadata object for Next.js metadata API
 */
export function generateOgImageMetadata(page = 'default', slug = null, title = null, description = null) {
  const image = getOgImage(page, slug);
  
  return {
    url: image.url,
    width: image.width,
    height: image.height,
    alt: title || image.alt,
    type: 'image/png',
  };
}

/**
 * Get OG image path (for checking if custom image exists)
 * Note: This is a helper for documentation - actual images should be placed in public/og/
 */
export const OG_IMAGE_PATHS = {
  default: '/og.png',
  about: '/og/about.png',
  blog: '/og/blog.png',
  projects: '/og/projects.png',
  experience: '/og/experience.png',
  vision: '/og/vision.png',
  skills: '/og/skills.png',
  contact: '/og/contact.png',
  // Blog posts will be at /og/blog/{slug}.png
  books: '/og/books.png',
  people: '/og/people.png',
  resources: '/og/resources.png',
};

