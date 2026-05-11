import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";
import { ButtonSize, ButtonStatus } from "@/constants/ButtonVariant";

const meta = {
  title: "Button/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["large", "medium"],
      mapping: {
        large: ButtonSize.LARGE,
        medium: ButtonSize.MEDIUM,
      },
    },
    status: {
      control: "inline-radio",
      options: ["default", "active", "disabled", "selected"],
      mapping: {
        default: ButtonStatus.DEFAULT,
        active: ButtonStatus.ACTIVE,
        disabled: ButtonStatus.DISABLED,
        selected: ButtonStatus.SELECTED,
      },
    },
    onClick: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { size: ButtonSize.LARGE, status: ButtonStatus.DEFAULT, text: "다음" },
};
export const Active: Story = {
  args: { size: ButtonSize.LARGE, status: ButtonStatus.ACTIVE, text: "다음" },
};
export const Disabled: Story = {
  args: {
    size: ButtonSize.LARGE,
    status: ButtonStatus.DISABLED,
    text: "다음",
    disabled: true,
  },
};
export const Selected: Story = {
  args: { size: ButtonSize.LARGE, status: ButtonStatus.SELECTED, text: "다음" },
};
export const MediumDefault: Story = {
  args: { size: ButtonSize.MEDIUM, status: ButtonStatus.DEFAULT, text: "다음" },
};
export const MediumActive: Story = {
  args: { size: ButtonSize.MEDIUM, status: ButtonStatus.ACTIVE, text: "다음" },
};
export const MediumDisabled: Story = {
  args: {
    size: ButtonSize.MEDIUM,
    status: ButtonStatus.DISABLED,
    text: "다음",
    disabled: true,
  },
};
export const MediumSelected: Story = {
  args: {
    size: ButtonSize.MEDIUM,
    status: ButtonStatus.SELECTED,
    text: "다음",
  },
};
