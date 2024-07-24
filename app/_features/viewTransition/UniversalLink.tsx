import NextLink from "next/link";

import { forwardRef } from "react";
import type { LinkProps } from "./Link";
import { Link } from "./Link";
import { isSameOrigin } from "./isSameOrigin";

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
