"use client";

import type { Route } from "next";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

const safeStartViewTransition = (callback: () => Promise<void> | void) => {
  if (!document.startViewTransition) {
    return void callback();
  }
  document.startViewTransition(callback);
};

export const useViewTransitionRouter = (): ReturnType<typeof useRouter> => {
  const router = useRouter();
  const pathname = usePathname();

  const promiseCallbacks = useRef<Record<"resolve" | "reject", () => void> | null>(null);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathnameの変更時に意図的に実行する
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
    push: (href: Route) => {
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
