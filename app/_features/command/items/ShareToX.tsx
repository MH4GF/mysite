import { useMemo } from "react";
import { XIcon } from "@/app/_components";
import { CommandLinkItem } from "./CommandLinkItem";

export const ShareToX = () => {
  const shareUrl = useMemo(() => {
    const shareUrl = new URL("https://twitter.com/share");
    shareUrl.searchParams.append("url", window.location.href);
    shareUrl.searchParams.append("text", document.title);

    return shareUrl.toString();
  }, []);

  return (
    <CommandLinkItem href={shareUrl}>
      <XIcon className="mr-2 fill-current" />
      <span>Share to X</span>
    </CommandLinkItem>
  );
};
