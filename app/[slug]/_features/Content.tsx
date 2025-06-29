import { allAbouts } from "contentlayer/generated";
import type { JSX } from "react";
import { MarkdownRenderer } from "@/app/_features";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Content = ({ slug, handleNotFound }: Props): JSX.Element | null => {
  const about = allAbouts.find((about) => about.href === `/${slug}`);
  if (!about) {
    handleNotFound();
    return null;
  }

  return (
    <>
      <h1 className="text-xl mb-8">{about.title}</h1>
      <MarkdownRenderer raw={about.body.raw} />
    </>
  );
};
