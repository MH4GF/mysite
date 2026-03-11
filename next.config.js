const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
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
  redirects() {
    return [
      {
        source: "/articles/:slug((?!feed$).*)",
        destination: "/blog/:slug",
        permanent: true,
      },
      {
        source: "/articles/:slug/:path*",
        destination: "/blog/:slug/:path*",
        permanent: true,
      },
      {
        source: "/contents",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/contents/tags/media",
        destination: "/media",
        permanent: true,
      },
      {
        source: "/contents/tags/:tag",
        destination: "/tags/:tag",
        permanent: true,
      },
      {
        source: "/blog/tags/:tag",
        destination: "/tags/:tag",
        permanent: true,
      },
    ];
  },
  rewrites() {
    return [
      {
        source: "/blog/:slug.md",
        destination: "/blog/:slug/raw",
      },
      {
        source: "/:slug.md",
        destination: "/:slug/raw",
      },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
