import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DangleVideo } from "./DangleVideo";

const meta = {
  title: "Dangle/DangleVideo",
  component: DangleVideo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    thumbnailUrl: "https://placehold.co/300x200",
    title: "발바닥에 닿는 파도, 제주에서 가장 순한 해변은 여기",
    views: 1274,
    comments: 131,
    timeAgo: "1개월 전",
    onClick: fn(),
  },
} satisfies Meta<typeof DangleVideo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
