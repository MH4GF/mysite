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

const articleSchema = z.object({
  title: z.string(),
  href: z.string(),
  externalLink: z.boolean(),
  publishedAt: z.string(),
  tags: z.array(tagsSchema),
})

export const articlesSchema = z.object({
  articles: z.array(articleSchema),
})

/**
 * NOTE: nextのRoute型をzodで定義できなさそうなので別で定義
 */
export type Article<T extends string = string> = Omit<z.infer<typeof articleSchema>, 'href'> & {
  href: Route<T>
}
