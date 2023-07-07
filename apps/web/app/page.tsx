import type { Metadata } from 'next'
import Link from 'next/link'

import { MyAvatar, SocialLink } from './_components'
import { siteInfo } from './_utils'

export default function Page() {
  return (
    <div className="grid gap-4 sm:gap-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <MyAvatar />
        <h1 className="text-3xl font-bold sm:text-5xl">Hirotaka Miyagi</h1>
      </div>
      <p>I'm a software engineer based in Tokyo, Japan.</p>
      <div className="flex gap-2 sm:gap-4">
        <SocialLink kind="twitter" />
        <SocialLink kind="github" />
      </div>
      <ul>
        <li>
          <Link href="#" className="cursor-not-allowed">
            🚀 Call for Job Offers
          </Link>
        </li>
        <li>
          <Link href="/behavior">🚲 好む振る舞い</Link>
        </li>
        <li>
          <Link href="/articles/2023-2-17-thinking-in-career">⛰️ キャリアの指向性(脳内メモ)</Link>
        </li>
        <li>
          <Link href="/resume">👋 Resume</Link>
        </li>
      </ul>
    </div>
  )
}

export const metadata: Metadata = {
  title: `MH4GF | ${siteInfo.siteName}`,
}
