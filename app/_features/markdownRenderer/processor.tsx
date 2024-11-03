import Image from "next/image";
import type { ComponentProps } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import rehypeReact from "rehype-react";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { transformerNotationDiff } from "shikiji-transformers";
import { unified } from "unified";

import { UniversalLink } from "../viewTransition";

import { Blockquote, Paragraph } from "./elements";

const Link = (props: ComponentProps<typeof UniversalLink>) => {
  return <UniversalLink {...props} isEnabledUnderline />;
};

const Img = (props: ComponentProps<typeof Image>) => {
  return <Image width="840" height="472" {...props} />;
};

const Pre = (props: ComponentProps<"pre">) => {
  // biome-ignore lint/a11y/noNoninteractiveTabindex: コードブロックは横スクロールが必要なため、tabIndexを付与しキーボードによる操作を可能にする
  return <pre tabIndex={0} {...props} />;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
export const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(remarkRehype, { allowDangerousHtml: true })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(rehypeSlug)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: {
      className: ["heading-anchor"],
      "aria-label": "このセクションへのリンク",
    },
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(rehypePrettyCode, {
    keepBackground: false,
    theme: "github-dark-dimmed",
    transformers: [transformerNotationDiff()],
  })
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(rehypeRaw)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  .use(rehypeReact, {
    Fragment,
    jsx,
    jsxs,
    components: {
      p: Paragraph,
      a: Link,
      blockquote: Blockquote,
      img: Img,
      pre: Pre,
    },
  });
