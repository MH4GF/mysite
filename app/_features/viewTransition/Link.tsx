/* eslint-disable @typescript-eslint/no-base-to-string */

"use client";

import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import { type ComponentProps, forwardRef, type MouseEvent } from "react";

import { useViewTransitionRouter } from "./useViewTransitionRouter";

const isSamePage = (href: string) => href.startsWith("#");

// biome-ignore lint/suspicious/noEmptyBlockStatements: Required no-op function for fallback
const noop = () => {};

export type LinkProps = NextLinkProps & Omit<ComponentProps<"a">, keyof NextLinkProps>;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { children, href, onClick, ...props },
  ref,
) {
  const router = useViewTransitionRouter();

  // 同一ページ内での遷移の場合はトランジションを追加すると不安定なため、単純にNextLinkで遷移する
  if (isSamePage(href.toString())) {
    return (
      <NextLink {...props} href={href} onClick={onClick ?? noop} ref={ref}>
        {children}
      </NextLink>
    );
  }

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
    if (e.ctrlKey || e.metaKey) {
      return;
    }

    e.preventDefault();

    router.push(href.toString());
    onClick?.(e);
  };

  return (
    <NextLink {...props} href={href} onClick={handleLinkClick} ref={ref}>
      {children}
    </NextLink>
  );
});
