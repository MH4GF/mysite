import '@project/configs/tailwindcss/global.css'
import { Inter } from 'next/font/google'

import { Header } from './_features/Header'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark:bg-zinc-800`}>
      <body className="dark:bg-gradient-to-tr dark:from-zinc-700 dark:via-zinc-900 dark:to-zinc-800 dark:text-zinc-100 ">
        <main className="mx-auto grid min-h-screen max-w-2xl gap-8">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
