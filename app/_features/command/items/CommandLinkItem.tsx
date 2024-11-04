import { CommandItem } from "@/app/_components/ui/command";
import { UniversalLink, isSameOrigin } from "@/app/_features/viewTransition";
import { useCallback, useRef } from "react";
import type { ComponentProps } from "react";
import { useViewTransitionRouter } from "../../viewTransition/useViewTransitionRouter";
import { useCommandContext } from "../CommandProvider";

type Props = ComponentProps<typeof CommandItem> & {
  href: string;
};

export function CommandLinkItem({ href, children, ...props }: Props) {
  const { onOpenChange } = useCommandContext();
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);
  const linkRef = useRef<HTMLAnchorElement>(null);
  const router = useViewTransitionRouter();

  const handleKeydown = useCallback(() => {
    if (isSameOrigin(href)) {
      router.push(href);
    } else {
      window.open(href, "_blank");
    }
    close();
  }, [router, href, close]);

  return (
    <CommandItem {...props} onSelect={handleKeydown} asChild>
      <UniversalLink ref={linkRef} href={href} onClick={close}>
        {children}
      </UniversalLink>
    </CommandItem>
  );
}
