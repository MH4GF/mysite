'use client';

import { useEffect, useRef } from 'react';

const generateEmbedHtml = (tweetId: string) => {
  return `
    <blockquote class="twitter-tweet">
      <a href="https://twitter.com/anyone/status/${tweetId}"></a>
    </blockquote>
  `;
};

interface Props {
  tweetId: string;
}

export const TweetEmbed = ({ tweetId }: Props) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // @ts-expect-error ...
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    window.twttr?.widgets.load(ref.current);
  }, [tweetId]);

  return <div dangerouslySetInnerHTML={{ __html: generateEmbedHtml(tweetId) }} ref={ref} />;
};
