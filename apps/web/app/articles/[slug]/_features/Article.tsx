import { ArticleMetaDetail } from "./ArticleMetaDetail";

import { MarkdownContent, getArticleMeta } from "@/app/_features";
import { rootJoin } from "@/app/_utils";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Article = async ({ slug, handleNotFound }: Props) => {
  const filePath = rootJoin(`contents/articles/${slug}.md`);
  const meta = await getArticleMeta(slug);

  return (
    <div>
      {meta && (
        <>
          <ArticleMetaDetail meta={meta} />
          <hr className="my-12 border-zinc-300 dark:border-zinc-600" />
        </>
      )}
      <MarkdownContent filePath={filePath} handleNotFound={handleNotFound} />
    </div>
  );
};
