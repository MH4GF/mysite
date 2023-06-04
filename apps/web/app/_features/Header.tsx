import Link from 'next/link'

import { ColorModeToggle } from './ColorModeToggle'

const navigation = [
  { name: 'Articles', href: '/articles' },
  { name: 'About', href: '/' },
] as const

export const Header = () => {
  return (
    <header>
      <nav className="mx-auto flex items-center justify-between py-6" aria-label="Global">
        <div className="flex w-full items-center justify-between gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            mh4gf.dev
          </Link>
          <div className="flex items-center gap-x-12">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-semibold leading-6">
                {item.name}
              </Link>
            ))}
            <ColorModeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
