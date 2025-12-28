// next.config.cjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['smysl-bakery-directus.onrender.com'],
  },
};

module.exports = nextConfig;
