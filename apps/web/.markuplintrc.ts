import type { Config } from "@markuplint/ml-config";

const config: Config = {
  specs: {
    "\\.tsx?$": "@markuplint/react-spec",
  },
  parser: {
    "\\.tsx?$": "@markuplint/jsx-parser",
  },
  extends: ["markuplint:recommended"],
};

export default config;
