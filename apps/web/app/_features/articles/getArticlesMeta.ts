import { promises as fs } from 'fs'

import type { ArticleMeta } from './type'
import { articlesMetaSchema } from './type'

import { rootJoin } from '@/app/_utils'

export const getArticlesMeta = async (): Promise<ArticleMeta[]> => {
  const metadataPath = rootJoin(`contents/articles/articles.json`)

  const file = await fs.readFile(metadataPath, 'utf8')
  return articlesMetaSchema.parse(JSON.parse(file)).articles as ArticleMeta[]
}
