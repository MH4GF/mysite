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

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const tag = tagsSchema.parse(params.tag);
  const label = tagLabelMap[tag];
  const title = `Articles - ${label}`;

  return { title, openGraph: { title }, twitter: { title } };
};
