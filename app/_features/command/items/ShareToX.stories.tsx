import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Command as CommandRoot } from "cmdk";
import { expect } from "storybook/test";

import { CommandList } from "@/app/_components/ui/command";
import { ShareToX } from "./ShareToX";

const meta = {
  component: ShareToX,
  decorators: [
    // CommandItem は cmdk の Command ルート + CommandList 配下でのみ正しく動作するためラップする
    (Story) => (
      <CommandRoot label="Command palette">
        <CommandList>
          <Story />
        </CommandList>
      </CommandRoot>
    ),
  ],
} satisfies Meta<typeof ShareToX>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    // アクセシブルネームには XIcon の svg title（"X"）も含まれるため部分一致で取得する
    const item = canvas.getByRole("option", { name: /Share to X/ });
    await expect(item).toBeVisible();

    const shareUrl = new URL(item.getAttribute("href") ?? "");
    await expect(`${shareUrl.origin}${shareUrl.pathname}`).toBe("https://twitter.com/share");
    await expect(shareUrl.searchParams.get("url")).toBe(window.location.href);
    await expect(shareUrl.searchParams.get("text")).toBe(document.title);
  },
};
