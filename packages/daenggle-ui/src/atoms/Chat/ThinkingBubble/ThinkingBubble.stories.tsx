import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ThinkingBubble } from "./ThinkingBubble";

const meta: Meta<typeof ThinkingBubble> = {
  title: "Chat/ThinkingBubble",
  component: ThinkingBubble,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
