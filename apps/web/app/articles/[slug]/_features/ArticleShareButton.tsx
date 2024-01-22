import dynamic from "next/dynamic";

import { baseUrl } from "@/app/_utils";
import type { Article } from "contentlayer/generated";

const Share = dynamic(() => import("@/app/_features/share/Share"), { ssr: false });

interface Props {
  article: Article;
}

export const ArticleShareButton = ({ article }: Props) => {
  const shareData: ShareData = {
    title: article.title,
    url: new URL(article.url, baseUrl).toString(),
    text: article.title,
  };

  return <Share shareData={shareData} />;
};
