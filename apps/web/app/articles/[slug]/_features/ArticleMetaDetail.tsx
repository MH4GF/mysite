import { Time } from "@/app/_components";
import { Tag } from "@/app/_features";
import { format } from "@/app/_utils";
import type { Article } from "contentlayer/generated";

interface Props {
  article: Article;
}

export const ArticleMetaDetail = ({
  article: { publishedAt: _publishedAt, title, tags },
}: Props) => {
  const publishedAt = format(new Date(_publishedAt));

  return (
    <div>
      <h2 className="font-extrabold text-2xl">{title}</h2>
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
