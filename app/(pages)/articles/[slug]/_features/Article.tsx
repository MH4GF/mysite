import { MarkdownToToc } from "@/app/_features/articles/toc";
import { ArticleMetaDetail } from "./ArticleMetaDetail";

import { MarkdownRenderer, UniversalLink, getArticle } from "@/app/_features";

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
    <div data-pagefind-body>
      <ArticleMetaDetail article={article} />
      <div className="my-12 h-px bg-zinc-300 dark:bg-zinc-600" />
      <div className="flex max-w-6xl flex-row-reverse gap-8 mb-8">
        <div className="hidden w-1/4 pt-5 lg:block">
          <div className="sticky top-24">
            <MarkdownToToc raw={article.body.raw} />
          </div>
        </div>
        <div className="w-full lg:w-3/4">
          <MarkdownRenderer raw={article.body.raw} />
        </div>
      </div>
      <div className="mt-4">
        <UniversalLink
          href="/articles"
          isEnabledUnderline
          className="text-zinc-700 dark:text-zinc-300"
        >
          ← All Articles
        </UniversalLink>
      </div>
    </div>
  );
};
