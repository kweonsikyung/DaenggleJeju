import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tabs, Tab } from "./Tabs";

const meta: Meta<typeof Tabs> = {
  title: "Common/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    tabs: {
      control: "object",
      description: "탭 목록",
    },
    activeTab: {
      control: "text",
      description: "활성화된 탭의 id",
    },
    onTabClick: {
      action: "clicked",
      description: "탭 클릭 시 호출되는 함수",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 500 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const mockTabs: Tab[] = [
  { id: "dangle", label: "댕글" },
  { id: "accom", label: "숙소" },
  { id: "food", label: "음식점" },
  { id: "beach", label: "해변" },
  { id: "cafe", label: "카페" },
  { id: "tour", label: "여행지" },
  { id: "sports", label: "애견운동장" },
];

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState("dangle");
    return <Tabs tabs={mockTabs} activeTab={active} onTabClick={setActive} />;
  },
};
