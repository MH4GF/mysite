import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  framework: "@storybook/nextjs-vite",
  stories: ["../app/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-vitest"],
};

export default config;
