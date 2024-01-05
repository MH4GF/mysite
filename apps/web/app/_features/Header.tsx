import { GitHubIcon } from "../_components/Icons";

import { ColorModeToggle } from "./colorMode";
import { Link } from "./viewTransition";

const navigation = [{ name: "Articles", href: "/articles" }] as const;

export const Header = () => {
  return (
    <header>
      <nav className="mx-auto flex items-center justify-between py-6" aria-label="Global">
        <div className="flex w-full items-center justify-between gap-12">
          <Link href="/" className="-m-1.5 p-1.5">
            mh4gf.dev
          </Link>
          <div className="flex items-center gap-6">
            {navigation.map((item) => (
              <Link href={item.href} key={item.name}>
                {item.name}
              </Link>
            ))}
            <a
              href="https://github.com/MH4GF/mysite"
              target="_blank"
              rel="noreferrer"
              className="group"
            >
              <GitHubIcon />
            </a>
            <ColorModeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
};
