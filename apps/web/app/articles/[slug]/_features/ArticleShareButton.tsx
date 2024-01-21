import dynamic from "next/dynamic";

import type { ArticleMeta } from "@/app/_features";
import { baseUrl } from "@/app/_utils";

const Share = dynamic(() => import("@/app/_features/share/Share"), { ssr: false });

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
