import type { TocItem } from "remark-flexible-toc";
import remarkFlexibleToc from "remark-flexible-toc";
import { type Processor, unified } from "unified";

import type { FC } from "react";
import remarkParse from "remark-parse";

function compiler(this: Processor) {
  this.compiler = () => "";
}

const processor = unified().use(remarkParse).use(remarkFlexibleToc).use(compiler);

interface TocListProps {
  items: TocItem[];
}

const TocList: FC<TocListProps> = ({ items }) => {
  if (items.length === 0 || !items[0]?.depth) {
    return null;
  }

  const currentDepth = items[0].depth;

  return (
    <ol className="[&_ol]:ml-4">
      {items.map((item, index) => {
        if (item.depth !== currentDepth) {
          return null;
        }

        const nextIndex = items.findIndex(
          (nextItem, i) => i > index && nextItem.depth <= currentDepth,
        );
        const childItems =
          nextIndex === -1 ? items.slice(index + 1) : items.slice(index + 1, nextIndex);

        return (
          <li key={item.href} className="py-1">
            <a href={item.href}>{item.value}</a>
            {childItems.length > 0 &&
              childItems[0]?.depth &&
              childItems[0]?.depth > currentDepth && <TocList items={childItems} />}
          </li>
        );
      })}
    </ol>
  );
};

type Props = {
  raw: string;
};

export const MarkdownToToc: FC<Props> = async ({ raw }) => {
  const { data } = await processor.process(raw);
  const toc = data.toc as TocItem[];

  return (
    <nav className="text-sm text-zinc-500 dark:text-zinc-400" aria-label="目次">
      <TocList items={toc} />
    </nav>
  );
};
