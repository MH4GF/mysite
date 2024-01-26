import { notFound } from "next/navigation";

import { MarkdownContent } from "@/app/_features";
import { rootJoin } from "@/app/_utils";

export default function Page() {
  const filePath = rootJoin("app/dev/testing-markdown-renderer/sample.md");

  return (
    <main>
      <h1 className="font-bold text-3xl sm:text-5xl">Testing Markdown Renderer</h1>
      <MarkdownContent filePath={filePath} handleNotFound={notFound} />
    </main>
  );
}
