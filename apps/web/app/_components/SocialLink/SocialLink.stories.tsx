import type { Meta, StoryObj } from "@storybook/react";

import { SocialLink } from "./SocialLink";

const meta = {
  component: SocialLink,
} satisfies Meta<typeof SocialLink>;

export default meta;

type Story = StoryObj<typeof SocialLink>;

export const Twitter = {
  args: {
    kind: "twitter",
  },
} satisfies Story;

export const GitHub = {
  args: {
    kind: "github",
  },
} satisfies Story;
