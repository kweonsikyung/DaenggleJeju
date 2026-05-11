import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DangleCard } from "./DangleCard";

const meta = {
  title: "Dangle/DangleCard",
  component: DangleCard,
  parameters: {
    layout: "centered",
  },
  args: {
    imageUrl: "/assets/dangle/banner.jpg",
    views: 2129,
    title: "강아지가 좋아하는\n제주 서쪽 여행 코스",
    hashtag: "#동반입수바다",
    onClick: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DangleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
