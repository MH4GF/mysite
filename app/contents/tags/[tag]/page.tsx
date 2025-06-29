import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleList, tagLabelMap, tagList, tagsSchema } from "@/app/_features";

interface Params {
  tag: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page(props: Props) {
  const params = await props.params;

  const { tag: Tag } = params;

  const parsed = tagsSchema.safeParse(Tag);
  if (!parsed.success) {
    notFound();
  }
  const tag = parsed.data;

  return <ArticleList tag={tag} />;
}

export const generateStaticParams = (): Params[] => {
  return tagList.map((tag) => ({ tag }));
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const tag = tagsSchema.parse(params.tag);
  const label = tagLabelMap[tag];
  const title = `Contents - ${label}`;

  return { title, openGraph: { title }, twitter: { title } };
};
