import { Command } from "lucide-react";
import type { FC } from "react";

type Props = {
  onClick: () => void;
};

export const CommandTrigger: FC<Props> = ({ onClick }) => {
  return (
    <button
      aria-label="Open command palette"
      onClick={onClick}
      type="button"
      className="fixed bottom-5 md:bottom-10 right-5 md:right-10 rounded-full shadow-sm hover:shadow-md transition-colors w-10 h-10 grid place-content-center bg-zinc-500 text-zinc-100 hover:bg-zinc-500/90 dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-700/90"
    >
      <Command className="stroke-current" size="16" />
    </button>
  );
};
