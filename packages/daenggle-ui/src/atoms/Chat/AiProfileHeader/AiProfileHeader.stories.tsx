import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import AiProfileHeader from "./AiProfileHeader";

const meta: Meta<typeof AiProfileHeader> = {
  title: "Chat/AiProfileHeader",
  component: AiProfileHeader,
  tags: ["autodocs"],
  argTypes: {
    imageUrl: {
      control: "text",
      description: "프로필 이미지 URL",
    },
    title: {
      control: "text",
      description: "메인 타이틀",
    },
    subtitle: {
      control: "text",
      description: "서브 타이틀",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    imageUrl: "/assets/curation/avatar.svg",
    title: "여행케어 AI",
    subtitle: "빠르게 찾는 반려견 건강 정보",
  },
};
