import '@project/configs/tailwindcss/global.css'
import { Inter } from 'next/font/google'

import { Header } from './_features/Header'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} bg-zinc-800`}>
      <body className="bg-gradient-to-tr from-zinc-700 via-zinc-900 to-zinc-800 text-zinc-100 ">
        <main className="max-w-2xl mx-auto min-h-screen">
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
