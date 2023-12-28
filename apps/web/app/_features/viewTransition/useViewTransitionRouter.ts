"use client";

import type { Route } from "next";
import type { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter as useNextRouter } from "next/navigation";

export const useViewTransitionRouter = (): ReturnType<typeof useNextRouter> => {
  const router = useNextRouter();
  return {
    ...router,
    push: (href: Route, options?: NavigateOptions) => {
      document.startViewTransition(() => {
        router.push(href, options);
      });
    },
  };
};
