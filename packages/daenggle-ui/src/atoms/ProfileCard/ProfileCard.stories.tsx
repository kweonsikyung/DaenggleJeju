import React from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProfileCard } from "./ProfileCard";

const meta: Meta<typeof ProfileCard> = {
  title: "Common/ProfileCard",
  component: ProfileCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    imageUrl: { control: "text" },
    name: { control: "text" },
    description: { control: "text" },
    details: { control: "text" },
    onEditClick: { action: "clicked" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "375px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileCard>;

/**
 * 기본 프로필 카드입니다.
 */
export const Default: Story = {
  args: {
    imageUrl: "/assets/dangle/dog.png",
    name: "해투",
    description: "견주님",
    details: "골든리트리버 · 대형견 (25~30kg 미만) · 7살",
  },
};
