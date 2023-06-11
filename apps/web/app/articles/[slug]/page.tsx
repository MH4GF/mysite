import { notFound } from 'next/navigation'

import { rootJoin, getSlugs } from '../../_utils'

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

export const generateStaticParams = (): Promise<Params[]> => {
  const dirPath = rootJoin(`contents/articles`)
  return getSlugs(dirPath)
}
