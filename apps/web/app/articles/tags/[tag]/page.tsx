import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleList, tagLabelMap, tagList, tagsSchema } from "../../../_features/articles";
import { siteInfo } from "../../../_utils";

interface Params {
  tag: string;
}

interface Props {
  params: Params;
}

export default function Page({ params: { tag: _tag } }: Props) {
  const parsed = tagsSchema.safeParse(_tag);
  if (!parsed.success) notFound();
  const tag = parsed.data;
  const label = tagLabelMap[tag];

  return (
    <div className="grid gap-8">
      <h1 className="flex items-center gap-2 text-3xl font-bold">
        <span>Articles - {label}</span>
      </h1>
      <ArticleList tag={tag} />
    </div>
  );
}

export const generateStaticParams = (): Params[] => {
  return tagList.map((tag) => ({ tag }));
};

export const metadata: Metadata = {
  title: `Articles | ${siteInfo.siteName}`,
};
