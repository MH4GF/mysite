import { processor } from "./processor";
import "./styles/autoLinkHeadings.css";
import "./styles/syntaxHighlighting.css";

interface Props {
  raw: string;
}

export const MarkdownRenderer = async ({ raw }: Props): Promise<JSX.Element> => {
  const { result } = await processor.process(raw);

  return (
    <article data-pagefind-body className="prose prose-zinc dark:prose-invert">
      {result}
    </article>
  );
};
