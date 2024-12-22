import { UniversalLink } from "../viewTransition";
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
      <UniversalLink href="/" isEnabledUnderline className="text-zinc-700 dark:text-zinc-300">
        ← Go back
      </UniversalLink>

      <div className="mt-12 grid gap-6 blur-enter-content enter-step-150">
        {articlesMeta.map((article) => (
          <ArticleListItem key={article.title} {...article} />
        ))}
      </div>
    </div>
  );
};
