import { getArticle } from "../articles";

import { processor } from "./processor";

interface Props {
  slug: string;
  handleNotFound: () => void;
}

export const MarkdownRenderer = async ({ slug, handleNotFound }: Props): Promise<JSX.Element> => {
  const article = getArticle(slug);
  if (!article) {
    handleNotFound();
    return <></>;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const { result } = await processor.process(article.body.raw);

  return <article className="prose prose-zinc dark:prose-invert">{result}</article>;
};
