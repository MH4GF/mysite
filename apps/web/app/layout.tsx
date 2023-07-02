import '@project/configs/tailwindcss/global.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Header, ColorModeScript, TwitterWidgets } from './_features'
import { siteInfo } from './_utils'

const { siteName, description, url, twitter } = siteInfo

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
    type: 'website',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    site: twitter,
    creator: twitter,
  },
  alternates: {
    canonical: url,
  },
}

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={inter.variable} suppressHydrationWarning>
      <body className="dark:bg-zinc-800">
        <ColorModeScript />
        <TwitterWidgets />
        <main className="dark:bg-gradient-to-tr dark:from-zinc-700 dark:via-zinc-900 dark:to-zinc-800 dark:text-zinc-100">
          <div className="mx-auto min-h-screen px-4 sm:max-w-2xl sm:px-0">
            <Header />
            <div className="mt-8">{children}</div>
          </div>
        </main>
      </body>
    </html>
  )
}
