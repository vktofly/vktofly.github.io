/** @type {import('next-sitemap').IConfig} */
export default {
  siteUrl: 'https://vktofly.github.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/404',
    '/404/',
    '/admin',
    '/admin/*',
    '/analytics',
    '/analytics/*',
    '/docs',
    '/docs/*',
    '/blog/readme',
    '/blog/readme/*',
    '/blog/_template',
    '/blog/_template/*',
    '/blog/your-article-slug',
    '/blog/your-article-slug/*',
    '/books/readme',
    '/books/readme/*',
  ],
  outDir: 'out',
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/404',
          '/404/',
          '/admin',
          '/admin/',
          '/analytics',
          '/analytics/',
          '/docs',
          '/docs/',
        ],
      },
    ],
    additionalSitemaps: [],
  },
  transform: async (config, path) => {
    const excludedPrefixes = ['/admin', '/analytics', '/docs', '/404'];
    if (excludedPrefixes.some((prefix) => path.startsWith(prefix))) {
      return null;
    }
    const lower = path.toLowerCase();
    if (lower.includes('readme') || lower.includes('_template') || lower.includes('your-article-slug')) {
      return null;
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};


