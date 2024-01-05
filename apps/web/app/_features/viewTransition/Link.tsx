/* eslint-disable @typescript-eslint/no-base-to-string */

"use client";

import type { Route } from "next";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

import { useViewTransitionRouter } from "./useViewTransitionRouter";

export function Link<T extends string = string>({ children, href, ...props }: LinkProps<T>) {
  const router = useViewTransitionRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    router.push<Route>(href.toString() as Route);
  };

  return (
    <NextLink {...props} href={href} onClick={handleLinkClick}>
      {children}
    </NextLink>
  );
}
