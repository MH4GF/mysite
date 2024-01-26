import type { ComponentProps } from "react";
import { createElement } from "react";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

import { UniversalLink } from "../../_components";

import { Paragraph } from "./elements";

const Link = (props: ComponentProps<typeof UniversalLink>) => {
  return <UniversalLink {...props} isEnabledUnderline />;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: {
      className: ["heading-anchor"],
    },
  })
  .use(rehypePrettyCode, {
    keepBackground: false,
    theme: "catppuccin-frappe",
  })
  // @ts-expect-error ... rehypePrettyCode is not typed correctly
  .use(rehypeRaw)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(rehypeReact, {
    createElement,
    components: {
      p: Paragraph,
      a: Link,
    },
  });
