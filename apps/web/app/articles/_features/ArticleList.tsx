import { ArticleListItem } from "./ArticleListItem";

import { getArticlesMeta } from "@/app/_features";

export const ArticleList = async (): Promise<JSX.Element> => {
  const articlesMeta = await getArticlesMeta();
  return (
    <div className="grid gap-8">
      {articlesMeta.map((article) => (
        <ArticleListItem key={article.title} {...article} />
      ))}
    </div>
  );
};
