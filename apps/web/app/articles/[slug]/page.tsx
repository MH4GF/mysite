import { notFound } from 'next/navigation'

import { getSlugs } from '../../_utils/getSlugs'
import { rootJoin } from '../../_utils/rootJoin'

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
