"use client";

import dynamic from "next/dynamic";

import { HatenaBookmarkButton, HatenaBookmarkScript, XShareButton } from "@/app/_features";
import { baseUrl } from "@/app/_utils";
import type { Article } from "contentlayer/generated";

const Share = dynamic(() => import("@/app/_features/share/Share"), {
  ssr: false,
});

interface Props {
  article: Article;
}

export const ArticleShareButton = ({ article }: Props) => {
  const url = new URL(article.href, baseUrl).toString();
  const shareData: ShareData = {
    title: article.title,
    url,
    text: article.title,
  };

  return (
    <div className="flex gap-2">
      <HatenaBookmarkScript />
      <HatenaBookmarkButton url={url} />
      <XShareButton url={url} text={article.title} />
      <Share shareData={shareData} />
    </div>
  );
};
