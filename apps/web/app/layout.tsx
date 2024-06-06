import { GoogleTagManager } from "@next/third-parties/google";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.variable} suppressHydrationWarning>
      <body className="dark:bg-zinc-900 dark:text-zinc-200">
        <ColorModeScript />
        <TwitterWidgets />
        <main>
          <Header />
          <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4">{children}</div>
          <ScrollToTopButton />
          <Footer className="mt-8" />
        </main>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ""} />
      </body>
    </html>
  );
}
