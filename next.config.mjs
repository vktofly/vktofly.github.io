/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  // Core Web Vitals optimizations
  experimental: {
    scrollRestoration: true,
  },
};

export default nextConfig;


