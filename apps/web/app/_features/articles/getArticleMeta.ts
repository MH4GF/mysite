import { getArticlesMeta } from "./getArticlesMeta";
import type { ArticleMeta } from "./type";

export const getArticleMeta = async (
  slug: string
): Promise<ArticleMeta | undefined> => {
  const articlesMeta = await getArticlesMeta();
  const href = `/articles/${slug}`;
  return articlesMeta.find((articleMeta) => articleMeta.href === href);
};
