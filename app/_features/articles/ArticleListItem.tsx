import { MoveUpRight } from "lucide-react";
import { Time } from "../../_components";
import { format } from "../../_utils";
import { UniversalLink } from "../viewTransition";

import { tagLabelMap } from "./constants";
import type { ArticleMeta } from "./type";

type Props = ArticleMeta;

export const ArticleListItem = ({
  title,
  href,
  externalLink,
  publishedAt: _publishedAt,
  tags,
}: Props) => {
  const publishedAt = format(_publishedAt);

  return (
    <article className="flex flex-col gap-1">
      <div className="flex gap-2 items-center justify-between">
        <h2 className="text-base font-normal">
          <UniversalLink href={href} isExternal={externalLink} isEnabledHoveredUnderline>
            {title}
            {externalLink && (
              <MoveUpRight className="mb-[-3px] ml-0.5 inline-block h-4 w-auto align-top text-zinc-500 dark:text-zinc-400" />
            )}
          </UniversalLink>
        </h2>
        <Time dateTime={publishedAt} className="shrink-0">
          {publishedAt}
        </Time>
      </div>
      {tags.length > 0 && (
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          {tags.map((tag, index) => (
            <span key={tag}>
              <UniversalLink href={`/contents/tags/${tag}`} isEnabledHoveredUnderline>
                {tagLabelMap[tag]}
              </UniversalLink>
              {index < tags.length - 1 && ", "}
            </span>
          ))}
        </div>
      )}
    </article>
  );
};
