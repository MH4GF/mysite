import Script from "next/script";

export const HatenaBookmarkScript = () => {
  return <Script src="https://b.st-hatena.com/js/bookmark_button.js" strategy="lazyOnload" />;
};
