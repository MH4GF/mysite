import { z } from "zod";

export const tagList = [
  "route06-tech-blog",
  "liam",
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
  "findy-tools",
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

export type ArticleMeta = z.infer<typeof articleMetaSchema>;
