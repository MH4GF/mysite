import type { ComponentProps } from "react";

type Props = ComponentProps<"blockquote">;

// @see: https://developer.twitter.com/en/docs/twitter-for-websites/webpage-properties
export const TweetEmbed = (props: Props) => {
  return (
    <>
      <div className="dark:hidden">
        <blockquote {...props} data-theme="light" />
      </div>
      <div className="hidden dark:block">
        <blockquote {...props} data-theme="dark" />
      </div>
    </>
  );
};
