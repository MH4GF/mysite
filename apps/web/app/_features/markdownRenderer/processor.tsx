import { createElement } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { Paragraph } from "./elements";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypePrettyCode, {})
  // @ts-expect-error ... rehypePrettyCode is not typed correctly
  .use(rehypeRaw)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(rehypeReact, {
    createElement,
    components: {
      p: Paragraph,
    },
  });
