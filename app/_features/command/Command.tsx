"use client";

import { PenLine, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GitHubIcon } from "@/app/_components";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
} from "@/app/_components/ui/command";
import { CommandFooter } from "./CommandFooter";
import { CommandProvider } from "./CommandProvider";
import { CommandTrigger } from "./CommandTrigger";
import { ColorTheme, CommandLinkItem, SearchGroup } from "./items";
import { ShareToX } from "./items/ShareToX";

export function Command() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

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
            <ShareToX />
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Contents">
            {pathname !== "/" && (
              <CommandLinkItem href="/">
                <UserRound className="mr-2 h-4 w-4" />
                <span>About me</span>
              </CommandLinkItem>
            )}
            <CommandLinkItem href="/contents">
              <PenLine className="mr-2 h-4 w-4" />
              <span>All Contents</span>
            </CommandLinkItem>
            <CommandLinkItem href="/behavior">
              <PenLine className="mr-2 h-4 w-4" />
              <span>好む振る舞い</span>
            </CommandLinkItem>
            <CommandLinkItem href="https://github.com/MH4GF/mysite">
              <GitHubIcon className="mr-2 h-4 w-4 fill-current" />
              <span>Source of this site - MH4GF/mysite</span>
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
