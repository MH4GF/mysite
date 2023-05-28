import type { FC } from 'react'
import { use } from 'react'

import { getArticle } from './getArticle'

interface Props {
  id: string
}

export const Article: FC<Props> = ({ id }) => {
  const article = use(getArticle(id))

  return <article>{article}</article>
}
