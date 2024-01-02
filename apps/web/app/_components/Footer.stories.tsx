import type { Meta, StoryObj } from "@storybook/react";

// import { Footer } from "./Footer";

const Footer = () => {
  return <div>hello</div>;
};

const meta: Meta<typeof Footer> = {
  component: Footer,
};
export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
