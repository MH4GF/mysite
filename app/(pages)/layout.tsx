import type { PropsWithChildren } from "react";
import { Footer } from "../_components";
import { Header } from "../_features";

export default function PagesLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <Header />
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4">{children}</div>
      <Footer className="mt-8" />
    </main>
  );
}
