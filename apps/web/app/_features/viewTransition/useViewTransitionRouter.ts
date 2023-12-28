"use client";

import type { Route } from "next";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter as useNextRouter } from "next/navigation";

const safeStartViewTransition = (callback: () => void) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!document.startViewTransition) {
    callback();
    return;
  }
  document.startViewTransition(callback);
};

export const useViewTransitionRouter = (): ReturnType<typeof useNextRouter> => {
  const router = useNextRouter();
  return {
    ...router,
    push: (href: Route, options?: NavigateOptions) => {
      safeStartViewTransition(() => router.push(href, options));
    },
  };
};
