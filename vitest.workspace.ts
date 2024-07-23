import react from "@vitejs/plugin-react";
import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      include: ["**/*.test.ts?(x)"],
      name: "unit",
      environment: "node",
    },
  },
  {
    plugins: [react()],
    test: {
      include: ["**/*.browser-test.ts?(x)"],
      name: "browser",
      browser: {
        enabled: true,
        name: "chromium",
        provider: "playwright",
        providerOptions: {},
      },
    },
  },
]);
