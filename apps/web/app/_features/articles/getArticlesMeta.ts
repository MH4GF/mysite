import { promises as fs } from "fs";

import type { ArticleMeta, TagEnum } from "./type";
import { articlesMetaSchema } from "./type";

import { compareDesc, rootJoin } from "@/app/_utils";

type Options = {
  tag?: TagEnum | undefined;
};

export const getArticlesMeta = async ({ tag }: Options): Promise<ArticleMeta[]> => {
  const metadataPath = rootJoin("contents/articles/articles.json");

  const file = await fs.readFile(metadataPath, "utf8");
  const articlesMeta = articlesMetaSchema.parse(JSON.parse(file)).articles as ArticleMeta[];
  const sorted = articlesMeta.sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));

  if (tag !== undefined) {
    return sorted.filter((article) => article.tags.includes(tag));
  }

  return sorted;
};
