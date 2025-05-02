import type { Metadata } from "next";

import { ArticleList, UniversalLink } from "../_features";

export default function Page() {
  return (
    <main className="max-w-3xl mx-auto py-16 md:py-32 px-4 md:px-0">
      <div className="mb-8 blur-enter-content">
        <UniversalLink href="/" isEnabledUnderline className="text-zinc-700 dark:text-zinc-300">
          ← Home
        </UniversalLink>
      </div>
      <ArticleList />
    </main>
  );
}

export const metadata: Metadata = {
  title: "Articles",
};
