import NextLink from "next/link";

import { forwardRef } from "react";
import type { LinkProps } from "./Link";
import { Link } from "./Link";

type Href = LinkProps["href"];

const sameOriginPrefixes = [
  "/", // ルート相対パス
  "#", // 同一ページ内リンク
] as const;

const baseOrigin = new URL(`https://${process.env.VERCEL_URL}` || "http://localhost:3000").origin;

const isSameOrigin = (_href: Href) => {
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
  "no-underline transition-colors duration-300 border-b border-solid border-zinc-200 hover:border-zinc-500 dark:border-zinc-700 dark:hover:border-zinc-500";

type Props = LinkProps & {
  isExternal?: boolean;
  isEnabledUnderline?: boolean;
};

export const UniversalLink = forwardRef<HTMLAnchorElement, Props>(
  ({ isExternal, isEnabledUnderline = false, className: _className, ...props }: Props, ref) => {
    const className = `${_className || ""} ${isEnabledUnderline ? animatedUnderline : ""}`;

    if (isExternal || !isSameOrigin(props.href)) {
      return (
        <NextLink target="_blank" rel="noreferrer" className={className} {...props} ref={ref} />
      );
    }

    return <Link className={className} {...props} ref={ref} />;
  },
);
