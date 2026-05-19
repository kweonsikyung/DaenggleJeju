import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TopicSelector } from "./TopicSelector";

const meta: Meta<typeof TopicSelector> = {
  title: "Chat/TopicSelector",
  component: TopicSelector,
  tags: ["autodocs"],
  argTypes: {
    topics: {
      control: "object",
      description: "버튼으로 표시할 주제 목록 (문자열 배열)",
    },
    onSelectTopic: {
      action: "onSelectTopic",
      description: "주제 버튼 클릭 시 호출되는 함수",
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

export const InitialTopics: Story = {
  args: {
    topics: [
      "이동 스트레스 관리",
      "진드기·벌레 예방",
      "먹어도 되는 해산물, 과일 확인",
      "탈수·피로 증상 체크",
    ],
  },
};

export const SubTopics: Story = {
  args: {
    topics: ["자동차", "배", "비행기", "버스"],
  },
};
