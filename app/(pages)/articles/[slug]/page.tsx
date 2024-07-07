import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Article } from "./_features";

import { getArticle } from "@/app/_features";
import { allArticles } from "contentlayer/generated";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default function Page({ params }: Props) {
  return <Article {...params} handleNotFound={notFound} />;
}

export const generateStaticParams = (): Params[] => allArticles.map(({ slug }) => ({ slug }));

export const generateMetadata = ({ params }: Props): Metadata => {
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
