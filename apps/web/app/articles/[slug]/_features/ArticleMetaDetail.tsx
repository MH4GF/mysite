import { Time } from "@/app/_components";
import type { ArticleMeta } from "@/app/_features";
import { Tag } from "@/app/_features";
import { format } from "@/app/_utils";

interface Props {
  meta: ArticleMeta;
}

export const ArticleMetaDetail = ({ meta: { publishedAt: _publishedAt, title, tags } }: Props) => {
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
