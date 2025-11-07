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

/**
 * Get OG image URL for a specific page
 * @param {string} page - Page identifier (e.g., 'about', 'blog', 'projects')
 * @param {string} slug - Optional slug for blog posts or project pages
 * @param {boolean} absolute - Whether to return absolute URL (default: false, uses relative for Next.js metadataBase)
 * @returns {Object} OG image configuration
 */
export function getOgImage(page = 'default', slug = null, absolute = false) {
  let imagePath;
  
  if (slug) {
    // For blog posts or other slug-based pages
    imagePath = `/og/${page}/${slug}.png`;
  } else if (page !== 'default') {
    // For specific pages
    imagePath = `/og/${page}.png`;
  } else {
    // Default OG image
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
};

