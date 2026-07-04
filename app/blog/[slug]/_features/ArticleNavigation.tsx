import type { JSX } from "react";
// ルートバレル（@/app/_features）は contentlayer/generated に依存する getArticle 等を含み
// Storybook（Vitest Browser Mode）で解決できないため、サブパスから直接 import する
import type { AdjacentArticles } from "@/app/_features/articles/findAdjacentArticles";
import { UniversalLink } from "@/app/_features/viewTransition";

export const ArticleNavigation = ({ older, newer }: AdjacentArticles): JSX.Element | null => {
  if (!(older || newer)) {
    return null;
  }

  return (
    <nav className="mt-12 flex flex-col gap-4 border-t border-zinc-200 pt-6 md:flex-row md:items-stretch md:justify-between dark:border-zinc-700">
      <div className="md:flex-1">
        {older && (
          <UniversalLink
            href={older.href}
            className="flex h-full flex-col gap-1 rounded-md border border-muted-foreground/20 px-4 py-3 transition-colors hover:bg-accent"
          >
            <span className="text-xs text-zinc-500 dark:text-zinc-400">← Older</span>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{older.title}</span>
          </UniversalLink>
        )}
      </div>
      <div className="md:flex-1">
        {newer && (
          <UniversalLink
            href={newer.href}
            className="flex h-full flex-col gap-1 rounded-md border border-muted-foreground/20 px-4 py-3 transition-colors hover:bg-accent md:text-right"
          >
            <span className="text-xs text-zinc-500 dark:text-zinc-400">Newer →</span>
            <span className="text-sm text-zinc-700 dark:text-zinc-300">{newer.title}</span>
          </UniversalLink>
        )}
      </div>
    </nav>
  );
};
