import type { PropsWithChildren } from "react";

import { Footer } from "../_components";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
