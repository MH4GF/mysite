import { Tweet } from "react-tweet";
import "react-tweet/theme.css";

type Props = {
  id: string;
};

export const TweetEmbed = ({ id }: Props) => {
  return <Tweet id={id} />;
};
