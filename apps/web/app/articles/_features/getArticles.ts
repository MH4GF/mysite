import { promises as fs } from 'fs'

import { rootJoin } from '../../_utils'

import type { Article } from './type'
import { articlesSchema } from './type'

export const getArticles = async (): Promise<Article[]> => {
  const metadataPath = rootJoin(`contents/articles/articles.json`)

  const file = await fs.readFile(metadataPath, 'utf8')
  return articlesSchema.parse(JSON.parse(file)).articles as Article[]
}
