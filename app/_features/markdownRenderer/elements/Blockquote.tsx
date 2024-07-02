import type { ComponentProps } from "react";

import { TweetEmbed } from "../../tweetEmbed";

type Props = ComponentProps<"blockquote">;

export const Blockquote = (props: Props) => {
  if (props.className?.includes("twitter-tweet")) {
    return <TweetEmbed {...props} />;
  }

  return <blockquote {...props} />;
};
