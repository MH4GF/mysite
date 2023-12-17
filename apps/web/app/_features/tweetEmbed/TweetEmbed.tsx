interface Props {
  tweetId: string;
}

export const TweetEmbed = ({ tweetId }: Props) => {
  return (
    <div>
      <blockquote className="twitter-tweet">
        <a href={`https://twitter.com/anyone/status/${tweetId}`}></a>
      </blockquote>
    </div>
  );
};
