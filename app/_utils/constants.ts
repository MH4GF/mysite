export const siteInfo = Object.freeze({
  siteName: "Hirotaka Miyagi",
  description: "My personal website.",
  url: "https://mh4gf.dev",
  twitter: "@mh4gf",
});

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
