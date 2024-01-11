/* eslint-disable @typescript-eslint/no-base-to-string */

"use client";

import type { Route } from "next";
import type { LinkProps } from "next/link";
import NextLink from "next/link";

import { useViewTransitionRouter } from "./useViewTransitionRouter";

const isSamePage = (href: string) => href.startsWith("#");

export function Link<T extends string = string>({ children, href, ...props }: LinkProps<T>) {
  const router = useViewTransitionRouter();

  // 同一ページ内での遷移の場合はトランジションを追加すると不安定なため、単純にNextLinkで遷移する
  if (isSamePage(href.toString())) {
    return (
      <NextLink {...props} href={href}>
        {children}
      </NextLink>
    );
  }

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
