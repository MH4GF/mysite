import { ArticleListItem } from "./ArticleListItem";
import { getArticlesMeta } from "./getArticlesMeta";
import type { TagEnum } from "./type";

type Props = {
  tag?: TagEnum;
};

export const ArticleList = async ({ tag }: Props): Promise<JSX.Element> => {
  const articlesMeta = await getArticlesMeta({ tag });

  return (
    <div className="grid gap-8">
      {articlesMeta.map((article) => (
        <ArticleListItem key={article.title} {...article} />
      ))}
    </div>
  );
};
