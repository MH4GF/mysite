"use client";

import { MoonIcon, SunIcon } from "@/app/_components";

export const ColorModeToggle = () => {
  function disableTransitionsTemporarily() {
    document.documentElement.classList.add("[&_*]:!transition-none");
    window.setTimeout(() => {
      document.documentElement.classList.remove("[&_*]:!transition-none");
    }, 0);
  }

  function toggleMode() {
    disableTransitionsTemporarily();

    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const isSystemDarkMode = darkModeMediaQuery.matches;
    const isDarkMode = document.documentElement.classList.toggle("dark");

    if (isDarkMode === isSystemDarkMode) {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete window.localStorage.isDarkMode;
    } else {
      window.localStorage.isDarkMode = isDarkMode;
    }
  }

  return (
    <button
      type="button"
      aria-label="Toggle dark mode"
      className="group rounded-sm bg-white/90 px-3 py-2 ring-1 ring-zinc-900/5 backdrop-blur-[8px] transition duration-150 ease-in-out dark:bg-zinc-800/90 dark:hover:ring-white/20 dark:ring-white/10"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 group-hover:fill-zinc-200 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600 [@media(prefers-color-scheme:dark)]:stroke-teal-500 group-hover:stroke-zinc-700" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </button>
  );
};
