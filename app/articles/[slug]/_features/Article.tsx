import { getArticle, MarkdownRenderer, UniversalLink } from "@/app/_features";
import { ArticleMetaDetail } from "./ArticleMetaDetail";
import { CopyMarkdownButton } from "./CopyMarkdownButton";

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
      <div className="mt-8 flex justify-center">
        <CopyMarkdownButton markdownContent={article.body.raw} />
      </div>
      <div className="mt-12 md:mt-16 w-full">
        <MarkdownRenderer raw={article.body.raw} />
      </div>
    </div>
  );
};
