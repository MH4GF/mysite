import { GitHubIcon } from "../_components";

import { ColorModeToggle } from "./colorMode";
import { UniversalLink } from "./viewTransition";

const navigation = [{ name: "Articles", href: "/articles" }] as const;

export const Header = () => {
  return (
    <header>
      <nav
        className="mx-auto flex w-full items-center justify-between gap-12 py-6"
        aria-label="グローバルナビゲーション"
      >
        <UniversalLink href="/" className="-m-1.5 p-1.5">
          mh4gf.dev
        </UniversalLink>
        <div className="flex items-center gap-6">
          {navigation.map((item) => (
            <UniversalLink href={item.href} key={item.name}>
              {item.name}
            </UniversalLink>
          ))}
          <UniversalLink
            href="https://github.com/MH4GF/mysite"
            className="group"
            aria-label="このサイトのGitHubリポジトリ"
          >
            <GitHubIcon className="h-6 w-6" />
          </UniversalLink>
          <ColorModeToggle />
        </div>
      </nav>
    </header>
  );
};
