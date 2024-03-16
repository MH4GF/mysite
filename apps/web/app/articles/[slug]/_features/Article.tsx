import { ArticleMetaDetail } from "./ArticleMetaDetail";
import { ArticleShareButton } from "./ArticleShareButton";

import { MarkdownRenderer, TableOfContents, getArticle } from "@/app/_features";

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
      <div className="my-12 h-px bg-zinc-300 dark:bg-zinc-600" />
      <div className="flex max-w-6xl flex-row-reverse gap-8">
        <div className="hidden w-1/4 pt-5 lg:block">
          <div className="sticky top-2">
            <TableOfContents />
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <MarkdownRenderer raw={article.body.raw} />
        </div>
      </div>
      <ArticleShareButton article={article} />
    </div>
  );
};
