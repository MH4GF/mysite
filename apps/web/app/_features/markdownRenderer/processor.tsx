import * as prod from "react/jsx-runtime";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { Paragraph } from "./elements";

export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeReact, {
    // @ts-expect-error: the react types are missing.
    Fragment: prod.Fragment,
    // @ts-expect-error: the react types are missing.
    jsx: prod.jsx,
    // @ts-expect-error: the react types are missing.
    jsxs: prod.jsxs,
    components: { p: Paragraph },
  });
