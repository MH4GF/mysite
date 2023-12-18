import { createTheme } from "@kuma-ui/core";

const textVariants = {
  xs: {
    fontSize: "0.75rem",
    lineHeight: "1rem",
  },
  sm: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
  },
  base: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  xl: {
    fontSize: "1.25rem",
    lineHeight: "1.75rem",
  },
};

const theme = createTheme({
  colors: {
    zinc: {
      500: "#71717a",
      800: "#27272a",
    },
    slate: {
      400: "#94a3b8",
    },
  },
  components: {
    Text: {
      variants: textVariants,
    },
    Heading: {
      variants: textVariants,
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

type UserTheme = typeof theme;

declare module "@kuma-ui/core" {
  // biome-ignore lint/suspicious/noEmptyInterface: @kuma-ui/core で定義されている型を拡張するため
  export interface Theme extends UserTheme {}
}

export default theme;
