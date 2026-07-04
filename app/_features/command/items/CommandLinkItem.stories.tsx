import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { Command as CommandRoot } from "cmdk";
import { expect, fireEvent, fn, spyOn, userEvent } from "storybook/test";

import { CommandList } from "@/app/_components/ui/command";
import { CommandProvider } from "../CommandProvider";
import { CommandLinkItem } from "./CommandLinkItem";

const onOpenChange = fn();

/**
 * 本物の View Transition はスナップショット取得のためレンダリングを一時停止し、
 * モックルーターでは遷移が完了しないためテストが不安定になる。
 * コールバックのみ即時実行するスタブに差し替える。
 */
const stubViewTransition = () =>
  spyOn(document, "startViewTransition").mockImplementation((updateCallback) => {
    Promise.resolve(updateCallback()).catch(() => undefined);
    const done = Promise.resolve();
    return {
      finished: done,
      ready: done,
      updateCallbackDone: done,
      skipTransition: () => undefined,
      types: new Set<string>(),
    };
  });

const meta = {
  component: CommandLinkItem,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    // CommandItem は cmdk の Command ルート + CommandList 配下でのみ正しく動作するためラップする
    (Story) => (
      <CommandProvider onOpenChange={onOpenChange}>
        <CommandRoot label="Command palette">
          <CommandList>
            <Story />
          </CommandList>
        </CommandRoot>
      </CommandProvider>
    ),
  ],
} satisfies Meta<typeof CommandLinkItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InternalLink: Story = {
  args: {
    href: "/blog",
    children: "Blog",
  },
  // 同一オリジンのリンク: 選択でルーターによるクライアント遷移を行い、パレットを閉じる
  play: async ({ canvas }) => {
    onOpenChange.mockClear();
    const viewTransitionSpy = stubViewTransition();

    const item = canvas.getByRole("option", { name: "Blog" });
    await expect(item).toHaveAttribute("href", "/blog");

    await userEvent.click(item);
    await expect(getRouter().push).toHaveBeenCalledWith("/blog");
    await expect(onOpenChange).toHaveBeenCalledWith(false);

    viewTransitionSpy.mockRestore();
  },
};

export const ExternalLink: Story = {
  args: {
    href: "https://example.com/",
    children: "Example",
  },
  // 外部オリジンのリンク: 選択で新しいタブとして開き、パレットを閉じる
  play: async ({ canvas, canvasElement }) => {
    onOpenChange.mockClear();
    const openSpy = spyOn(window, "open").mockImplementation(() => null);

    const item = canvas.getByRole("option", { name: "Example" });
    await expect(item).toHaveAttribute("href", "https://example.com/");
    await expect(item).toHaveAttribute("target", "_blank");

    // アンカーのクリックは実ページ遷移を伴うため、cmdk のキーボード選択（Enter）で onSelect を発火する
    const root = canvasElement.querySelector("[cmdk-root]");
    await expect(root).not.toBeNull();
    if (root instanceof HTMLElement) {
      await fireEvent.keyDown(root, { key: "Enter" });
    }

    await expect(openSpy).toHaveBeenCalledWith("https://example.com/", "_blank");
    await expect(onOpenChange).toHaveBeenCalledWith(false);

    openSpy.mockRestore();
  },
};
