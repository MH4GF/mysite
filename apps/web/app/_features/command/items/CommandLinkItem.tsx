import { CommandItem } from "@/app/_components/ui/command";
import { Link } from "@/app/_features/viewTransition/Link";
import { useViewTransitionRouter } from "@/app/_features/viewTransition/useViewTransitionRouter";
import type { Route } from "next";
import { type ComponentProps, useCallback } from "react";

type Props<T extends string = string> = ComponentProps<typeof CommandItem> & {
  href: Route<T>;
  onOpenChange(open: boolean): void;
};

export function CommandLinkItem<T extends string = string>({
  href,
  children,
  onOpenChange,
  ...props
}: Props<T>) {
  const router = useViewTransitionRouter();
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
