import { tagLabelMap } from "./constants";
import type { TagEnum } from "./type";

interface Props {
  tag: TagEnum;
}

export const Tag = ({ tag }: Props) => {
  const label = tagLabelMap[tag];

  return (
    <span className="rounded-sm border border-zinc-600 px-1 py-0.5 text-xs text-zinc-500">
      {label}
    </span>
  );
};
