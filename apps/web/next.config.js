const { withKumaUI } = require("@kuma-ui/next-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@project/ui", "@project/configs"],
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ["avatars.githubusercontent.com"],
  },
};

module.exports = withKumaUI(nextConfig);
