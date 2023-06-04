import { notFound } from 'next/navigation'

import { rootJoin } from '../_utils/rootJoin'

import { Content } from './_features/Content'
import { getSlugs } from './_features/getSlugs'

interface Params {
  slug: string
}

interface Props {
  params: Params
}

export default function Page({ params }: Props) {
  return <Content {...params} handleNotFound={notFound} />
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const dirPath = rootJoin(`contents/about`)
  return await getSlugs(dirPath)
}
