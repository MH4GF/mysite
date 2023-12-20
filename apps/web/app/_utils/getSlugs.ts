import { promises as fs } from "fs";

interface Params {
  slug: string;
}

const withoutExtension = (path: string) => path.split(".").slice(0, -1).join(".");
const convertToParams = (path: string): Params => ({ slug: path });

export const getSlugs = async (dirPath: string): Promise<Params[]> => {
  const paths = await fs.readdir(dirPath);
  return paths.map(withoutExtension).map(convertToParams);
};
