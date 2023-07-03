import Link from 'next/link'

import type { Article } from '@/app/_features'

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
        className="ml-1 inline-block h-6 w-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
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
      <h2 className="mb-2 text-xl">
        {externalLink ? (
          <ExternalLink href={href} title={title} />
        ) : (
          <InternalLink href={href} title={title} />
        )}
      </h2>
      <div className="flex justify-between">
        <div className="mt-2 flex space-x-2">
          {tags.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
        <p className="text-zinc-500">{publishedAt}</p>
      </div>
    </article>
  )
}
