import { CommandItem } from "@/app/_components/ui/command";
import { Link } from "@/app/_features/viewTransition/Link";
import { useViewTransitionRouter } from "@/app/_features/viewTransition/useViewTransitionRouter";
import type { Route } from "next";
import { type ComponentProps, useCallback } from "react";

type Props<T extends string = string> = ComponentProps<typeof CommandItem> & {
  href: Route<T>;
};

export function CommandLinkItem<T extends string = string>({ href, children, ...props }: Props<T>) {
  const router = useViewTransitionRouter();
  const handleSelect = useCallback(() => {
    router.push(href);
  }, [router, href]);

  return (
    <CommandItem {...props} onSelect={handleSelect} className="[cmdk-item]:p-0">
      <Link tabIndex={-1} href={href} className="flex w-full">
        {children}
      </Link>
    </CommandItem>
  );
}
