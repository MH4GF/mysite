import { allAbouts } from "contentlayer/generated";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Content } from "./_features";

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
      <Content {...params} handleNotFound={notFound} />
    </main>
  );
}

export const generateStaticParams = (): Params[] =>
  allAbouts.map((about) => ({ slug: about.href.replace(/^\//, "") }));

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const params = await props.params;
  const title = allAbouts.find((about) => about.href === `/${params.slug}`)?.title ?? "";

  return { title, openGraph: { title }, twitter: { title } };
};
