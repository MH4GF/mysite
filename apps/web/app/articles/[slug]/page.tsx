import { notFound } from 'next/navigation'

import { Article } from './_features/Article'

interface Params {
  slug: string
}

interface Props {
  params: Params
}

export default function Page({ params }: Props) {
  return <Article {...params} handleNotFound={notFound} />
}

export const generateStaticParams = (): Params[] => {
  // TODO: articles.jsonから取得する
  return [
    {
      slug: 'frequently-used-gh-commands',
    },
  ]
}
