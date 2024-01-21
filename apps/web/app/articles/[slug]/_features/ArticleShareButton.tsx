import type { ArticleMeta } from "@/app/_features";
import { Share } from "@/app/_features";
import { baseUrl } from "@/app/_utils";

interface Props {
  meta: ArticleMeta;
}

export const ArticleShareButton = ({ meta }: Props) => {
  const shareData: ShareData = {
    title: meta?.title || "",
    url: new URL(meta.href, baseUrl).toString(),
    text: meta?.title || "",
  };

  return <Share shareData={shareData} />;
};
