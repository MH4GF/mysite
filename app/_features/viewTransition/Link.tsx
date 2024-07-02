/* eslint-disable @typescript-eslint/no-base-to-string */

"use client";

import type { LinkProps as NextLinkProps } from "next/link";
import NextLink from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import type { Route } from "next";
import { useViewTransitionRouter } from "./useViewTransitionRouter";

const isSamePage = (href: string) => href.startsWith("#");

// biome-ignore lint/suspicious/noEmptyBlockStatements: 意図的に空としている
const noop = () => {};

export type LinkProps<T extends string = string> = NextLinkProps<T> &
  Omit<ComponentProps<"a">, keyof NextLinkProps<T>>;

export function Link<T extends string = string>({
  children,
  href,
  onClick,
  ...props
}: LinkProps<T>) {
  const router = useViewTransitionRouter();

  // 同一ページ内での遷移の場合はトランジションを追加すると不安定なため、単純にNextLinkで遷移する
  if (isSamePage(href.toString())) {
    return (
      <NextLink {...props} href={href} onClick={onClick ?? noop}>
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

    router.push(href.toString() as Route);
    onClick?.(e);
  };

  return (
    <NextLink {...props} href={href} onClick={handleLinkClick}>
      {children}
    </NextLink>
  );
}
