import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Content } from "./_features";

import { allAbouts } from "contentlayer/generated";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default function Page({ params }: Props) {
  return <Content {...params} handleNotFound={notFound} />;
}

export const generateStaticParams = (): Params[] =>
  allAbouts.map((about) => ({ slug: about.href }));

export const generateMetadata = ({ params }: Props): Metadata => {
  const title = allAbouts.find((about) => about.href === params.slug)?.title ?? "";

  return { title, openGraph: { title }, twitter: { title } };
};
