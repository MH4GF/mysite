import { MarkdownRenderer, UniversalLink, getArticle } from "@/app/_features";
import { ArticleMetaDetail } from "./ArticleMetaDetail";

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
    <div className="blur-enter-content" data-pagefind-body>
      <UniversalLink
        href="/contents"
        isEnabledUnderline
        className="text-zinc-700 dark:text-zinc-300"
      >
        ← All Contents
      </UniversalLink>
      <ArticleMetaDetail article={article} />
      <div className="mt-12 md:mt-16 w-full">
        <MarkdownRenderer raw={article.body.raw} />
      </div>
    </div>
  );
};
