import type { Metadata } from "next";

import { MyAvatar } from "./_components";
import { SocialLink, UniversalLink } from "./_features";
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
      <div className="flex items-center gap-2 sm:gap-4">
        <SocialLink kind="x" />
        <SocialLink kind="github" />
      </div>
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
    </div>
  );
}

export const metadata: Metadata = {
  title: `About | ${siteInfo.siteName}`,
};
