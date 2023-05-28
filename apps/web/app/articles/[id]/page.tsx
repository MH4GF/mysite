import { notFound } from 'next/navigation'

import { Article } from './Article'

interface Params {
  id: string
}

interface Props {
  params: Params
}

export default function Page({ params }: Props) {
  return <Article {...params} handleNotFound={notFound} />
}

export const generateStaticParams = (): Params[] => {
  return [
    {
      id: 'frequently-used-gh-commands',
    },
  ]
}
