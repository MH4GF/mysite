import type { Metadata } from "next";

import { ArticleList } from "../_features";

export default function Page() {
  return <ArticleList />;
}

export const metadata: Metadata = {
  title: "All Contents",
};
