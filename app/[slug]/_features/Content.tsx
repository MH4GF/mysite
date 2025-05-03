import { MarkdownRenderer } from "@/app/_features";
import { allAbouts } from "contentlayer/generated";

import type { JSX } from "react";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Content = ({ slug, handleNotFound }: Props): JSX.Element => {
  const about = allAbouts.find((about) => about.href === `/${slug}`);
  if (!about) {
    handleNotFound();
    return <></>;
  }

  return (
    <>
      <h1 className="text-xl mb-8">{about.title}</h1>
      <MarkdownRenderer raw={about.body.raw} />
    </>
  );
};
