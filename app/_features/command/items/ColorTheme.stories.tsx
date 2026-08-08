import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Command as CommandRoot } from "cmdk";
import { expect, userEvent, waitFor } from "storybook/test";

import { CommandList } from "@/app/_components/ui/command";
import { ColorTheme } from "./ColorTheme";

const isDarkMode = () => document.documentElement.classList.contains("dark");

const labelFor = (dark: boolean) => (dark ? "Change to Light Mode" : "Change to Dark Mode");

/** toggleMode が一時付与する transition 無効化クラスが外れるまで待つ */
const waitForTransitionsRestored = async () => {
  await waitFor(() =>
    expect(document.documentElement.classList.contains("**:transition-none!")).toBe(false),
  );
};

const meta = {
  component: ColorTheme,
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
} satisfies Meta<typeof ColorTheme>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  // 現在のテーマ（VRT ではライト / ダーク両方で撮影される）に応じた切替先ラベルを表示する
  play: async ({ canvas }) => {
    await expect(canvas.getByText(labelFor(isDarkMode()))).toBeVisible();
  },
};

export const Toggled: Story = {
  // 選択でモードが反転しラベルが切り替わる。2 回目の選択で元のモードに戻る
  // （1 回目と 2 回目で localStorage の保存 / システム設定へのリセットの両分岐を通る）
  play: async ({ canvas }) => {
    const initialDark = isDarkMode();
    const item = canvas.getByRole("option");

    await userEvent.click(item);
    await waitFor(() => expect(isDarkMode()).toBe(!initialDark));
    await expect(canvas.getByText(labelFor(!initialDark))).toBeVisible();
    await waitForTransitionsRestored();

    await userEvent.click(item);
    await waitFor(() => expect(isDarkMode()).toBe(initialDark));
    await expect(canvas.getByText(labelFor(initialDark))).toBeVisible();
    await waitForTransitionsRestored();

    // 2 回のトグルで localStorage は元の状態に戻るが、環境差を残さないため明示的に消す
    window.localStorage.removeItem("isDarkMode");
  },
};

export const InitiallyDark: Story = {
  // マウント時点で dark クラスが付与されている場合、切替先として Light を表示する
  loaders: [
    () => {
      document.documentElement.classList.add("dark");
    },
  ],
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Change to Light Mode")).toBeVisible();
  },
};
