import { UniversalLink } from "../viewTransition";

import { tagLabelMap } from "./constants";
import type { TagEnum } from "./type";

interface Props {
  tag: TagEnum;
}

export const Tag = ({ tag }: Props) => {
  const label = tagLabelMap[tag];

  return (
    <UniversalLink
      href={`/articles/tags/${tag}`}
      isEnabledUnderline
      className="rounded-sm border border-zinc-200 px-1 py-0.5 text-xs text-zinc-500 dark:hover:text-zinc-500 hover:text-zinc-700"
    >
      {label}
    </UniversalLink>
  );
};
