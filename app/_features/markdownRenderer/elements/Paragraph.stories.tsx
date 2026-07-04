import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { Paragraph } from "./Paragraph";

const meta = {
  component: Paragraph,
} satisfies Meta<typeof Paragraph>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "これは通常の段落テキストです。",
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("これは通常の段落テキストです。")).toBeVisible();
    await expect(canvasElement.querySelectorAll("p")).toHaveLength(1);
  },
};

export const WithInlineLink: Story = {
  args: {
    children: [
      "詳細は ",
      <a key="link" href="https://example.com">
        こちらのリンク
      </a>,
      " を参照してください。",
    ],
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("link", { name: "こちらのリンク" })).toBeVisible();
    // 複数の子を持つためリンクカードには変換されず、通常の段落として描画される
    await expect(canvasElement.querySelectorAll("p")).toHaveLength(1);
  },
};

// 単体URLの段落でも renderRichLinkCard が注入されていなければ通常の段落として描画される
export const BareUrlWithoutRenderer: Story = {
  args: {
    children: <a href="https://mh4gf.dev">https://mh4gf.dev</a>,
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByRole("link", { name: "https://mh4gf.dev" })).toBeVisible();
    await expect(canvasElement.querySelectorAll("p")).toHaveLength(1);
  },
};

// 単体URLの段落は注入された renderRichLinkCard によりリンクカードへ変換される。
// リンクカードの実体（RichLinkCard）は async RSC のため、ここでは決定的なプレースホルダを注入する
// （実体の描画は app/_features/richLinkCard のユニットテストで担保）
export const BareUrlWithLinkCard: Story = {
  args: {
    children: <a href="https://mh4gf.dev">https://mh4gf.dev</a>,
    renderRichLinkCard: (url: string) => (
      <span className="block rounded-xs border p-4 text-sm">リンクカード: {url}</span>
    ),
  },
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("リンクカード: https://mh4gf.dev")).toBeVisible();
    // 通常の段落としては描画されない
    await expect(canvasElement.querySelectorAll("p")).toHaveLength(0);
    await expect(canvasElement.querySelector(".not-prose")).not.toBeNull();
  },
};
