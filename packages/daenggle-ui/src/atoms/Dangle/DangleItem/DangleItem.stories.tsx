import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DangleItem } from "./DangleItem";

const meta = {
  title: "Dangle/DangleItem",
  component: DangleItem,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
    state: { control: "radio", options: ["before", "after"] },
    imageUrl: { control: "text" },
    text: { control: "text" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DangleItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const After: Story = {
  args: {
    state: "after",
    imageUrl: "https://placehold.co/300x200",
    text: "애월·한림",
  },
};

export const Before: Story = {
  args: {
    state: "before",
    imageUrl: "https://placehold.co/300x200",
    text: "애월·한림",
  },
};
