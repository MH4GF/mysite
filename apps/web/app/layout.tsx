import '@project/configs/tailwindcss/global.css'
import { Inter } from 'next/font/google'

import { Header } from './_features/Header'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
