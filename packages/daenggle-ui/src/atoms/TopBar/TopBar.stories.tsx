import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import type { ReactNode } from "react";
import { RiBookmarkLine, RiSearchLine, RiShareLine } from "react-icons/ri";
import { TopBar } from "./TopBar";

const meta = {
  title: "Common/TopBar",
  component: TopBar,
  parameters: { layout: "centered" },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    isShowLogo: { control: "boolean" },
    sticky: { control: "boolean" },
  },
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const ri = (icon: ReactNode, onClick = () => alert("icon clicked")) => ({
  icon,
  onClick,
});

export const WithLogo: Story = {
  parameters: {
    docs: {
      description: { story: "브랜드 로고가 중앙에 노출되는 TopBar." },
    },
  },
  args: {
    title: "AI 여행케어",
    isShowLogo: true,
    backIconHandler: () => alert("back clicked"),
    rightIcons: [ri(<RiSearchLine size={24} />)],
  },
};

export const WithAction: Story = {
  parameters: {
    docs: {
      description: {
        story: "큐레이션/영상 재생 페이지 등 액션 아이콘이 있는 TopBar.",
      },
    },
  },
  args: {
    title: "AI 여행케어",
    backIconHandler: () => alert("back clicked"),
    rightIcons: [ri(<RiSearchLine size={24} />)],
  },
};

export const TitleOnly: Story = {
  parameters: {
    docs: {
      description: { story: "여행케어 화면에 쓰이는 기본 TopBar(타이틀만)." },
    },
  },
  args: {
    title: "AI 여행케어",
    sticky: true,
  },
};

export const All: Story = {
  args: {
    title: "댕글추천",
    isShowLogo: false,
    backIconHandler: () => alert("back clicked"),
    rightIcons: [
      ri(<RiSearchLine size={24} />),
      ri(<RiShareLine size={24} />),
      ri(<RiBookmarkLine size={24} />),
    ],
  },
};
