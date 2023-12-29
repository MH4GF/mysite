import type { PropsWithChildren } from "react";

import { Footer } from "../_components";

export default function ArticlesLayout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
