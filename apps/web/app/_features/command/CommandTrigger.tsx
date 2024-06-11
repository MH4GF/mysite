import type { FC } from "react";
import { Command } from "lucide-react";

type Props = {
  onClick: () => void;
};

export const CommandTrigger: FC<Props> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="fixed bottom-10 right-10 rounded-full border-zinc-700 bg-zinc-800 border w-10 h-10 grid place-content-center"
    >
      <Command className="stroke-current" size="16" />
    </button>
  );
};
