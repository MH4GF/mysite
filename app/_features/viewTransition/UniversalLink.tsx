import NextLink from "next/link";

import { forwardRef } from "react";
import { isSameOrigin } from "./isSameOrigin";
import type { LinkProps } from "./Link";
import { Link } from "./Link";

const animatedUnderline =
  "no-underline transition-colors duration-300 border-b border-solid border-zinc-200 hover:border-zinc-500 dark:border-zinc-700 dark:hover:border-zinc-500";

const hoveredUnderline =
  "no-underline hover:border-b hover:border-solid hover:border-zinc-200 dark:hover:border-zinc-700";

type Props = LinkProps & {
  isExternal?: boolean;
  isEnabledUnderline?: boolean;
  isEnabledHoveredUnderline?: boolean;
};

export const UniversalLink = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      isExternal,
      isEnabledUnderline = false,
      isEnabledHoveredUnderline = false,
      className: ClassName,
      ...props
    }: Props,
    ref,
  ) => {
    const className = `${ClassName || ""} ${isEnabledUnderline ? animatedUnderline : isEnabledHoveredUnderline ? hoveredUnderline : ""}`;

    if (isExternal || !isSameOrigin(props.href)) {
      return (
        <NextLink target="_blank" rel="noreferrer" className={className} {...props} ref={ref} />
      );
    }

    return <Link className={className} {...props} ref={ref} />;
  },
);
