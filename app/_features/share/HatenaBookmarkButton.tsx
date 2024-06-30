import Image from "next/image";
import type { FC } from "react";

const removeProtocol = (url: string) => url.replace(/^https?:\/\//, "");

type Props = {
  url: string;
};

export const HatenaBookmarkButton: FC<Props> = ({ url }) => {
  return (
    <a
      href={`https://b.hatena.ne.jp/entry/s/${removeProtocol(url)}`}
      className="hatena-bookmark-button"
      data-hatena-bookmark-layout="vertical-normal"
      data-hatena-bookmark-lang="ja"
      title="このエントリーをはてなブックマークに追加"
    >
      <Image
        src="https://b.st-hatena.com/images/v4/public/entry-button/button-only@2x.png"
        alt="このエントリーをはてなブックマークに追加"
        width="20"
        height="20"
        style={{ border: "none" }}
      />
    </a>
  );
};
