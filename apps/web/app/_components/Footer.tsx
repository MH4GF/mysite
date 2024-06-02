import { SocialLink, UniversalLink } from "../_features";

import { RssIcon } from "./Icons";

export const Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={`${className} border-t border-zinc-200 p-4 dark:border-zinc-600`}>
      <div className="mx-auto flex max-w-6xl justify-between px-4">
        <p className="text-xs text-zinc-500 leading-5 dark:text-zinc-400">
          &copy; 2024 Hirotaka Miyagi, All rights reserved.
        </p>
        <div className="flex items-center gap-2">
          <UniversalLink href="/articles/feed">
            <RssIcon className="h-6 w-6" />
          </UniversalLink>
          <SocialLink kind="x" />
          <SocialLink kind="github" />
        </div>
      </div>
    </footer>
  );
};
