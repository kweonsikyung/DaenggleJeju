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
    imageUrl: "/assets/dangle/beach.png",
    text: "애월·한림",
  },
};

export const Before: Story = {
  args: {
    state: "before",
    imageUrl: "/assets/dangle/beach.png",
    text: "애월·한림",
  },
};
