import type { ComponentProps } from "react";

import { TweetEmbed } from "../../tweetEmbed";

type Props = ComponentProps<"blockquote"> & {
  "data-tweet-id"?: string;
};

export const Blockquote = (props: Props) => {
  const tweetId = props["data-tweet-id"];
  if (typeof tweetId === "string" && tweetId.length > 0) {
    return <TweetEmbed id={tweetId} />;
  }

  return <blockquote {...props} />;
};
