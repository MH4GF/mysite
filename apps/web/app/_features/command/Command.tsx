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
        <div className="flex justify-end text-xs px-2 py-3 text-muted-foreground gap-2">
          <span>Actions</span>
          <span className="inline-flex gap-1">
            <kbd className="px-1 bg-muted rounded-sm">⌘</kbd>
            <kbd className="px-1 bg-muted rounded-sm">K</kbd>
          </span>
        </div>
      </CommandDialog>
    </>
  );
}
