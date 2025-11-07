/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://vktofly.github.io',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404', '/404/'],
  outDir: 'out',
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/404/'],
      },
    ],
    additionalSitemaps: [],
  },
};


