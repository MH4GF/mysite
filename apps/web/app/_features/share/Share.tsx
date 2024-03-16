"use client";

import { useCallback } from "react";

const isShareSupported = typeof navigator === "object" && navigator?.share !== undefined;

const ShareIcon = ({ className }: { className: string }) => (
  <svg
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <title>シェア</title>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
    />
  </svg>
);

interface Props {
  shareData: ShareData;
}

const Share = ({ shareData }: Props) => {
  const handleClick = useCallback(() => {
    if (!isShareSupported) return;

    navigator.share(shareData).catch(console.error);
  }, [shareData]);

  return isShareSupported ? (
    <button
      type="button"
      className="inline-flex items-center gap-2 rounded-sm border border-zinc-200 p-2 text-sm text-zinc-600 transition-colors duration-300 dark:border-zinc-700 dark:hover:border-zinc-500 hover:border-zinc-500 dark:hover:text-zinc-300 dark:text-zinc-400 hover:text-zinc-800"
      onClick={handleClick}
    >
      <ShareIcon className="h-4 w-4" />
      <span>Share</span>
    </button>
  ) : null;
};

// NOTE: App RouterのServer Componentからnext/dynamicで読み込む場合エラーになり、
// default exportで読み込み必要があった
// @see: https://github.com/vercel/next.js/issues/58238
// @see: https://zenn.dev/euxn23/articles/cecab60f672d2d
export default Share;
