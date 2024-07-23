import { CommandItem } from "@/app/_components/ui/command";
import { UniversalLink } from "@/app/_features/viewTransition";
import { useViewTransitionRouter } from "@/app/_features/viewTransition/useViewTransitionRouter";
import { type ComponentProps, useCallback } from "react";
import { useCommandContext } from "../CommandProvider";

type Props = ComponentProps<typeof CommandItem> & {
  href: string;
};

export function CommandLinkItem({ href, children, ...props }: Props) {
  const router = useViewTransitionRouter();
  const { onOpenChange } = useCommandContext();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const handleSelect = useCallback(() => {
    router.push(href);
    close();
  }, [router, href, close]);

  return (
    <CommandItem {...props} onSelect={handleSelect}>
      <UniversalLink tabIndex={-1} href={href} onClick={close} className="flex w-full">
        {children}
      </UniversalLink>
    </CommandItem>
  );
}
