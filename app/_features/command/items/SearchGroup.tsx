import { useCommandState } from "cmdk";
import { ExternalLink, PenLine } from "lucide-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { CommandEmpty, CommandGroup, CommandLoading } from "@/app/_components/ui/command";
import { CommandLinkItem } from "./CommandLinkItem";

type Data = {
  url: string;
  meta: {
    title: string;
    externalLink?: "true";
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

// biome-ignore lint/complexity/noVoid: Required to execute async IIFE for pagefind initialization
void (async () => {
  if (typeof window !== "undefined" && typeof window.pagefind === "undefined") {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      window.pagefind = await import(
        // @ts-expect-error pagefind.js generated after build
        /* webpackIgnore: true */ "/search/pagefind.js"
      );
    } catch {
      window.pagefind = { search: () => Promise.resolve({ results: [] }) };
    }
  }
})();

const URL_REGEX = /\/server\/app\/articles\/(.*)\.html/;

const formatUrl = (url: string): string => {
  // /server/app/articles/kaigi-on-rails-2022.html
  // /articles/kaigi-on-rails-2022 にしたい
  return url.replace(URL_REGEX, "/articles/$1");
};

const useData = (result: Result) => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.resolve()
      .then(() => setIsLoading(true))
      .then(() => result.data())
      .then(setData)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [result]);

  return { data, isLoading };
};

const SearchResultItem: FC<{ result: Result }> = ({ result }) => {
  const { data, isLoading } = useData(result);
  const Icon = data?.meta.externalLink === "true" ? ExternalLink : PenLine;

  if (isLoading) {
    return <LoadingItem />;
  }

  if (data === null) {
    return null;
  }

  return (
    <CommandLinkItem href={formatUrl(data.url)}>
      <Icon className="mr-2 h-4 w-4 flex-none" />
      <span className="truncate">{data?.meta.title}</span>
    </CommandLinkItem>
  );
};

const search = async (query: string): Promise<Result[]> => {
  if (!window.pagefind) {
    return [];
  }

  return (await window.pagefind.search(query)).results;
};

const useSearch = (query: string) => {
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.resolve()
      .then(() => setIsLoading(true))
      .then(() => search(query))
      .then(setResults)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [query]);

  return { results, isLoading };
};

const SearchResultItems = () => {
  const query = useCommandState((state) => state.search);
  const { results, isLoading } = useSearch(query);

  if (isLoading) {
    return (
      <>
        <LoadingItem />
        <LoadingItem />
        <LoadingItem />
      </>
    );
  }

  if (results.length === 0) {
    return <CommandEmpty>No results found for "{query}"</CommandEmpty>;
  }

  return results.map((result) => <SearchResultItem key={result.id} result={result} />);
};

const LoadingItem = () => {
  return (
    <CommandLoading>
      <PenLine className="mr-2 h-5 w-5" />
      <span className="animate-pulse bg-muted w-full h-5 rounded-xs" />
    </CommandLoading>
  );
};

export const SearchGroup = () => {
  return (
    <CommandGroup heading="Search" forceMount>
      <SearchResultItems />
    </CommandGroup>
  );
};
