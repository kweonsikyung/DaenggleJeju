import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { ChipMapList } from "./ChipMapList";

const meta = {
  title: "Map/ChipMapList",
  component: ChipMapList,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onLocationListClick: fn(),
    text: "장소 목록",
    cnt: 7,
  },
} satisfies Meta<typeof ChipMapList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
