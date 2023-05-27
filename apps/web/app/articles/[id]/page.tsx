import { getArticle } from './getArticle'

interface Params {
  id: string
}

interface Props {
  params: Params
}

export default async function Page({ params: { id } }: Props) {
  const article = await getArticle(id)

  return <>{article}</>
}

export const generateStaticParams = (): Params[] => {
  return [
    {
      id: 'frequently-used-gh-commands',
    },
  ]
}
