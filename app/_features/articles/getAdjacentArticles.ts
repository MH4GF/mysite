import { type AdjacentArticles, findAdjacentArticles } from "./findAdjacentArticles";
import { getArticlesMeta } from "./getArticlesMeta";

export const getAdjacentArticles = (href: string): AdjacentArticles => {
  return findAdjacentArticles(getArticlesMeta({}), href);
};
