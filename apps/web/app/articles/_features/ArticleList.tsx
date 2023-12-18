import { Grid } from "@kuma-ui/core";

import { ArticleListItem } from "./ArticleListItem";

import { getArticlesMeta } from "@/app/_features";

// @ts-expect-error Async Server Component
export const ArticleList = async (): JSX.Element => {
  const articlesMeta = await getArticlesMeta();
  return (
    <Grid gap={"2rem"}>
      {articlesMeta.map((article) => (
        <ArticleListItem key={article.title} {...article} />
      ))}
    </Grid>
  );
};
