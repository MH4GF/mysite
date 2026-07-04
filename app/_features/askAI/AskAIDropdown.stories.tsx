import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { delay, HttpResponse, http } from "msw";
import { setupWorker } from "msw/browser";
import { renderToString } from "react-dom/server";
import { expect, fn, screen, waitFor } from "storybook/test";

import { AskAIDropdown } from "./index";

const MARKDOWN_URL = "/stories/ask-ai/article.md";
const SLOW_MARKDOWN_URL = "/stories/ask-ai/slow.md";
const NOT_FOUND_MARKDOWN_URL = "/stories/ask-ai/not-found.md";
const NETWORK_ERROR_MARKDOWN_URL = "/stories/ask-ai/network-error.md";
const MARKDOWN_CONTENT = "# 見出し\n\nテスト記事の本文";

// 外部依存（markdown エンドポイントへの HTTP）は MSW でモックし、ストーリーを決定的にする
let markdownFetchCount = 0;
const worker = setupWorker(
  http.get(MARKDOWN_URL, () => {
    markdownFetchCount += 1;
    return HttpResponse.text(MARKDOWN_CONTENT);
  }),
  http.get(SLOW_MARKDOWN_URL, async () => {
    // ローディング状態を決定的に保つため、レスポンスを永久に遅延させる
    await delay("infinite");
    return HttpResponse.text(MARKDOWN_CONTENT);
  }),
  http.get(NOT_FOUND_MARKDOWN_URL, () => new HttpResponse(null, { status: 404 })),
  http.get(NETWORK_ERROR_MARKDOWN_URL, () => HttpResponse.error()),
);

// navigator.clipboard は権限依存で不安定なためモックする
const mockClipboard = (writeText: () => Promise<void>) => {
  const writeTextMock = fn(writeText);
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText: writeTextMock },
  });
  const restore = () => {
    Reflect.deleteProperty(navigator, "clipboard");
  };
  return { writeTextMock, restore };
};

const openDropdown = async (canvas: { getByRole: typeof screen.getByRole }) => {
  canvas.getByRole("button", { name: "Ask AI" }).click();
  // Radix Popover はポータルで canvasElement 外に描画されるため screen から取得する。
  // また、Popover content は位置計算が終わるまで一瞬 hidden のため waitFor で可視化を待つ
  await waitFor(() =>
    expect(screen.getByRole("button", { name: "Markdownをコピー" })).toBeVisible(),
  );
};

const waitForIdleCopyState = async () => {
  await waitFor(
    () => expect(screen.getByRole("button", { name: "Markdownをコピー" })).toBeVisible(),
    // コピー結果の表示は 2000ms 後に idle へ戻るため、それより長く待つ
    { timeout: 4000 },
  );
};

const meta = {
  component: AskAIDropdown,
  args: {
    markdownUrl: MARKDOWN_URL,
  },
  beforeEach: async () => {
    await worker.start({ quiet: true, onUnhandledRequest: "bypass" });
    return () => {
      worker.stop();
    };
  },
} satisfies Meta<typeof AskAIDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Ask AI" })).toBeVisible();
    await expect(
      screen.queryByRole("button", { name: "Markdownをコピー" }),
    ).not.toBeInTheDocument();
  },
};

export const Opened: Story = {
  play: async ({ canvas }) => {
    await openDropdown(canvas);

    const openMarkdownLink = screen.getByRole("link", { name: "Markdownを開く" });
    await waitFor(() => expect(openMarkdownLink).toBeVisible());
    await expect(openMarkdownLink).toHaveAttribute(
      "href",
      new URL(MARKDOWN_URL, window.location.origin).toString(),
    );

    // AI リンクのアクセシブルネームにはアイコン SVG のラベルも含まれるため部分一致で取得する
    const aiLinks = [
      { name: /ChatGPTで開く/, href: /^https:\/\/chatgpt\.com\/\?hints=search&q=/ },
      { name: /Claudeで開く/, href: /^https:\/\/claude\.ai\/new\?q=/ },
      { name: /Scira AIで開く/, href: /^https:\/\/scira\.ai\/\?q=/ },
      { name: /T3 Chatで開く/, href: /^https:\/\/t3\.chat\/new\?q=/ },
    ];
    for (const { name, href } of aiLinks) {
      const link = screen.getByRole("link", { name });
      await waitFor(() => expect(link).toBeVisible());
      await expect(link).toHaveAttribute("href", expect.stringMatching(href));
      await expect(link).toHaveAttribute("target", "_blank");
    }
  },
};

export const CopyMarkdown: Story = {
  play: async ({ canvas }) => {
    const { writeTextMock, restore } = mockClipboard(() => Promise.resolve());
    const fetchCountBefore = markdownFetchCount;
    await openDropdown(canvas);

    // 1 回目: fetch して clipboard に書き込み、copied → idle と遷移する
    screen.getByRole("button", { name: "Markdownをコピー" }).click();
    await waitFor(() => expect(screen.getByText("コピーしました")).toBeVisible());
    await expect(writeTextMock).toHaveBeenCalledWith(MARKDOWN_CONTENT);
    await waitForIdleCopyState();
    await expect(markdownFetchCount).toBe(fetchCountBefore + 1);

    // 2 回目: キャッシュから即座にコピーされ、再 fetch しない
    screen.getByRole("button", { name: "Markdownをコピー" }).click();
    await waitFor(() => expect(screen.getByText("コピーしました")).toBeVisible());
    await expect(writeTextMock).toHaveBeenCalledTimes(2);
    await expect(markdownFetchCount).toBe(fetchCountBefore + 1);
    await waitForIdleCopyState();
    restore();
  },
};

export const CopyLoading: Story = {
  args: {
    markdownUrl: SLOW_MARKDOWN_URL,
  },
  play: async ({ canvas }) => {
    const { restore } = mockClipboard(() => Promise.resolve());
    await openDropdown(canvas);

    screen.getByRole("button", { name: "Markdownをコピー" }).click();
    await waitFor(() => expect(screen.getByRole("button", { name: "コピー中..." })).toBeVisible());
    await expect(screen.getByRole("button", { name: "コピー中..." })).toBeDisabled();
    restore();
  },
};

export const CopyHttpError: Story = {
  args: {
    markdownUrl: NOT_FOUND_MARKDOWN_URL,
  },
  play: async ({ canvas }) => {
    await openDropdown(canvas);

    screen.getByRole("button", { name: "Markdownをコピー" }).click();
    await waitFor(() => expect(screen.getByText("コピーに失敗しました")).toBeVisible());
    await waitForIdleCopyState();
  },
};

export const CopyNetworkError: Story = {
  args: {
    markdownUrl: NETWORK_ERROR_MARKDOWN_URL,
  },
  play: async ({ canvas }) => {
    await openDropdown(canvas);

    screen.getByRole("button", { name: "Markdownをコピー" }).click();
    await waitFor(() => expect(screen.getByText("コピーに失敗しました")).toBeVisible());
    await waitForIdleCopyState();
  },
};

export const CachedCopyClipboardRejection: Story = {
  play: async ({ canvas }) => {
    // 1 回目のコピーでキャッシュを作る
    const { writeTextMock, restore } = mockClipboard(() => Promise.resolve());
    await openDropdown(canvas);
    screen.getByRole("button", { name: "Markdownをコピー" }).click();
    await waitFor(() => expect(screen.getByText("コピーしました")).toBeVisible());
    await waitForIdleCopyState();
    restore();

    // 2 回目はキャッシュ経路で clipboard が reject し、ボタンの onClick 側の catch で握り潰される
    const rejecting = mockClipboard(() => Promise.reject(new Error("clipboard denied")));
    screen.getByRole("button", { name: "Markdownをコピー" }).click();
    await waitFor(() => expect(rejecting.writeTextMock).toHaveBeenCalledWith(MARKDOWN_CONTENT));
    await expect(writeTextMock).toHaveBeenCalledTimes(1);
    await expect(screen.getByRole("button", { name: "Markdownをコピー" })).toBeVisible();
    rejecting.restore();
  },
};

export const ServerRendered: Story = {
  play: async () => {
    // useSyncExternalStore の getServerSnapshot（SSR 時は相対 URL のまま返す）を通す
    const html = renderToString(<AskAIDropdown markdownUrl={MARKDOWN_URL} />);
    await expect(html).toContain("Ask AI");
  },
};
