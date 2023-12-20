import { promises as fs } from "fs";

import { processor } from "./processor";

export const getMarkdownContent = async (
  filePath: string,
  handleNotFound: () => void,
): Promise<React.ReactElement> => {
  const file = await fs.readFile(filePath, "utf8").catch(() => {
    handleNotFound();
    return "";
  });

  const { result } = await processor.process(file);
  return result;
};
