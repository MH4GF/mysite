import type { LinkProps } from "next/link";
import NextLink from "next/link";

import { Link } from "../_features/viewTransition";

type Props<T extends string = string> = LinkProps<T> & {
  isExternal?: boolean;
};

export function UniversalLink<T extends string = string>({ isExternal, ...props }: Props<T>) {
  if (isExternal) {
    return <NextLink target="_blank" rel="noreferrer" {...props} />;
  }

  return <Link {...props} />;
}
