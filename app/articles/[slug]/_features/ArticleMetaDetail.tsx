import type { Article } from "contentlayer/generated";
import Image from "next/image";
import type { FC } from "react";
import { MyAvatar, Time } from "@/app/_components";
import { format } from "@/app/_utils";
import { AskAIDropdown } from "./PageActions";

interface Props {
  article: Article;
  markdownUrl: string;
}

export const ArticleMetaDetail: FC<Props> = ({
  article: { headingImage, title, publishedAt: PublishedAt },
  markdownUrl,
}) => {
  const publishedAt = format(new Date(PublishedAt));

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
      <div className="mt-6 md:mt-8 flex justify-center items-center gap-4 flex-col md:flex-row">
        <span className="flex gap-2 items-center">
          <MyAvatar />
          <span className="text-left inline-flex flex-col gap-1">
            <span>Hirotaka Miyagi</span>
            <span className="text-xs text-foreground-sub">Software Engineer</span>
          </span>
        </span>
        <span className="hidden md:block bg-foreground-sub w-1 h-1 rounded-full" />
        <div className="flex gap-4 items-center">
          <Time dateTime={publishedAt} className="leading-none">
            {publishedAt}
          </Time>
          <span className="bg-foreground-sub w-1 h-1 rounded-full" />
          <span className="text-sm text-foreground-sub leading-none">5 min read</span>
          <span className="bg-foreground-sub w-1 h-1 rounded-full" />
          <AskAIDropdown markdownUrl={markdownUrl} />
        </div>
      </div>
    </div>
  );
};
