import { createElement } from "react";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { Paragraph } from "./elements";

export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeReact, {
    createElement,
    components: {
      p: Paragraph,
    },
  });
