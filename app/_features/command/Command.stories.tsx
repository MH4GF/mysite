import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, screen, userEvent, waitFor, within } from "storybook/test";

import { Command } from "./Command";

/** ダイアログ内の検索（pagefind）が完了し、ローディングスケルトンが消えるまで待つ */
const waitForSearchSettled = async (dialog: HTMLElement) => {
  await waitFor(() => expect(within(dialog).queryAllByRole("progressbar")).toHaveLength(0), {
    timeout: 5000,
  });
};

const meta = {
  component: Command,
  decorators: [
    // トリガーボタンは fixed 配置、ダイアログはポータルで body 直下に描画されるため、
    // canvasElement 自体が高さ 0 にならないようコンテナで最低限のサイズを確保する
    (Story) => (
      <div style={{ minHeight: "160px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Command>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OpenedWithTriggerOnTopPage: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: "/" },
    },
  },
  // トップページ: トリガーで開くと各コマンドが表示されるが、About me へのリンクは表示されない。
  // Escape で閉じる
  play: async ({ canvas }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Open command palette" }));

    const dialog = await screen.findByRole("dialog");
    const inDialog = within(dialog);
    // 開いた直後はフェードインアニメーション中で opacity 0 のため、可視になるまで待つ
    await waitFor(() =>
      expect(inDialog.getByPlaceholderText("Type a command or search...")).toBeVisible(),
    );
    await expect(inDialog.getByText("Suggestions")).toBeVisible();
    await expect(inDialog.getByText(/Change to (Dark|Light) Mode/)).toBeVisible();
    await expect(inDialog.getByText("Share to X")).toBeVisible();
    await expect(inDialog.getByText("Blog")).toBeVisible();
    await expect(inDialog.getByText("好む振る舞い")).toBeVisible();
    await expect(inDialog.getByText("Source of this site - MH4GF/mysite")).toBeVisible();
    await expect(inDialog.queryByText("About me")).not.toBeInTheDocument();
    await waitForSearchSettled(dialog);

    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  },
};

export const OpenedWithKeyboardOnBlogPage: Story = {
  parameters: {
    nextjs: {
      navigation: { pathname: "/blog" },
    },
  },
  // ブログページ: 修飾キーなしの k や他のキーでは開かず、⌘K で開くと About me へのリンクを
  // 表示する。Ctrl+K でトグルして閉じる
  play: async () => {
    await userEvent.keyboard("k");
    await userEvent.keyboard("j");
    await expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await userEvent.keyboard("{Meta>}k{/Meta}");
    const dialog = await screen.findByRole("dialog");
    // 開いた直後はフェードインアニメーション中で opacity 0 のため、可視になるまで待つ
    await waitFor(() => expect(within(dialog).getByText("About me")).toBeVisible());
    await waitForSearchSettled(dialog);

    await userEvent.keyboard("{Control>}k{/Control}");
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  },
};
