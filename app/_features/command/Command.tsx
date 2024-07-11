"use client";

import { GitHubIcon } from "@/app/_components";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/app/_components/ui/command";
import { PenLine } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandFooter } from "./CommandFooter";
import { CommandProvider } from "./CommandProvider";
import { CommandTrigger } from "./CommandTrigger";
import { ColorTheme, CommandLinkItem, SearchGroup } from "./items";

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
    <CommandProvider onOpenChange={setOpen}>
      <CommandTrigger onClick={() => setOpen(true)} />
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandGroup heading="Suggestions">
            <ColorTheme />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Contents">
            <CommandLinkItem href="/articles">
              <PenLine className="mr-2 h-4 w-4" />
              <span>All Writing</span>
            </CommandLinkItem>
            <CommandLinkItem href="/behavior">
              <PenLine className="mr-2 h-4 w-4" />
              <span>好む振る舞い</span>
            </CommandLinkItem>
            <CommandLinkItem href="/behavior">
              <GitHubIcon className="mr-2 h-4 w-4 fill-current" />
              <span>Source of this site</span>
            </CommandLinkItem>
          </CommandGroup>
          <SearchGroup />
        </CommandList>
        <CommandSeparator />
        <CommandFooter />
      </CommandDialog>
    </CommandProvider>
  );
}
