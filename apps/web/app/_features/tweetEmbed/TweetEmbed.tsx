interface Props {
  tweetId: string;
}

export const TweetEmbed = ({ tweetId }: Props) => {
  return (
    <div>
      <blockquote className="twitter-tweet">
        {/* biome-ignore lint/a11y/useAnchorContent: <explanation> */}
        <a href={`https://twitter.com/anyone/status/${tweetId}`} />
      </blockquote>
    </div>
  );
};
