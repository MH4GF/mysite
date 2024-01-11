import { Link } from "../viewTransition";

import { tagLabelMap } from "./constants";
import type { TagEnum } from "./type";

const tagColorMap: Record<TagEnum, string> = {
  "route06-tech-blog": "bg-blue-600 dark:bg-blue-900",
  "timee-product-team-blog": "bg-yellow-400 dark:bg-yellow-600",
  zenn: "bg-sky-600 dark:bg-sky-700",
  dev: "bg-orange-600 dark:bg-orange-700",
  life: "bg-rose-700",
  note: "bg-green-600 dark:bg-green-700",
  qiita: "bg-teal-500 dark:bg-teal-700",
  "speaker-deck": "bg-teal-500 dark:bg-teal-700",
} as const;

interface Props {
  tag: TagEnum;
}

export const Tag = ({ tag }: Props) => {
  const colors = tagColorMap[tag];
  const label = tagLabelMap[tag];

  return (
    <Link href={`/articles/tags/${tag}`}>
      <span className={`${colors} rounded px-1 py-0.5 text-sm text-white`}>{label}</span>
    </Link>
  );
};
