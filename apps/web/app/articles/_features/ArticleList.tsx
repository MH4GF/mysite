import { ArticleListItem } from './ArticleListItem'
import { getArticles } from './getArticles'

// @ts-expect-error Async Server Component
export const ArticleList = async (): JSX.Element => {
  const articles = await getArticles()
  return (
    <>
      {articles.map((article, index) => (
        <ArticleListItem key={index} {...article} />
      ))}
    </>
  )
}
