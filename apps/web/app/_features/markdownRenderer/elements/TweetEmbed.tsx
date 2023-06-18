'use client'

import { TwitterTweetEmbed } from 'react-twitter-embed'

interface Props {
  tweetId: string
}

export const TweetEmbed = ({ tweetId }: Props) => {
  return <TwitterTweetEmbed tweetId={tweetId} />
}
