import { Time } from "@/app/_components";
import type { ArticleMeta } from "@/app/_features";
import { MarkdownContent, Tag, getArticleMeta } from "@/app/_features";
import { format, rootJoin } from "@/app/_utils";

const ArticleMetaDetail = ({
  meta: { publishedAt: _publishedAt, title, tags },
}: { meta: ArticleMeta }) => {
  const publishedAt = format(_publishedAt);

  return (
    <div>
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <div className="my-6 flex justify-between">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <Time dateTime={publishedAt}>{publishedAt}</Time>
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
