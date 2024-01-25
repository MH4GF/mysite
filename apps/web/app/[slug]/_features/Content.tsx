import { MarkdownRenderer } from "@/app/_features";
import { allAbouts } from "contentlayer/generated";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const Content = ({ slug, handleNotFound }: Props): JSX.Element => {
  const about = allAbouts.find((about) => about.url === `/${slug}`);
  if (!about) {
    handleNotFound();
    return <></>;
  }

  return <MarkdownRenderer raw={about.body.raw} />;
};
