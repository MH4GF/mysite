import { getAdjacentArticles, getArticle, MarkdownRenderer, UniversalLink } from "@/app/_features";
import { ArticleMetaDetail } from "./ArticleMetaDetail";
import { ArticleNavigation } from "./ArticleNavigation";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Article = ({ slug, handleNotFound }: Props) => {
  const article = getArticle(`/blog/${slug}`);

  if (!article) {
    handleNotFound();
    return null;
  }

  const markdownUrl = `/blog/${slug}.md`;

  return (
    <div className="blur-enter-content" data-pagefind-body>
      <UniversalLink href="/blog" isEnabledUnderline className="text-zinc-700 dark:text-zinc-300">
        ← Blog
      </UniversalLink>
      <ArticleMetaDetail article={article} markdownUrl={markdownUrl} />
      <div className="mt-12 md:mt-16 w-full">
        <MarkdownRenderer raw={article.body.raw} />
      </div>
      <ArticleNavigation {...getAdjacentArticles(article.href)} />
    </div>
  );
};
