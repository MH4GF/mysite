import { CommandGroup, CommandItem } from "@/app/_components/ui/command";
import { useCommandState } from "cmdk";
import { SunMoon } from "lucide-react";
import type { Route } from "next";
import type { FC } from "react";
import { Suspense, cache, use } from "react";
import { CommandLinkItem } from "./CommandLinkItem";

type Data = {
  url: string;
  meta: {
    title: string;
  };
  excerpt: string;
};

type Result = {
  id: string;
  data: () => Promise<Data>;
};

type Pagefind = {
  search: (query: string) => Promise<{ results: Result[] }>;
};

declare global {
  interface Window {
    pagefind: Pagefind | undefined;
  }
}

// biome-ignore lint/complexity/noVoid: <explanation>
void (async () => {
  if (typeof window !== "undefined" && typeof window.pagefind === "undefined") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      window.pagefind = await import(
        // @ts-expect-error pagefind.js generated after build
        // eslint-disable-next-line import/no-unresolved
        /* webpackIgnore: true */ "/search/pagefind.js"
      );
    } catch {
      window.pagefind = { search: () => Promise.resolve({ results: [] }) };
    }
  }
})();

const getData = cache(async (result: Result) => result.data());
const formatUrl = (url: string): string => {
  // /server/app/articles/kaigi-on-rails-2022.html
  // /articles/kaigi-on-rails-2022 にしたい
  return url.replace(/\/server\/app\/articles\/(.*)\.html/, "/articles/$1");
};

const SearchResultItem: FC<{ result: Result; onOpenChange: (open: boolean) => void }> = ({
  result,
  onOpenChange,
}) => {
  const data = use(getData(result));

  return (
    <CommandLinkItem href={formatUrl(data.url) as Route} onOpenChange={onOpenChange}>
      <SunMoon className="mr-2 h-4 w-4" />
      <span>{data.meta.title}</span>
    </CommandLinkItem>
  );
};

const search = cache(async (query: string): Promise<Result[]> => {
  if (!window.pagefind) {
    return [];
  }

  return (await window.pagefind.search(query)).results;
});

const SearchResultItems: FC<{ onOpenChange: (open: boolean) => void }> = ({ onOpenChange }) => {
  const query = useCommandState((state) => state.search);
  const results = use(search(query));

  return results.map((result) => (
    <Suspense key={result.id} fallback={<LoadingItem />}>
      <SearchResultItem result={result} onOpenChange={onOpenChange} />
    </Suspense>
  ));
};

const LoadingItem = () => {
  return (
    <CommandItem>
      <SunMoon className="mr-2 h-4 w-4" />
      <span>Loading...</span>
    </CommandItem>
  );
};

export const SearchGroup: FC<{ onOpenChange: (open: boolean) => void }> = ({ onOpenChange }) => {
  return (
    <CommandGroup heading="Search" forceMount>
      <Suspense fallback={<LoadingItem />}>
        <SearchResultItems onOpenChange={onOpenChange} />
      </Suspense>
    </CommandGroup>
  );
};