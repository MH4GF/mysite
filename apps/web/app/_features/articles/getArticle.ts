import { allArticles } from "contentlayer/generated";

export const getArticle = (slug: string) => {
  return allArticles.find((article) => article.url === slug);
};
