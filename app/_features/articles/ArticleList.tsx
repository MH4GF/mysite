import type { ComponentProps, JSX } from "react";
import { Link } from "@/app/_features/viewTransition/Link";
import { cn } from "@/app/_utils/cn";
import { UniversalLink } from "../viewTransition";
import { ArticleListItem } from "./ArticleListItem";
import { tagLabelMap } from "./constants";
import { getArticlesMeta } from "./getArticlesMeta";
import type { TagEnum } from "./type";
import { tagList } from "./type";

type TagChipProps = {
  href: string;
  isActive: boolean;
  label: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

const TagChip = ({ href, isActive, label, ...props }: TagChipProps) => (
  <Link
    href={href}
    className={cn(
      "inline-flex items-center rounded-md px-3 py-1 text-xs transition-colors whitespace-nowrap",
      "border border-muted-foreground/20 hover:bg-accent",
      isActive && "bg-accent hover:bg-accent/90",
    )}
    {...props}
  >
    {label}
  </Link>
);

type Props = {
  tag?: TagEnum;
};

export const ArticleList = ({ tag }: Props): JSX.Element => {
  const articlesMeta = getArticlesMeta({ tag });

  return (
    <main className="max-w-3xl mx-auto py-16 md:py-32 px-4 md:px-0 blur-enter-content">
      <div className="mb-8">
        <UniversalLink href="/" isEnabledUnderline className="text-zinc-700 dark:text-zinc-300">
          ← Home
        </UniversalLink>
      </div>
      <h1 className="text-xl">{tag ? tagLabelMap[tag] : "All Contents"}</h1>

      <div className="my-8 overflow-x-auto pb-2">
        <div className="flex gap-2 flex-nowrap">
          <TagChip href="/contents" isActive={!tag} label="All" />
          {tagList.map((tagItem) => (
            <TagChip
              key={tagItem}
              href={`/contents/tags/${tagItem}`}
              isActive={tag === tagItem}
              label={tagLabelMap[tagItem]}
            />
          ))}
        </div>
      </div>

      <div className="grid gap-6 blur-enter-content enter-step-80">
        {articlesMeta.map((article) => (
          <ArticleListItem key={article.title} {...article} currentTag={tag} />
        ))}
      </div>
    </main>
  );
};
