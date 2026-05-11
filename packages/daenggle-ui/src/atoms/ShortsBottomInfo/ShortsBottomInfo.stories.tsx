import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ShortsBottomInfo from "./ShortsBottomInfo";
import { shortsData } from "@/utils/dummy_data";

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
    video: shortsData["강아지 여행"][0],
  },
};
