import Link from 'next/link'

import { MyAvatar } from '../../_components'

export const Footer = () => {
  return (
    <footer className="mb-4">
      <section className="text-center">
        <Link href="/" className="hover:underline">
          <MyAvatar />
          <h1 className="mt-2 font-bold">Hirotaka Miyagi</h1>
          <p className="text-sm text-slate-400">Software Engineer / @mh4gf</p>
        </Link>
      </section>
    </footer>
  )
}
