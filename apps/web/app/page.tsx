import Link from 'next/link'

import { MyAvatar } from './_components/MyAvatar'

export default function Page() {
  return (
    <div className="grid gap-8">
      <div className="flex items-center gap-8">
        <MyAvatar />
        <h1 className="text-5xl font-bold">Hirotaka Miyagi</h1>
      </div>
      <p>I'm a software engineer based in Tokyo, Japan.</p>
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
          <Link href="/thinking-in-career">⛰️ キャリアの指向性(脳内メモ)</Link>
        </li>
      </ul>
    </div>
  )
}
