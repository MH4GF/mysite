import type { LinkProps } from "./Link";

const sameOriginPrefixes = [
  "/", // ルート相対パス
  "#", // 同一ページ内リンク
] as const;

const baseOrigin = new URL(`https://${process.env.VERCEL_URL}` || "http://localhost:3000").origin;

type Href = LinkProps["href"];

export const isSameOrigin = (_href: Href) => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const href = _href.toString();
  if (sameOriginPrefixes.some((prefix) => href.startsWith(prefix))) {
    return true;
  }

  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return false;
  }

  return url.origin === baseOrigin;
};
