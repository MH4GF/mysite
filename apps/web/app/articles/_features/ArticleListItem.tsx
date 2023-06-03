import Link from 'next/link'

import type { Article } from './type'

type Props<T extends string> = Article<T>

export const ArticleListItem = <T extends string>({ title, href, publishedAt, tags }: Props<T>) => {
  return (
    <article className="">
      <h2 className="text-xl mb-2">
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
