import Script from 'next/script';

export const TwitterWidgets = () => (
  <Script src="https://platform.twitter.com/widgets.js" strategy="lazyOnload" />
);
