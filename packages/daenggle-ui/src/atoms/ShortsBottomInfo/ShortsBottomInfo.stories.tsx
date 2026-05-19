import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ShortsBottomInfo } from "./ShortsBottomInfo";

const meta = {
  title: "Shorts/ShortsBottomInfo",
  component: ShortsBottomInfo,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "500px",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "white",
          display: "flex",
          alignItems: "flex-end",
          position: "relative",
        }}
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    video: {
      control: "object",
      description: "영상 정보를 담고 있는 객체 데이터",
    },
  },
} satisfies Meta<typeof ShortsBottomInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    video: {
      id: "1",
      loc: "제주도 애월읍",
      videoId: "dQw4w9WgXcQ",
      thumbnailUrl: "https://placehold.co/300x200",
      profileImageUrl: "https://placehold.co/40x40",
      userName: "댕글이",
      description: "제주도 강아지와 함께하는 해변 산책",
      tags: ["제주", "강아지", "산책"],
      bookmarks: 42,
      comments: 8,
      likes: 120,
    },
  },
};
