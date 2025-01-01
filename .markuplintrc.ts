const config = {
  specs: {
    "\\.tsx?$": "@markuplint/react-spec",
  },
  parser: {
    "\\.tsx?$": "@markuplint/jsx-parser",
  },
  extends: ["markuplint:recommended"],
  rules: {
    "invalid-attr": {
      options: {
        allowAttrs: ["tw"],
      },
    },
  },
};

export default config;
