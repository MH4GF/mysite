import type { Route } from 'next'
import { z } from 'zod'

const tagsSchema = z.enum([
  'ROUTE06 Tech Blog',
  'Timee Product Team Blog',
  'Zenn',
  'Qiita',
  'note',
  'Dev',
  'Life',
])

export type TagEnum = z.infer<typeof tagsSchema>

const articleMetaSchema = z.object({
  title: z.string(),
  href: z.string(),
  externalLink: z.boolean(),
  publishedAt: z.string(),
  tags: z.array(tagsSchema),
})

export const articlesMetaSchema = z.object({
  articles: z.array(articleMetaSchema),
})

/**
 * NOTE: nextのRoute型をzodで定義できなさそうなので別で定義
 */
export type ArticleMeta<T extends string = string> = Omit<
  z.infer<typeof articleMetaSchema>,
  'href'
> & {
  href: Route<T>
}
