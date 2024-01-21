import { ArticleMetaDetail } from "./ArticleMetaDetail";
import { ArticleShareButton } from "./ArticleShareButton";

import { MarkdownRenderer, getArticleMeta } from "@/app/_features";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Article = async ({ slug, handleNotFound }: Props) => {
  const meta = await getArticleMeta(slug);

  return (
    <div>
      {meta && (
        <>
          <ArticleMetaDetail meta={meta} />
          <hr className="my-12 border-zinc-300 dark:border-zinc-600" />
        </>
      )}
      <MarkdownRenderer slug={`/article/${slug}`} handleNotFound={handleNotFound} />
      {meta && <ArticleShareButton meta={meta} />}
    </div>
  );
};
