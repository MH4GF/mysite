import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ArticleList,
  getAllTags,
  getArticlesMeta,
  tagLabelMap,
  tagList,
  tagsSchema,
} from "@/app/_features";
import { siteInfo } from "@/app/_utils";

interface Params {
  tag: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page(props: Props) {
  const params = await props.params;

  const parsed = tagsSchema.safeParse(params.tag);
  if (!parsed.success) {
    notFound();
  }
  const tag = parsed.data;

  return (
    <ArticleList
      articles={getArticlesMeta({ tag })}
      title={tagLabelMap[tag]}
      tag={tag}
      allTags={getAllTags()}
    />
  );
}

export const generateStaticParams = (): Params[] => {
  return tagList.map((tag) => ({ tag }));
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const parsed = tagsSchema.safeParse(params.tag);
  if (!parsed.success) {
    notFound();
  }
  const label = tagLabelMap[parsed.data];

  return {
    title: label,
    alternates: { canonical: `${siteInfo.url}/tags/${parsed.data}` },
    openGraph: { title: label },
    twitter: { title: label },
  };
};
