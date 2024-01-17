import { UniversalLink } from "../../_components";

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
      className="rounded border border-zinc-200 px-1 py-0.5 text-sm text-zinc-500 hover:border-zinc-500 hover:text-zinc-700 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:text-zinc-500"
    >
      {label}
    </UniversalLink>
  );
};
