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
