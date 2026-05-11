import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ChipKeyword } from "./ChipKeyword";

const meta = {
  title: "Chip/ChipKeyword",
  component: ChipKeyword,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    selected: { control: "boolean" },
    onClose: { action: "close" },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChipKeyword>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "숙박",
    selected: false,
    onClose: undefined,
  },
};

export const WithCloseButton: Story = {
  args: {
    text: "숙박",
    selected: true,
    onClose: fn(),
  },
};
