"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const safeStartViewTransition = (callback: () => Promise<void> | void) => {
  if (!document.startViewTransition) {
    // biome-ignore lint/complexity/noVoid: Required to handle async callback properly
    return void callback();
  }
  document.startViewTransition(callback);
};

export const useViewTransitionRouter = (): ReturnType<typeof useRouter> => {
  const router = useRouter();
  const pathname = usePathname();

  const promiseCallbacks = useRef<Record<"resolve" | "reject", () => void> | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Only re-run on pathname changes for cleanup
  useLayoutEffect(() => {
    return () => {
      if (promiseCallbacks.current) {
        promiseCallbacks.current.resolve();
        promiseCallbacks.current = null;
      }
    };
  }, [pathname]);

  return {
    ...router,
    push: (href: string) => {
      safeStartViewTransition(
        () =>
          new Promise((resolve, reject) => {
            promiseCallbacks.current = { resolve, reject };
            router.push(href);
          }),
      );
    },
  };
};
