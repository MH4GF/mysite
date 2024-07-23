import { externalArticles } from "./data";
import { type ArticleMeta, type TagEnum, articlesMetaSchema } from "./type";

import { compareDesc } from "@/app/_utils";
import { allArticles as internalArticles } from "contentlayer/generated";

type Options = {
  tag?: TagEnum | undefined;
};

export const getArticlesMeta = ({ tag }: Options): ArticleMeta[] => {
  const articlesMeta = articlesMetaSchema.parse([...internalArticles, ...externalArticles]);
  const sorted = articlesMeta.sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));

  if (tag !== undefined) {
    return sorted.filter((article) => article.tags.includes(tag));
  }

  return sorted;
};
