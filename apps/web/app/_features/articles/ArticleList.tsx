import { ArticleListItem } from "./ArticleListItem";
import { getArticlesMeta } from "./getArticlesMeta";
import type { TagEnum } from "./type";

type Props = {
  tag?: TagEnum;
};

export const ArticleList = ({ tag }: Props): JSX.Element => {
  const articlesMeta = getArticlesMeta({ tag });

  return (
    <div className="grid gap-12">
      {articlesMeta.map((article) => (
        <ArticleListItem key={article.title} {...article} />
      ))}
    </div>
  );
};
