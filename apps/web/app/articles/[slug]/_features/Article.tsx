import type { ArticleMeta } from "@/app/_features";
import { MarkdownContent, getArticleMeta } from "@/app/_features";
import { format, rootJoin } from "@/app/_utils";

const ArticleMetaDetail = ({
  meta: { publishedAt: _publishedAt, title },
}: { meta: ArticleMeta }) => {
  const publishedAt = format(_publishedAt);

  return (
    <div>
      <h2 className="text-4xl font-extrabold">{title}</h2>
      <div className="my-2 flex justify-end">
        <time dateTime={publishedAt} className="text-zinc-500">
          {publishedAt}
        </time>
      </div>
    </div>
  );
};

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Article = async ({ slug, handleNotFound }: Props) => {
  const filePath = rootJoin(`contents/articles/${slug}.md`);
  const meta = await getArticleMeta(slug);

  return (
    <>
      {meta && <ArticleMetaDetail meta={meta} />}
      <MarkdownContent filePath={filePath} handleNotFound={handleNotFound} />
    </>
  );
};
