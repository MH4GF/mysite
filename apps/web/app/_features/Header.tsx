import Link from 'next/link'

export const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-4xl font-bold">
        <Link href="/" className="hover:text-gray-300">
          mh4gf.dev
        </Link>
      </h1>
      <nav>
        <ul className="flex space-x-4 mt-4">
          <li>
            <Link href="/" className="hover:text-gray-300">
              Articles
            </Link>
          </li>
          <li>
            <Link href="/" className="hover:text-gray-300">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
