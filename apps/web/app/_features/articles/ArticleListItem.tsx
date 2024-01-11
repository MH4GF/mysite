import { UniversalLink } from "../../_components";
import { format } from "../../_utils";

import { Tag } from "./Tag";
import type { ArticleMeta } from "./type";

type Props<T extends string> = ArticleMeta<T>;

export const ArticleListItem = <T extends string>({
  title,
  href,
  externalLink,
  publishedAt: _publishedAt,
  tags,
}: Props<T>) => {
  const publishedAt = format(_publishedAt);

  return (
    <article className="grid gap-2">
      <h2 className="text-xl">
        <UniversalLink href={href} isExternal={externalLink}>
          {title}
          {externalLink && (
            <svg
              className="ml-1 inline-block h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>External Link</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          )}
        </UniversalLink>
      </h2>
      <div className="flex justify-between">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <p className="text-zinc-500">{publishedAt}</p>
      </div>
    </article>
  );
};
