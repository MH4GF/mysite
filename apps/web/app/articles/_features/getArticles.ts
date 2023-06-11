import { promises as fs } from 'fs'

import type { Article } from './type'
import { articlesSchema } from './type'

import { rootJoin } from '@/app/_utils'

export const getArticles = async (): Promise<Article[]> => {
  const metadataPath = rootJoin(`contents/articles/articles.json`)

  const file = await fs.readFile(metadataPath, 'utf8')
  return articlesSchema.parse(JSON.parse(file)).articles as Article[]
}
