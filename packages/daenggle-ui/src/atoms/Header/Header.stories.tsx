import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Header } from "./Header";

const meta = {
  title: "Common/Header",
  component: Header,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    title: { control: "text" },
    desc: { control: "text" },
    onArrowClick: { action: "arrow clicked" },
    marginTop: { control: "text" },
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "진짜 견주가 다녀온 제주 여행!",
    desc: "15초로 댕댕이와 어디 갈지 고민 끝",
    onArrowClick: undefined,
    marginTop: "20px",
  },
};

export const TitleOnly: Story = {
  args: {
    title: "진짜 견주가 다녀온 제주 여행!",
    desc: undefined,
    onArrowClick: undefined,
  },
};

export const WithArrow: Story = {
  args: {
    title: "짖어도 OK! 소음 안심 독채 숙소",
    onArrowClick: fn(),
  },
};
