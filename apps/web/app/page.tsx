import type { Metadata } from "next";

import { MyAvatar } from "./_components";
import { RichLinkCard, UniversalLink } from "./_features";
import { siteInfo } from "./_utils";

export default function Page() {
  return (
    <div className="mx-auto grid gap-4 sm:gap-8">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-8">
        <MyAvatar />
        <h1 className="font-bold text-3xl sm:text-5xl">Hirotaka Miyagi</h1>
      </div>
      <p>
        Hey, I am Hirotaka Miyagi, a software engineer based in Tokyo, Japan.
        <br />I am interested in Web, Developer Experience, Doing photography, and Drinking beer 🍻.
        <br />
        and I work in{" "}
        <UniversalLink href="https://route06.co.jp/" isEnabledUnderline>
          ROUTE06, inc
        </UniversalLink>{" "}
        now.
      </p>
      <ul>
        <li>
          <UniversalLink href="/readme" isEnabledUnderline>
            📝 取扱説明書
          </UniversalLink>
        </li>
        <li>
          <UniversalLink href="/behavior" isEnabledUnderline>
            🚲 好む振る舞い
          </UniversalLink>
        </li>
        <li>
          <UniversalLink href="/thinking-in-career" isEnabledUnderline>
            ⛰️ キャリアの指向性(脳内メモ)
          </UniversalLink>
        </li>
        <li>
          <UniversalLink href="/resume" isEnabledUnderline>
            👋 Resume
          </UniversalLink>
        </li>
      </ul>
      <div className="grid gap-2">
        <h2 className="font-bold">Popular Articles</h2>
        <ul className="grid gap-4 sm:grid-cols-2">
          <li>
            <RichLinkCard url={"https://tech.route06.co.jp/entry/2023/08/08/115253"} />
          </li>
          <li>
            <RichLinkCard url={"https://zenn.dev/mh4gf/articles/graphql-codegen-client-preset"} />
          </li>
          <li>
            <RichLinkCard url={"https://zenn.dev/mh4gf/articles/d25ef1ff30b5a6"} />
          </li>
          <li>
            <RichLinkCard url={"https://tech.timee.co.jp/entry/2022/09/29/110000"} />
          </li>
        </ul>
      </div>
    </div>
  );
}

export const metadata: Metadata = {
  title: `About | ${siteInfo.siteName}`,
};
