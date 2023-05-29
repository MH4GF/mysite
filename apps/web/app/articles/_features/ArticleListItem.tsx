import type { Route } from 'next'
import Link from 'next/link'

interface Props<T extends string> {
  title: string
  href: Route<T>
  publishedAt: string
  tags: string[]
}

export const ArticleListItem = <T extends string>({ title, href, publishedAt, tags }: Props<T>) => {
  return (
    <article className="">
      <h2 className="text-xl font-bold mb-2">
        <Link href={href} className="hover:underline">
          {title}
        </Link>
      </h2>
      <div className="flex justify-between">
        <div className="flex space-x-2 mt-2">
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <p className="text-gray-500">{publishedAt}</p>
      </div>
    </article>
  )
}
