import { ExternalLinkIcon, Time } from "../../_components";
import { format } from "../../_utils";
import { UniversalLink } from "../viewTransition";

import { Tag } from "./Tag";
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
    <article className="grid gap-4">
      <h2 className="text-xl">
        <UniversalLink href={href} isExternal={externalLink} isEnabledUnderline>
          {title}
          {externalLink && <ExternalLinkIcon />}
        </UniversalLink>
      </h2>
      <div className="flex justify-between">
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Tag key={tag} tag={tag} />
          ))}
        </div>
        <Time dateTime={publishedAt}>{publishedAt}</Time>
      </div>
    </article>
  );
};
