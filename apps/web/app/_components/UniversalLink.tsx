import type { UrlObject } from "url";

import type { Route } from "next";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

import { Link } from "../_features/viewTransition";

const sameOriginPrefixes = [
  "/", // ルート相対パス
  "#", // 同一ページ内リンク
] as const;

const baseOrigin = new URL(`https://${process.env.VERCEL_URL}` || "http://localhost:3000").origin;

const isSameOrigin = <T extends string = string>(_href: Route<T> | UrlObject) => {
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

const animatedUnderline =
  "no-underline transition-colors duration-300 border-b border-solid border-zinc-200 hover:border-zinc-800 dark:border-zinc-700 dark:hover:border-zinc-300";

type Props<T extends string = string> = LinkProps<T> & {
  isExternal?: boolean;
  isEnabledUnderline?: boolean;
};

export function UniversalLink<T extends string = string>({
  isExternal,
  isEnabledUnderline = false,
  className: _className,
  ...props
}: Props<T>) {
  const className = `${_className || ""} ${isEnabledUnderline ? animatedUnderline : ""}`;

  if (isExternal || !isSameOrigin<T>(props.href)) {
    return <NextLink target="_blank" rel="noreferrer" className={className} {...props} />;
  }

  return <Link className={className} {...props} />;
}
