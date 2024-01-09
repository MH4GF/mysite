import { tagLabelMap } from "./constants";

import type { TagEnum } from "@/app/_features";

const tagColorMap: Record<TagEnum, string> = {
  "route06-tech-blog": "bg-blue-600 dark:bg-blue-900",
  "Timee Product Team Blog": "bg-yellow-400 dark:bg-yellow-600",
  Zenn: "bg-sky-600 dark:bg-sky-700",
  Dev: "bg-orange-600 dark:bg-orange-700",
  Life: "bg-rose-700",
  note: "bg-green-600 dark:bg-green-700",
  Qiita: "bg-teal-500 dark:bg-teal-700",
  "Speaker Deck": "bg-teal-500 dark:bg-teal-700",
} as const;

interface Props {
  tag: TagEnum;
}

export const Tag = ({ tag }: Props) => {
  const colors = tagColorMap[tag];
  const label = tagLabelMap[tag];

  return <span className={`${colors} rounded px-1 py-px text-sm text-white`}>{label}</span>;
};
