import { CommandItem } from "@/app/_components/ui/command";
import { SunMoon } from "lucide-react";
import { useColorMode } from "@/app/_features/colorMode";

export const ColorTheme = () => {
  const { toggleMode, currentMode } = useColorMode();
  const nextMode = currentMode === "light" ? "Dark" : "Light";

  return (
    <CommandItem onSelect={toggleMode}>
      <SunMoon className="mr-2 h-4 w-4" />
      <span>Change to {nextMode} Mode</span>
    </CommandItem>
  );
};
