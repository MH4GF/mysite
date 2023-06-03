import Link from 'next/link'

import type { Article } from './type'

type LinkProps<T extends string> = Pick<Props<T>, 'href' | 'title'>

const InternalLink = <T extends string>({ href, title }: LinkProps<T>) => {
  return (
    <Link href={href} className="hover:underline">
      {title}
    </Link>
  )
}

const ExternalLink = <T extends string>({ href, title }: LinkProps<T>) => {
  return (
    <a className="hover:underline" href={href} target="_blank" rel="noreferrer">
      {title}
      <svg
        className="w-6 h-6 ml-1 inline-block"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
        ></path>
      </svg>
    </a>
  )
}

type Props<T extends string> = Article<T>

export const ArticleListItem = <T extends string>({
  title,
  href,
  externalLink,
  publishedAt,
  tags,
}: Props<T>) => {
  return (
    <article className="">
      <h2 className="text-xl mb-2">
        {externalLink ? (
          <ExternalLink href={href} title={title} />
        ) : (
          <InternalLink href={href} title={title} />
        )}
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
