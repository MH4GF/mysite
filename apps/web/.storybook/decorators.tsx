import { Decorator } from "@storybook/react";
import { inter } from "../app/_styles";

const fontDecorator: Decorator = (Story) => (
  <div className={inter.className}>
    <Story />
  </div>
);

export const decorators: Decorator[] = [fontDecorator];
