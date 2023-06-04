import { notFound } from 'next/navigation'

import { Content } from './_features/Content'

interface Params {
  slug: string
}

interface Props {
  params: Params
}

export default function Page({ params }: Props) {
  return <Content {...params} handleNotFound={notFound} />
}

export const generateStaticParams = (): Params[] => {
  // TODO: 実際のデータから取得する
  return [
    {
      slug: 'behavior',
    },
    {
      slug: 'thinking-in-career',
    },
  ]
}
