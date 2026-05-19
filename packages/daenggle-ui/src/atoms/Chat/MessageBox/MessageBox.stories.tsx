import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MessageBox } from "./MessageBox";

const meta: Meta<typeof MessageBox> = {
  title: "Chat/MessageBox",
  component: MessageBox,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "메시지 박스 내부에 표시될 내용",
    },
    variant: {
      control: { type: "radio" },
      options: ["ai", "user"],
      description: "메시지 주체 (ai 또는 user)",
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "500px",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AiMessage: Story = {
  args: {
    variant: "ai",
    children:
      "안녕하세요! 무엇이 궁금하신가요? 제주여행 중 반려견 건강 걱정은 AI 여행케어가 함께 덜어드릴게요.",
  },
};

export const UserMessage: Story = {
  args: {
    variant: "user",
    children: "이동 스트레스 관리에 대해 알려주세요.",
  },
};
