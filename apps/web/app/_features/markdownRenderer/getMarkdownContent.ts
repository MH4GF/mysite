import { promises as fs } from "fs";

import type { ReactElement } from "react";

import { processor } from "./processor";

export const getMarkdownContent = async (
  filePath: string,
  handleNotFound: () => void,
): Promise<ReactElement> => {
  const file = await fs.readFile(filePath, "utf8").catch(() => {
    handleNotFound();
    return "";
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
  const { result } = await processor.process(file);
  return result as ReactElement;
};
