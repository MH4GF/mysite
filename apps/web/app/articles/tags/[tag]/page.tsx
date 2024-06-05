import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleList, tagLabelMap, tagList, tagsSchema } from "../../../_features";

interface Params {
  tag: string;
}

interface Props {
  params: Params;
}

export default function Page({ params: { tag: _tag } }: Props) {
  const parsed = tagsSchema.safeParse(_tag);
  if (!parsed.success) {
    notFound();
  }
  const tag = parsed.data;
  const label = tagLabelMap[tag];

  return (
    <div className="grid gap-8">
      <h1 className="flex items-center gap-2 font-bold text-3xl">
        <span>Articles - {label}</span>
      </h1>
      <ArticleList tag={tag} />
    </div>
  );
}

export const generateStaticParams = (): Params[] => {
  return tagList.map((tag) => ({ tag }));
};

export const generateMetadata = ({ params }: Props): Metadata => {
  const tag = tagsSchema.parse(params.tag);
  const label = tagLabelMap[tag];
  const title = `Articles - ${label}`;

  return { title, openGraph: { title }, twitter: { title } };
};
