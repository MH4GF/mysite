import Link from 'next/link'

import { RssIcon } from '../_components'

import { ArticleList } from './_features'

export default function Page() {
  return (
    <div className="grid gap-8">
      <h1 className="flex items-center gap-2 text-2xl font-bold sm:text-3xl">
        <span>Articles</span>
        <Link href="/articles/feed">
          <RssIcon className="h-6 w-6" />
        </Link>
      </h1>
      <ArticleList />
    </div>
  )
}
