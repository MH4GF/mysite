import { ArticleMetaDetail } from "./ArticleMetaDetail";
import { ArticleShareButton } from "./ArticleShareButton";

import { MarkdownRenderer, getArticle } from "@/app/_features";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Article = ({ slug, handleNotFound }: Props) => {
  const article = getArticle(`/articles/${slug}`);

  if (!article) {
    handleNotFound();
    return null;
  }

  return (
    <div>
      <ArticleMetaDetail article={article} />
      <hr className="my-12 border-zinc-300 dark:border-zinc-600" />
      <MarkdownRenderer raw={article.body.raw} />
      <ArticleShareButton article={article} />
    </div>
  );
};
