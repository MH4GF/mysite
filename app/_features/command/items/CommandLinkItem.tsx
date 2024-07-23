import { CommandItem } from "@/app/_components/ui/command";
import { UniversalLink } from "@/app/_features/viewTransition";
import { type ComponentProps, useCallback } from "react";
import { useCommandContext } from "../CommandProvider";

type Props = ComponentProps<typeof CommandItem> & {
  href: string;
};

export function CommandLinkItem({ href, children, ...props }: Props) {
  const { onOpenChange } = useCommandContext();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // TODO: キーボード操作時の処理を実装
  // const handleSelect = useCallback(() => {
  //   router.push(href);
  //   close();
  // }, [router, href, close]);

  return (
    <CommandItem {...props} asChild>
      <UniversalLink href={href} onClick={close}>
        {children}
      </UniversalLink>
    </CommandItem>
  );
}
