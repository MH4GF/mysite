import type { Preview } from "@storybook/nextjs-vite";
import { mswLoader } from "msw-storybook-addon/csf3";

import "../app/globals.css";

const preview: Preview = {
  // 外部 API を叩くコンポーネント (react-tweet 等) のストーリーを決定的にするため MSW を有効化する。
  // ハンドラは各ストーリーの parameters.msw で宣言し、宣言しないストーリーは
  // 素通しになるので既存ストーリーの挙動は変わらない。
  // addonMsw() 形式は Preview 型が addons を受け付けないため CSF3 loader を使う
  loaders: [mswLoader()],
  parameters: {
    // 多くのコンポーネントが next/navigation (usePathname, useRouter 等) を利用するため、
    // App Router のモックをグローバルに有効化する。個別ストーリーでの重複指定を避ける
    nextjs: { appDirectory: true },
  },
};

export default preview;
