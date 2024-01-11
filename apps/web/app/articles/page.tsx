import type { Metadata } from "next";

import { RssIcon } from "../_components";
import { ArticleList } from "../_features/articles";
import { Link } from "../_features/viewTransition";

export default function Page() {
  return (
    <div className="grid gap-8">
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        <span>Articles</span>
        <Link href="/articles/feed">
          <RssIcon className="h-6 w-6" />
        </Link>
      </h1>
      <ArticleList />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Articles",
};
