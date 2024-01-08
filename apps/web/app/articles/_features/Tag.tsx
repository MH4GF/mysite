import type { TagEnum } from "@/app/_features";

const getColorForTag = (tag: TagEnum): string => {
  switch (tag) {
    case "ROUTE06 Tech Blog":
      return "bg-blue-600 dark:bg-blue-900";
    case "Timee Product Team Blog":
      return "bg-yellow-400 dark:bg-yellow-600";
    case "Zenn":
      return "bg-sky-600 dark:bg-sky-700";
    case "Dev":
      return "bg-orange-600 dark:bg-orange-700";
    case "Life":
      return "bg-rose-700";
    case "note":
      return "bg-green-600 dark:bg-green-700";
    case "Qiita":
    case "Speaker Deck":
      return "bg-teal-500 dark:bg-teal-700";
  }
};

interface Props {
  tag: TagEnum;
}

export const Tag = ({ tag }: Props) => {
  const colors = getColorForTag(tag);

  return <span className={`${colors} rounded px-1 py-px text-sm text-white`}>{tag}</span>;
};
