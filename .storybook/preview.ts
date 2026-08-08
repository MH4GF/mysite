import type { Preview } from "@storybook/nextjs-vite";

import "../app/globals.css";

const preview: Preview = {
  parameters: {
    // 多くのコンポーネントが next/navigation (usePathname, useRouter 等) を利用するため、
    // App Router のモックをグローバルに有効化する。個別ストーリーでの重複指定を避ける
    nextjs: { appDirectory: true },
  },
};

export default preview;
