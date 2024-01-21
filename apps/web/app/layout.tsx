import { GoogleTagManager } from "@next/third-parties/google";
import "@project/configs/tailwindcss/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer } from "./_components";
import { ColorModeScript, Header, ScrollToTopButton, TwitterWidgets } from "./_features";
import { baseUrl, siteInfo } from "./_utils";

const { siteName, description, url, twitter } = siteInfo;

export const metadata: Metadata = {
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    url,
    siteName,
    description,
    type: "website",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description,
    site: twitter,
    creator: twitter,
  },
  alternates: {
    canonical: url,
  },
  icons: [
    {
      rel: "icon",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "mask-icon",
      url: "/safari-pinned-tab.svg",
      color: "#f7be2c",
    },
  ],
  manifest: "/site.webmanifest",
  metadataBase: new URL(baseUrl),
};

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable} suppressHydrationWarning>
      <body className="dark:bg-zinc-800">
        <ColorModeScript />
        <TwitterWidgets />
        <main className="dark:bg-gradient-to-tr dark:from-zinc-700 dark:via-zinc-900 dark:to-zinc-800 dark:text-zinc-100">
          <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-8 px-4 sm:px-0">
            <Header />
            {children}
          </div>
          <ScrollToTopButton />
          <Footer className="mt-8" />
        </main>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </body>
    </html>
  );
}
