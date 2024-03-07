import type { Metadata } from "next";

import { RssIcon } from "../_components";
import { ArticleList, UniversalLink } from "../_features";

export default function Page() {
  return (
    <div className="grid gap-8">
      <h1 className="flex items-center gap-2 font-bold text-3xl">
        <span>Articles</span>
        <UniversalLink href="/articles/feed">
          <RssIcon className="h-6 w-6" />
        </UniversalLink>
      </h1>
      <ArticleList />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Articles",
};
