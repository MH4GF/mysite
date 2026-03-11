import type { Metadata } from "next";

import { ArticleList, getAllTags, getBlogMeta } from "../_features";

export default function Page() {
  return (
    <ArticleList articles={getBlogMeta({})} title="Blog" allHref="/blog" allTags={getAllTags()} />
  );
}

export const metadata: Metadata = {
  title: "Blog",
};
