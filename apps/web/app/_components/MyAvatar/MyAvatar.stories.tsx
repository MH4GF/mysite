import type { Meta, StoryObj } from "@storybook/react";

import { MyAvatar } from "./MyAvatar";

const meta = {
  component: MyAvatar,
} satisfies Meta<typeof MyAvatar>;

export default meta;

type Story = StoryObj<typeof MyAvatar>;

export const Default: Story = {};
