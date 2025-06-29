import { allArticles as internalArticles } from "contentlayer/generated";
import { compareDesc } from "@/app/_utils";
import { externalArticles } from "./data";
import { type ArticleMeta, articlesMetaSchema, type TagEnum } from "./type";

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
