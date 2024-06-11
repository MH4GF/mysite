"use client";

import { MoonIcon, SunIcon } from "@/app/_components";
import { useColorMode } from "./useColorMode";

export const ColorModeToggle = () => {
  const { toggleMode } = useColorMode();

  return (
    <button
      type="button"
      aria-label="テーマ切り替え"
      className="group rounded-sm bg-white/90 px-3 py-2 ring-1 ring-zinc-900/5 backdrop-blur-[8px] transition duration-150 ease-in-out dark:bg-zinc-800/90 dark:hover:ring-white/20 dark:ring-white/10"
      onClick={toggleMode}
    >
      <SunIcon className="h-6 w-6 fill-zinc-100 stroke-zinc-500 transition dark:hidden [@media(prefers-color-scheme:dark)]:fill-teal-50 [@media(prefers-color-scheme:dark)]:group-hover:fill-teal-50 group-hover:fill-zinc-200 [@media(prefers-color-scheme:dark)]:group-hover:stroke-teal-600 [@media(prefers-color-scheme:dark)]:stroke-teal-500 group-hover:stroke-zinc-700" />
      <MoonIcon className="hidden h-6 w-6 fill-zinc-700 stroke-zinc-500 transition dark:block [@media_not_(prefers-color-scheme:dark)]:fill-teal-400/10 [@media(prefers-color-scheme:dark)]:group-hover:stroke-zinc-400 [@media_not_(prefers-color-scheme:dark)]:stroke-teal-500" />
    </button>
  );
};
