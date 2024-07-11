import { CommandItem } from "@/app/_components/ui/command";
import { Link } from "@/app/_features/viewTransition/Link";
import { useViewTransitionRouter } from "@/app/_features/viewTransition/useViewTransitionRouter";
import type { Route } from "next";
import { type ComponentProps, useCallback } from "react";
import { useCommandContext } from "../CommandProvider";

type Props<T extends string = string> = ComponentProps<typeof CommandItem> & {
  href: Route<T>;
};

export function CommandLinkItem<T extends string = string>({ href, children, ...props }: Props<T>) {
  const router = useViewTransitionRouter();
  const { onOpenChange } = useCommandContext();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const handleSelect = useCallback(() => {
    router.push(href);
    close();
  }, [router, href, close]);

  return (
    <CommandItem {...props} onSelect={handleSelect}>
      <Link tabIndex={-1} href={href} onClick={close} className="flex">
        {children}
      </Link>
    </CommandItem>
  );
}
