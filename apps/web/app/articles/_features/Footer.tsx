import Image from 'next/image'
import Link from 'next/link'

import { externalLinks } from '../../_utils/externalLinks'

export const Footer = () => {
  return (
    <footer className="mb-4">
      <section className="text-center">
        <Link href="/" className="hover:underline">
          <Image
            src={externalLinks.avatar}
            alt="My profile image"
            width="150"
            height="150"
            className="inline-block rounded-full"
          />
          <h1 className="mt-2 font-bold">Hirotaka Miyagi</h1>
          <p className="text-sm text-slate-400">Software Engineer / @mh4gf</p>
        </Link>
      </section>
    </footer>
  )
}
