/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Next 16 defaults to Turbopack; keep empty turbopack block so builds with a webpack() hook are explicit.
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'archipelago.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Used when building with `next build --webpack` (see package.json scripts).
  webpack(config) {
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes('_app')) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    return config;
  },
};

module.exports = nextConfig;
