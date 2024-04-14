import type { Route } from "next";
import { z } from "zod";

export const tagList = [
  "route06-tech-blog",
  "timee-product-team-blog",
  "zenn",
  "qiita",
  "note",
  "dev",
  "life",
  "speaker-deck",
  "gadget",
  "desk-setup",
  "graphql",
] as const;

export const tagsSchema = z.enum(tagList);

export type TagEnum = z.infer<typeof tagsSchema>;

const articleMetaSchema = z.object({
  title: z.string(),
  href: z.string(),
  externalLink: z.boolean(),
  publishedAt: z.coerce.date(),
  tags: z.array(tagsSchema),
});

export const articlesMetaSchema = z.array(articleMetaSchema);

/**
 * NOTE: nextのRoute型をzodで定義できなさそうなので別で定義
 */
export type ArticleMeta<T extends string = string> = Omit<
  z.infer<typeof articleMetaSchema>,
  "href"
> & {
  href: Route<T>;
};
