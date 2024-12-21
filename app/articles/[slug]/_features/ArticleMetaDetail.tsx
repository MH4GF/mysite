import Image from "next/image";

import { MyAvatar, Time } from "@/app/_components";
import { Tag } from "@/app/_features";
import { format } from "@/app/_utils";
import type { Article } from "contentlayer/generated";
import type { FC } from "react";

interface Props {
  article: Article;
}

export const ArticleMetaDetail: FC<Props> = ({
  article: { headingImage, title, publishedAt: _publishedAt, tags },
}) => {
  const publishedAt = format(new Date(_publishedAt));

  return (
    <div className="text-center blur-enter-content">
      {headingImage && (
        <Image
          src={headingImage}
          alt="ヘッダー画像"
          width="1120"
          height="630"
          className="mt-10"
          priority
        />
      )}
      <h1 className="mt-12 md:mt-24 text-xl">{title}</h1>
      <div className="mt-6 md:mt-8 flex justify-center items-center gap-3 md:gap-6 flex-col md:flex-row">
        <span className="flex gap-2 items-center">
          <MyAvatar />
          <span className="text-left inline-flex flex-col gap-1">
            <span>Hirotaka Miyagi</span>
            <span className="text-xs text-foreground-sub">Software Engineer</span>
          </span>
        </span>
        <span className="text-foreground-sub hidden md:block">・</span>
        <div className="flex gap-2">
          <Time dateTime={publishedAt}>{publishedAt}</Time>
          <span className="text-foreground-sub">・</span>
          <span className="text-sm text-foreground-sub">5 min read</span>
        </div>
      </div>
      <div className="mt-4 md:mt-8 flex justify-center gap-2">
        {tags.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </div>
  );
};
