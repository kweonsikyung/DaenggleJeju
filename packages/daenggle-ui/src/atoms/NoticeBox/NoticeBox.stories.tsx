import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NoticeBox } from "./NoticeBox";

const meta = {
  title: "Common/NoticeBox",
  component: NoticeBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    children: {
      control: "text",
      description: "알림 상자 내부에 표시될 내용입니다.",
    },
    variant: {
      control: { type: "radio" },
      options: ["yellow", "blue"],
      description: "알림 상자의 색상 테마를 선택합니다.",
    },
    animation: {
      control: { type: "radio" },
      options: ["in", "out", "idle"],
      description: "애니메이션 상태를 제어합니다.",
    },
    shouldRender: {
      control: "boolean",
      description: "컴포넌트의 렌더링 여부를 제어합니다.",
    },
  },
  args: {
    shouldRender: true,
    children:
      "제공된 정보는 실제 운영 상황과 다를 수 있으므로, 예약 및 탑승 전 반드시 해당 업체의 최신 규정과 조건을 확인해 주시기 바랍니다.",
    onClose: () => alert("닫기 버튼 클릭!"),
    animation: "idle",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NoticeBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Yellow: Story = {
  args: {
    variant: "yellow",
  },
};

export const Blue: Story = {
  args: {
    variant: "blue",
    children: "파란색 테마의 알림입니다. 중요한 공지사항을 전달할 때 사용할 수 있습니다.",
  },
};
