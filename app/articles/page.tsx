import type { Metadata } from "next";

import { ArticleList } from "../_features";

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto py-16 md:py-32 px-4 md:px-0">
      <ArticleList />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Articles",
};
