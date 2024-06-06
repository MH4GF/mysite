import type { ComponentProps, PropsWithChildren } from "react";

type Props = ComponentProps<"time">;

export const Time = ({ children, className, ...props }: PropsWithChildren<Props>) => {
  return (
    <time className={`${className} text-sm text-zinc-500 dark:text-zinc-400`} {...props}>
      {children}
    </time>
  );
};
