/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: ['@project/ui', '@project/configs'],
  experimental: {
    typedRoutes: true,
  },
}
