import { ArticleListItem } from './ArticleListItem'

import { getArticlesMeta } from '@/app/_features'

// @ts-expect-error Async Server Component
export const ArticleList = async (): JSX.Element => {
  const articlesMeta = await getArticlesMeta()
  return (
    <div className="grid gap-8">
      {articlesMeta.map((article, index) => (
        <ArticleListItem key={index} {...article} />
      ))}
    </div>
  )
}
