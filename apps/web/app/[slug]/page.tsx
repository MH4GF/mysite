import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Content } from "./_features";

import { rootJoin } from "@/app/_utils";
import { getSlugs } from "@/app/_utils/server";

interface Params {
  slug: string;
}

interface Props {
  params: Params;
}

export default function Page({ params }: Props) {
  return <Content {...params} handleNotFound={notFound} />;
}

export const generateStaticParams = async (): Promise<Params[]> => {
  const dirPath = rootJoin("contents/about");
  return await getSlugs(dirPath);
};

const aboutContentMap: Record<string, string> = {
  behavior: "好む振る舞い",
  readme: "取扱説明書",
  resume: "Resume",
} as const;

export const generateMetadata = ({ params }: Props): Metadata => {
  const value = aboutContentMap[params.slug];
  const title = value ?? "";

  return { title, openGraph: { title }, twitter: { title } };
};
