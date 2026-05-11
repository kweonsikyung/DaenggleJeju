import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "./EmptyState";

const meta: Meta<typeof EmptyState> = {
  title: "Common/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const CustomMessage: Story = {
  args: {
    imageUrl: "/assets/empty/no-result.png",
    title: "검색 결과 없음",
    description: "다른 키워드를 입력해 보세요.",
  },
};

export const NoImage: Story = {
  args: {
    imageUrl: undefined,
    title: "데이터 없음",
    description: "현재 표시할 데이터가 없습니다.",
  },
};
