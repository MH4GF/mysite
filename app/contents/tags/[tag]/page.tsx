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

  const { tag: _tag } = params;

  const parsed = tagsSchema.safeParse(_tag);
  if (!parsed.success) {
    notFound();
  }
  const tag = parsed.data;

  return (
    <main className="max-w-3xl mx-auto py-16 md:py-32 px-4 md:px-0">
      <ArticleList tag={tag} />
    </main>
  );
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
