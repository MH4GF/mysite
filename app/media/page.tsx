import type { Metadata } from "next";

import { ArticleList, getAllTags, getMediaMeta } from "../_features";
import { siteInfo } from "../_utils";

export default function Page() {
  return (
    <ArticleList articles={getMediaMeta()} title="Media" allHref="/media" allTags={getAllTags()} />
  );
}

export const metadata: Metadata = {
  title: "Media",
  alternates: { canonical: `${siteInfo.url}/media` },
};
