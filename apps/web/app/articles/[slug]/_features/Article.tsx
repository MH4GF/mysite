import { ArticleMetaDetail } from "./ArticleMetaDetail";
import { ArticleShareButton } from "./ArticleShareButton";

import { MarkdownRenderer, getArticleMeta, getArticle } from "@/app/_features";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Article = async ({ slug, handleNotFound }: Props) => {
  const meta = await getArticleMeta(slug);
  const article = getArticle(`/article/${slug}`);

  if (!article) {
    handleNotFound();
    return null;
  }

  return (
    <div>
      <ArticleMetaDetail article={article} />
      <hr className="my-12 border-zinc-300 dark:border-zinc-600" />
      <MarkdownRenderer raw={article.body.raw} />
      {meta && <ArticleShareButton meta={meta} />}
    </div>
  );
};
