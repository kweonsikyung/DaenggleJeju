import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LoginButton } from "./LoginButton";
import { LOGIN_TYPE } from "@/types/LoginType";

const meta = {
  title: "Button/LoginButton",
  component: LoginButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    provider: {
      control: "inline-radio",
      options: [LOGIN_TYPE.KAKAO, LOGIN_TYPE.NAVER, LOGIN_TYPE.GOOGLE],
    },
    onClick: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 375 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LoginButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Kakao: Story = {
  args: { provider: LOGIN_TYPE.KAKAO, title: "Kakao로 시작하기" },
};

export const Naver: Story = {
  args: { provider: LOGIN_TYPE.NAVER, title: "Naver로 시작하기" },
};

export const Google: Story = {
  args: { provider: LOGIN_TYPE.GOOGLE, title: "Google로 시작하기" },
};
