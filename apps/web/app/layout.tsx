import { Box, Spacer } from "@kuma-ui/core";
import { KumaRegistry } from "@kuma-ui/next-plugin/registry";
import "@project/configs/tailwindcss/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ColorModeScript, Header, TwitterWidgets } from "./_features";
import { siteInfo } from "./_utils";

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
};

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable} suppressHydrationWarning>
      <Box as="body" className="dark:bg-zinc-800">
        <KumaRegistry>
          <ColorModeScript />
          <TwitterWidgets />
          <main className="dark:bg-gradient-to-tr dark:from-zinc-700 dark:via-zinc-900 dark:to-zinc-800 dark:text-zinc-100">
            <Box px={["1rem", 0]} mx={"auto"} minHeight={"100vh"} maxWidth={["", "42rem"]}>
              <Header />
              <Spacer size={"2rem"} />
              {children}
            </Box>
          </main>
        </KumaRegistry>
      </Box>
    </html>
  );
}
