import { notFound } from 'next/navigation'

import { rootJoin, getSlugs } from '../_utils'

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

export const generateStaticParams = async (): Promise<Params[]> => {
  const dirPath = rootJoin(`contents/about`)
  return await getSlugs(dirPath)
}
