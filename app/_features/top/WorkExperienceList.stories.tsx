import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";

import { me } from "../../_utils";
import { WorkExperienceList } from "./index";

const meta = {
  component: WorkExperienceList,
} satisfies Meta<typeof WorkExperienceList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { name: "Work Experience" })).toBeVisible();

    for (const { company, period } of me.workExperiences) {
      await expect(canvas.getByText(period)).toBeVisible();

      const link = canvas.getByRole("link", { name: company.name });
      await expect(link).toBeVisible();
      // 会社の URL はすべて外部オリジンのため、外部リンクとして描画される
      await expect(link).toHaveAttribute("href", company.url);
      await expect(link).toHaveAttribute("target", "_blank");
    }
  },
};
