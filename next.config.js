const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "b.st-hatena.com",
      },
    ],
  },
  rewrites() {
    return [
      {
        source: "/articles/:slug.md",
        destination: "/articles/:slug/raw",
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
