import type { ComponentProps } from 'react'

import { ArticleListItem } from './ArticleListItem'

interface Props {
  articles: ComponentProps<typeof ArticleListItem>[]
}

export const ArticleList = ({ articles }: Props) => {
  return (
    <>
      {articles.map((article, index) => (
        <ArticleListItem key={index} {...article} />
      ))}
    </>
  )
}
