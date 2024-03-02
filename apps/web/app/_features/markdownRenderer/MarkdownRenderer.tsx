import { processor } from "./processor";
import "./styles/autoLinkHeadings.css";
import "./styles/syntaxHighlighting.css";

interface Props {
  raw: string;
}

export const MarkdownRenderer = async ({ raw }: Props): Promise<JSX.Element> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  const { result } = await processor.process(raw);

  return <article className="prose prose-zinc dark:prose-invert">{result}</article>;
};
