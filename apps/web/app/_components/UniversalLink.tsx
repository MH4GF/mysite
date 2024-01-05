import type { UrlObject } from "url";

import type { Route } from "next";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

import { Link } from "../_features/viewTransition";

const baseOrigin = new URL(`https://${process.env.VERCEL_URL}` || "http://localhost:3000").origin;

const isSameOrigin = <T extends string = string>(_href: Route<T> | UrlObject) => {
  // eslint-disable-next-line @typescript-eslint/no-base-to-string
  const href = _href.toString();
  let url: URL;
  try {
    url = new URL(href);
  } catch {
    return href.startsWith("/");
  }

  return url.origin === baseOrigin;
};

type Props<T extends string = string> = LinkProps<T> & {
  isExternal?: boolean;
};

export function UniversalLink<T extends string = string>({ isExternal, ...props }: Props<T>) {
  if (isExternal || !isSameOrigin<T>(props.href)) {
    return <NextLink target="_blank" rel="noreferrer" {...props} />;
  }

  return <Link {...props} />;
}
