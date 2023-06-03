import { getArticle } from './getArticle'

interface Props {
  id: string
  handleNotFound: () => void
}

// @ts-expect-error Async Server Component
export const Article = async ({ id, handleNotFound }: Props): JSX.Element => {
  const article = await getArticle(id, handleNotFound)

  return <article className="prose dark:prose-invert">{article}</article>
}
