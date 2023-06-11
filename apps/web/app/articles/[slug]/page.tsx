import { notFound } from 'next/navigation'

import { Article } from './_features'

import { rootJoin } from '@/app/_utils'
import { getSlugs } from '@/app/_utils/server'

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
