import { ArticleListItem } from "./ArticleListItem";
import { getArticlesMeta } from "./getArticlesMeta";
import type { TagEnum } from "./type";

import type { JSX } from "react";

type Props = {
  tag?: TagEnum;
};

export const ArticleList = ({ tag }: Props): JSX.Element => {
  const articlesMeta = getArticlesMeta({ tag });

  return (
    <div className="blur-enter-content">
      <h1 className="text-xl">All Writing</h1>

      <div className="mt-12 grid gap-6 blur-enter-content enter-step-80">
        {articlesMeta.map((article) => (
          <ArticleListItem key={article.title} {...article} />
        ))}
      </div>
    </div>
  );
};
