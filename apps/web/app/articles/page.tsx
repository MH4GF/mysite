import type { Metadata } from "next";

import { ArticleList } from "../_features";

export default function Page() {
  return (
    <div className="grid gap-8">
      <h1 className="flex items-center gap-2 font-bold text-3xl">
        <span>Articles</span>
      </h1>
      <ArticleList />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Articles",
};
