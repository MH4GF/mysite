import { UniversalLink } from "./viewTransition";

export const Header = () => {
  return (
    <header className="sticky top-0 h-24 bg-gradient-to-b from-white to-transparent dark:from-zinc-900">
      <nav
        className="mx-auto flex w-full max-w-6xl items-center justify-between gap-12 px-4 py-6"
        aria-label="グローバルナビゲーション"
      >
        <UniversalLink href="/" className="-m-1.5 p-1.5">
          mh4gf.dev
        </UniversalLink>
      </nav>
    </header>
  );
};
