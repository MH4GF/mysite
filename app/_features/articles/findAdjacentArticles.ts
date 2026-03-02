import type { ArticleMeta } from "./type";

export type AdjacentArticles = {
  older: ArticleMeta | undefined;
  newer: ArticleMeta | undefined;
};

export const findAdjacentArticles = (articles: ArticleMeta[], href: string): AdjacentArticles => {
  const internalArticles = articles.filter((article) => !article.externalLink);
  const currentIndex = internalArticles.findIndex((article) => article.href === href);

  if (currentIndex === -1) {
    return { older: undefined, newer: undefined };
  }

  const newer = internalArticles[currentIndex - 1];
  const older = internalArticles[currentIndex + 1];

  return { older, newer };
};
