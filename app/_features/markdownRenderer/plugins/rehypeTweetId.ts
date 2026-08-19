import type { Element, Nodes, Root } from "hast";

const STATUS_URL_RE = /(?:twitter|x)\.com\/[^/]+\/status\/(\d+)/;

const isElement = (node: Nodes): node is Element => node.type === "element";

const hasTwitterTweetClass = (node: Element): boolean => {
  const { className } = node.properties;
  return Array.isArray(className) && className.includes("twitter-tweet");
};

const findTweetId = (nodes: readonly Nodes[]): string | undefined => {
  let id: string | undefined;
  for (const node of nodes) {
    if (!isElement(node)) {
      continue;
    }
    if (node.tagName === "a") {
      const href = node.properties.href;
      if (typeof href === "string") {
        const match = STATUS_URL_RE.exec(href);
        if (match?.[1]) {
          id = match[1];
        }
      }
    }
    const nested = findTweetId(node.children);
    if (nested) {
      id = nested;
    }
  }
  return id;
};

const visit = (nodes: readonly Nodes[]): void => {
  for (const node of nodes) {
    if (!isElement(node)) {
      continue;
    }
    if (node.tagName === "blockquote" && hasTwitterTweetClass(node)) {
      const id = findTweetId(node.children);
      if (id) {
        node.properties.dataTweetId = id;
      }
    }
    visit(node.children);
  }
};

export const rehypeTweetId = () => (tree: Root) => {
  visit(tree.children);
};
