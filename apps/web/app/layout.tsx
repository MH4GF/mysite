import '@project/configs/tailwindcss/global.css'
import { Inter } from 'next/font/google'

import { Header, ColorModeScript, TwitterWidgets } from './_features'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="dark:bg-zinc-800">
        <ColorModeScript />
        <TwitterWidgets />
        <main className="dark:bg-gradient-to-tr dark:from-zinc-700 dark:via-zinc-900 dark:to-zinc-800 dark:text-zinc-100">
          <div className="mx-auto grid min-h-screen max-w-2xl content-start gap-8 px-4 sm:px-0">
            <Header />
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
