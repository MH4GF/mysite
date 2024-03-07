import type { Route } from "next";
import type { FC } from "react";
import { useMemo } from "react";

import { UniversalLink } from "..";
import { XIcon } from "../../_components";

type Props = {
  url: string;
  text: string;
};

export const XShareButton: FC<Props> = ({ url, text }) => {
  const shareUrl = useMemo(() => {
    const shareUrl = new URL("https://twitter.com/share");
    shareUrl.searchParams.append("url", url);
    shareUrl.searchParams.append("text", text);

    return shareUrl.toString();
  }, [url, text]);

  return (
    <UniversalLink
      href={shareUrl as Route}
      isExternal
      isEnabledUnderline
      className="inline-flex items-center rounded-sm border border-zinc-200 p-3 text-sm text-zinc-600 transition-colors duration-300 dark:border-zinc-700 dark:hover:border-zinc-500 hover:border-zinc-500 dark:hover:text-zinc-300 dark:text-zinc-400 hover:text-zinc-800"
    >
      <XIcon className="h-4 w-4" />
    </UniversalLink>
  );
};
