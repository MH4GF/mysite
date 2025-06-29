import type { FC, PropsWithChildren } from "react";
import { createContext, useContext } from "react";

type CommandContextValue = {
  onOpenChange: (open: boolean) => void;
};

const CommandContext = createContext<CommandContextValue>({
  // biome-ignore lint/suspicious/noEmptyBlockStatements: Default no-op function required for context
  onOpenChange: () => {},
});

export const CommandProvider: FC<PropsWithChildren<CommandContextValue>> = ({
  onOpenChange,
  children,
}) => {
  return <CommandContext.Provider value={{ onOpenChange }}>{children}</CommandContext.Provider>;
};

export const useCommandContext = () => useContext(CommandContext);
