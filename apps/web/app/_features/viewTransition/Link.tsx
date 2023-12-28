"use client";

import type { Route } from "next";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

import { useViewTransitionRouter } from "./useViewTransitionRouter";

export function Link<T extends string = string>(props: LinkProps<T>) {
  const router = useViewTransitionRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // eslint-disable-next-line @typescript-eslint/no-base-to-string
    router.push<Route>(props.href.toString() as Route);
  };

  return <NextLink {...props} onClick={handleLinkClick} />;
}
