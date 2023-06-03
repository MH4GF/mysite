/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@project/ui', '@project/configs'],
  experimental: {
    typedRoutes: true,
  },
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
}
