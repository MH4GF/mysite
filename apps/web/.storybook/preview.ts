import "@project/configs/tailwindcss/global.css";

import type { Preview } from "@storybook/react";
import { decorators } from "./decorators";

const preview: Preview = {
  decorators,
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
