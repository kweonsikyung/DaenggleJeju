import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DanglePlay } from "./DanglePlay";

const meta = {
  title: "Dangle/DanglePlay",
  component: DanglePlay,
  parameters: {
    layout: "centered",
  },
  args: {
    profileImageUrl: "/assets/curation/avatar.svg",
    name: "만두두두",
    onClick: fn(),
  },
  tags: ["autodocs"],
  argTypes: {
    type: { control: "radio", options: ["small", "medium"] },
    width: { control: "text" },
  },
} satisfies Meta<typeof DanglePlay>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    type: "small",
    width: "150px",
    imageUrl: "/assets/dangle/dog.png",
  },
};

export const Medium: Story = {
  args: {
    type: "medium",
    width: "162px",
    imageUrl: "/assets/dangle/dog.png",
    location: "협재해수욕장",
    address: "제주시 한림읍",
    title: "발바닥에 닿는 파도, 제주에서\n가장 순한 바다는 여기",
    views: 1274,
    comments: 131,
    timeAgo: "1개월 전",
    tags: ["모든크기", "야외", "목줄착용"],
  },
};

export const FullWidth: Story = {
  args: {
    type: "medium",
    width: "100%",
    imageUrl: "/assets/dangle/dog.png",
    location: "협재해수욕장",
    address: "제주시 한림읍",
    title: "발바닥에 닿는 파도, 제주에서\n가장 순한 바다는 여기",
    views: 1274,
    comments: 131,
    timeAgo: "1개월 전",
    tags: ["모든크기", "야외", "목줄착용"],
  },
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375, padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};
