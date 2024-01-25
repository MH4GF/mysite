import { zennArticles } from "./data";
import type { Activity } from "./type";

import { compareDesc } from "@/app/_utils";
import { allArticles } from "contentlayer/generated";

export const allActivities = (): Activity[] => {
  const activities = [...allArticles, ...zennArticles];
  const sorted = activities.sort((a, b) =>
    compareDesc(new Date(a.publishedAt), new Date(b.publishedAt)),
  );

  return sorted;
};
