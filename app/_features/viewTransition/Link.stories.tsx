import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { getRouter } from "@storybook/nextjs-vite/navigation.mock";
import { expect, fireEvent, fn } from "storybook/test";

import { Link } from "./Link";

// document.startViewTransition の有無で分岐するため、決定的なスタブに差し替える。
// 実際の View Transition を起動するとスクリーンショットが遷移中の状態に依存してしまう
const immediateViewTransition = ((updateCallback: () => Promise<void> | void) => {
  const updateCallbackDone = Promise.resolve(updateCallback());
  return {
    finished: updateCallbackDone,
    ready: updateCallbackDone,
    updateCallbackDone,
  } as ViewTransition;
}) as Document["startViewTransition"];

const overrideStartViewTransition = (value: Document["startViewTransition"] | undefined) => {
  Object.defineProperty(document, "startViewTransition", { configurable: true, value });
  return () => {
    Reflect.deleteProperty(document, "startViewTransition");
  };
};

const meta = {
  component: Link,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  args: {
    href: "/blog",
    children: "Blogへ移動",
  },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const restore = overrideStartViewTransition(immediateViewTransition);
    const { push } = getRouter();
    push.mockClear();

    const link = canvas.getByRole("link", { name: "Blogへ移動" });
    await expect(link).toHaveAttribute("href", "/blog");
    await userEvent.click(link);

    await expect(push).toHaveBeenCalledWith("/blog");
    restore();
  },
};

export const WithOnClick: Story = {
  args: {
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    // startViewTransition 非対応環境の分岐（そのままコールバックを実行する）を通す
    const restore = overrideStartViewTransition(undefined);
    const { push } = getRouter();
    push.mockClear();

    await userEvent.click(canvas.getByRole("link", { name: "Blogへ移動" }));

    await expect(push).toHaveBeenCalledWith("/blog");
    await expect(args.onClick).toHaveBeenCalled();
    restore();
  },
};

export const SamePage: Story = {
  args: {
    href: "#section",
    children: "同一ページ内リンク",
  },
  play: async ({ canvas, userEvent }) => {
    const link = canvas.getByRole("link", { name: "同一ページ内リンク" });
    await expect(link).toHaveAttribute("href", "#section");
    await userEvent.click(link);
    await expect(link).toBeVisible();
  },
};

export const SamePageWithOnClick: Story = {
  args: {
    href: "#section",
    children: "同一ページ内リンク",
    onClick: fn(),
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("link", { name: "同一ページ内リンク" }));
    await expect(args.onClick).toHaveBeenCalled();
  },
};

export const ModifierClick: Story = {
  play: async ({ canvas }) => {
    const restore = overrideStartViewTransition(immediateViewTransition);
    const { push } = getRouter();
    push.mockClear();

    const link = canvas.getByRole("link", { name: "Blogへ移動" });
    // 修飾キー付きクリックはブラウザ標準の挙動（新規タブ等）に委ねるため、
    // テストでは実ナビゲーションを防ぎつつ合成イベントで分岐のみ検証する
    const preventNavigation = (event: Event) => {
      event.preventDefault();
    };
    link.addEventListener("click", preventNavigation);

    await fireEvent.click(link, { ctrlKey: true });
    await fireEvent.click(link, { metaKey: true });

    await expect(push).not.toHaveBeenCalled();
    link.removeEventListener("click", preventNavigation);
    restore();
  },
};
