"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/app/_components/ui/command";
import { useEffect, useState } from "react";
import { CommandTrigger } from "./CommandTrigger";
import { ColorTheme } from "./items/ColorTheme";
import { CommandFooter } from "./CommandFooter";

export function Command() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandTrigger onClick={() => setOpen(true)} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <ColorTheme />
          </CommandGroup>
        </CommandList>
        <CommandSeparator />
        <CommandFooter />
      </CommandDialog>
    </>
  );
}
