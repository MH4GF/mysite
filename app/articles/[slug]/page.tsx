import { allArticles } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getArticle } from "@/app/_features";
import { Article } from "./_features";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page(props: Props) {
  const params = await props.params;
  return (
    <main className="max-w-3xl mx-auto py-16 md:py-32 px-4 md:px-0">
      <Article {...params} handleNotFound={notFound} />
    </main>
  );
}

export const generateStaticParams = (): Params[] => allArticles.map(({ slug }) => ({ slug }));

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const article = getArticle(`/articles/${params.slug}`);
  const title = article?.title ?? "";
  const description = article?.description ?? "";
  const headingImage = article?.headingImage;

  return {
    title,
    description,
    openGraph: { title, description, ...(headingImage ? { images: headingImage } : undefined) },
    twitter: {
      title,
      description,
      card: "summary_large_image",
      ...(headingImage
        ? {
            twitter: headingImage,
          }
        : undefined),
    },
  };
};
