import { getArticlesMeta } from "./getArticlesMeta";
import type { ArticleMeta } from "./type";

export const getArticleMeta = async (href: string): Promise<ArticleMeta | undefined> => {
  const articlesMeta = await getArticlesMeta();
  return articlesMeta.find((articleMeta) => articleMeta.href === href);
};
