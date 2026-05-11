import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Fab } from "./Fab";

const meta = {
  title: "Map/Fab",
  component: Fab,
  parameters: {
    layout: "centered",
  },
  args: {
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Fab>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
