import { allAbouts } from "contentlayer/generated";
import type { JSX } from "react";
import { AskAIDropdown, MarkdownRenderer } from "@/app/_features";

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

  const markdownUrl = `/${slug}.md`;

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl">{about.title}</h1>
        <AskAIDropdown markdownUrl={markdownUrl} />
      </div>
      <MarkdownRenderer raw={about.body.raw} />
    </>
  );
};
