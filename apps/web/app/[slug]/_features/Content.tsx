import { MarkdownRenderer } from "@/app/_features";
import { allAbouts } from "contentlayer/generated";

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
      <h1 className="font-bold text-4xl">{about.title}</h1>
      <MarkdownRenderer raw={about.body.raw} />
    </>
  );
};
