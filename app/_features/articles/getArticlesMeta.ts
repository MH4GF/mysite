import { allArticles as internalArticles } from "contentlayer/generated";
import { compareDesc } from "@/app/_utils";
import { externalArticles } from "./data";
import { type ArticleMeta, articlesMetaSchema, type TagEnum } from "./type";

type Options = {
  tag?: TagEnum | undefined;
};

export function getArticlesMeta({ tag }: Options): ArticleMeta[] {
  const articlesMeta = articlesMetaSchema.parse([...internalArticles, ...externalArticles]);
  const sorted = articlesMeta.sort((a, b) => compareDesc(a.publishedAt, b.publishedAt));

  if (tag !== undefined) {
    return sorted.filter((article) => article.tags.includes(tag));
  }

  return sorted;
}

export function getBlogMeta({ tag }: Options): ArticleMeta[] {
  const all = getArticlesMeta({ tag });
  return all.filter((article) => !article.externalLink);
}

export function getMediaMeta(): ArticleMeta[] {
  const all = getArticlesMeta({});
  return all.filter((article) => article.externalLink);
}

export function getAllTags(): TagEnum[] {
  return [...new Set(getArticlesMeta({}).flatMap((a) => a.tags))];
}
