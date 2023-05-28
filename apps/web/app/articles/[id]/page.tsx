import { Article } from './Article'

interface Params {
  id: string
}

interface Props {
  params: Params
}

export default function Page({ params }: Props) {
  return <Article {...params} />
}

export const generateStaticParams = (): Params[] => {
  return [
    {
      id: 'frequently-used-gh-commands',
    },
  ]
}
