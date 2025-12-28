// next.config.cjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'smysl-bakery-directus.onrender.com',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
