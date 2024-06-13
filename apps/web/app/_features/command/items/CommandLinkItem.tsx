import { CommandItem } from "@/app/_components/ui/command";
import { Link } from "@/app/_features/viewTransition/Link";
import type { Route } from "next";
import type { ComponentProps } from "react";

type Props<T extends string = string> = ComponentProps<typeof CommandItem> & {
  href: Route<T>;
};

export function CommandLinkItem<T extends string = string>({ href, ...props }: Props<T>) {
  return (
    <Link href={href}>
      <CommandItem {...props} />
    </Link>
  );
}
