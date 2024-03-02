import Image from "next/image";

import { Time } from "@/app/_components";
import { Tag } from "@/app/_features";
import { format } from "@/app/_utils";
import type { Article } from "contentlayer/generated";

interface Props {
  article: Article;
}

export const ArticleMetaDetail = ({
  article: { publishedAt: _publishedAt, title, tags, headingImage },
}: Props) => {
  const publishedAt = format(new Date(_publishedAt));

  return (
    <div>
      {headingImage && (
        <Image
          src={headingImage}
          alt="Heading Image"
          width="1120"
          height="630"
          className="mb-8"
          priority
        />
      )}
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
