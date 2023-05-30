import { promises as fs } from 'fs'
import path from 'path'

import { env } from '../../env'

import type { Article } from './type'
import { articlesSchema } from './type'

export const getArticles = async (): Promise<Article[]> => {
  const metadataPath = path.join(env.ARTICLES_PATH, `/articles.json`)
  const file = await fs.readFile(metadataPath, 'utf8')
  return articlesSchema.parse(JSON.parse(file)).articles as Article[]
}
