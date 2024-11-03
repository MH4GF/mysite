import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Content } from "./_features";

import { allAbouts } from "contentlayer/generated";

interface Params {
  slug: string;
}

interface Props {
  params: Promise<Params>;
}

export default async function Page(props: Props) {
  const params = await props.params;
  return <Content {...params} handleNotFound={notFound} />;
}

export const generateStaticParams = (): Params[] =>
  allAbouts.map((about) => ({ slug: about.href }));

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const title = allAbouts.find((about) => about.href === params.slug)?.title ?? "";

  return { title, openGraph: { title }, twitter: { title } };
};
